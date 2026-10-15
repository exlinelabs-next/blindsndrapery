import { WP_URL } from "./wp";
import { getRecaptchaToken } from "./recaptcha";

// Shown in the SuccessDialog after any of the consultation/contact forms
// (home, city, free-quote) submits successfully.
export const CONTACT_SUCCESS_MESSAGE =
  "Thank you. A member of our team will be in touch within 24 hours to confirm your appointment time.";

// Home page, Free Quote page, and City page contact forms — posts to our
// own /api/contact route rather than calling the `submitContactForm`
// GraphQL mutation directly from the browser. WP's GraphQL endpoint is
// moving to "Allow only specific queries" (a saved-queries allowlist), and
// an unauthenticated browser request won't get past that; the WP
// Application Password that does isn't something we can ship to
// client-side JS, so the actual authenticated GraphQL call happens
// server-side in the API route instead. Callers must still pair this with
// a spam guard (honeypot field) on the form itself; the route also verifies
// a reCAPTCHA v3 token attached here.
export interface ContactFormInput {
  name: string;
  email: string;
  phone: string;
  serviceInterest: string;
  aboutTheProject: string;
}

export async function submitContactForm(input: ContactFormInput): Promise<boolean> {
  const recaptchaToken = await getRecaptchaToken("contact_submit");
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...input, recaptchaToken }),
  });

  if (!res.ok) {
    throw new Error(`Contact form submission failed: ${res.status} ${res.statusText}`);
  }

  const result = await res.json();
  return Boolean(result.success);
}

// Commercial page bid form — WP has no GraphQL mutation for this one since
// it needs file upload support; posts directly to a custom REST endpoint
// instead. Field names on the wire (company_name, contact_name, ...) must
// match the ACF field names exactly, per the backend dev's spec.
export interface BidFormInput {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  message: string;
  files: File[];
}

export async function submitBidForm(input: BidFormInput): Promise<boolean> {
  const formData = new FormData();
  formData.append("company_name", input.companyName);
  formData.append("contact_name", input.contactName);
  formData.append("email", input.email);
  formData.append("phone", input.phone);
  formData.append("project_type", input.projectType);
  formData.append("location", input.location);
  formData.append("project_scope_and_message", input.message);
  input.files.forEach((file, i) => formData.append(`file_${i}`, file));
  // This form posts straight to WP (file uploads), so the token can only be
  // verified there — the custom/v1/submit-bid handler should check it
  // against Google's siteverify with the reCAPTCHA secret key.
  const recaptchaToken = await getRecaptchaToken("bid_submit");
  if (recaptchaToken) formData.append("recaptcha_token", recaptchaToken);

  const res = await fetch(`${WP_URL}/wp-json/custom/v1/submit-bid`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Bid submission failed: ${res.status} ${res.statusText}`);
  }

  const result = await res.json();
  return Boolean(result.success);
}
