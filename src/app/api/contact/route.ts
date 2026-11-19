import { NextResponse } from "next/server";
import { fetchGraphQL } from "@/lib/graphql";
import { SUBMIT_CONTACT_FORM_MUTATION } from "@/lib/queries";
import { verifyRecaptcha } from "@/lib/recaptcha-server";
import type { ContactFormInput } from "@/lib/forms";

// The three contact forms (Home, Free Quote, City) used to call
// submitContactForm directly from the browser. That only worked while the
// WP GraphQL endpoint allowed public, unauthenticated queries — once the
// backend restricts it to "Allow only specific queries" (WPGraphQL Smart
// Cache's saved-queries allowlist), an unauthenticated browser request no
// longer gets through. An Application Password can bypass that, but it can
// never be shipped to client-side JS, so the mutation has to run from here
// instead — a server-side route that attaches WP_GRAPHQL_USERNAME /
// WP_GRAPHQL_APP_PASSWORD (see src/lib/graphql.ts) the browser never sees.

// The forms themselves set no length limits, so this route is the only
// thing between a scripted request and the WP mutation. Caps are generous
// (well past anything a real enquiry needs) so a genuine lead is never
// refused; they exist to stop oversized payloads, not to police content.
const MAX_LENGTHS: Record<keyof ContactFormInput, number> = {
  name: 200,
  email: 254,
  phone: 50,
  serviceInterest: 200,
  aboutTheProject: 5000,
};

// Deliberately loose — just "something@something.tld" with no spaces. The
// browser's type="email" already does the strict check for real visitors.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function badRequest(error: string) {
  return NextResponse.json({ success: false, error }, { status: 400 });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid request body");
  }
  if (!body || typeof body !== "object") {
    return badRequest("Invalid request body");
  }

  const input = {} as ContactFormInput;
  for (const field of Object.keys(MAX_LENGTHS) as (keyof ContactFormInput)[]) {
    const value = body[field] ?? "";
    if (typeof value !== "string" || value.length > MAX_LENGTHS[field]) {
      return badRequest(`Invalid ${field}`);
    }
    input[field] = value.trim();
  }

  if (!input.name || !input.email) {
    return badRequest("Name and email are required");
  }
  if (!EMAIL_PATTERN.test(input.email)) {
    return badRequest("Invalid email");
  }

  const recaptchaToken = typeof body.recaptchaToken === "string" ? body.recaptchaToken : null;

  const verdict = await verifyRecaptcha(recaptchaToken);
  if (!verdict.ok) {
    console.warn(`[contact] reCAPTCHA refused a submission: ${verdict.reason}`);
    return badRequest("Verification failed");
  }

  try {
    const data = await fetchGraphQL<{ submitContactForm: { success: boolean } }>(
      SUBMIT_CONTACT_FORM_MUTATION,
      { input },
    );
    return NextResponse.json({ success: data.submitContactForm.success });
  } catch (error) {
    console.error("submitContactForm failed:", error);
    return NextResponse.json({ success: false, error: "Submission failed" }, { status: 502 });
  }
}
