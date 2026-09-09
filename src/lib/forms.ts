import { fetchGraphQL } from "./graphql";
import { SUBMIT_CONTACT_FORM_MUTATION } from "./queries";

// Home page and Free Quote page contact forms — routes through the custom
// `submitContactForm` GraphQL mutation registered on the WP side. That
// mutation bypasses auth so unauthenticated visitors can write to the
// database, so callers must pair this with a spam guard (honeypot field)
// on the form itself.
export interface ContactFormInput {
  name: string;
  email: string;
  phone: string;
  serviceInterest: string;
  aboutTheProject: string;
}

export async function submitContactForm(input: ContactFormInput): Promise<boolean> {
  const data = await fetchGraphQL<{ submitContactForm: { success: boolean } }>(
    SUBMIT_CONTACT_FORM_MUTATION,
    { input },
  );
  return data.submitContactForm.success;
}

const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_URL ?? "https://blindsndrapery.exlinelabs.com";

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

  const res = await fetch(`${WP_BASE_URL}/wp-json/custom/v1/submit-bid`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Bid submission failed: ${res.status} ${res.statusText}`);
  }

  const result = await res.json();
  return Boolean(result.success);
}
