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
export async function POST(request: Request) {
  let input: Partial<ContactFormInput> & { recaptchaToken?: string | null };
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }

  if (!input.name || !input.email) {
    return NextResponse.json({ success: false, error: "Name and email are required" }, { status: 400 });
  }

  const verdict = await verifyRecaptcha(input.recaptchaToken);
  if (!verdict.ok) {
    console.warn(`[contact] reCAPTCHA refused a submission: ${verdict.reason}`);
    return NextResponse.json({ success: false, error: "Verification failed" }, { status: 400 });
  }

  try {
    const data = await fetchGraphQL<{ submitContactForm: { success: boolean } }>(
      SUBMIT_CONTACT_FORM_MUTATION,
      {
        input: {
          name: input.name,
          email: input.email,
          phone: input.phone ?? "",
          serviceInterest: input.serviceInterest ?? "",
          aboutTheProject: input.aboutTheProject ?? "",
        },
      },
    );
    return NextResponse.json({ success: data.submitContactForm.success });
  } catch (error) {
    console.error("submitContactForm failed:", error);
    return NextResponse.json({ success: false, error: "Submission failed" }, { status: 502 });
  }
}
