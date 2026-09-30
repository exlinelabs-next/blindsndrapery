import type { Metadata } from "next";
import { LegalContent } from "@/components/LegalContent";
import { fetchPrivacyPolicyPage } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

async function getData() {
  return fetchPrivacyPolicyPage().catch(() => undefined);
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();

  return pageMetadata({
    path: "/privacy-policy",
    title: "Privacy Policy & Terms | Blinds & Drapery",
    description:
      "Read the Blinds & Drapery privacy policy and terms of service for our window treatment solutions.",
    // Defaults to noindex even if the fetch fails — safer than accidentally
    // indexing a page that fell back to generic placeholder copy.
    noindex: data?.noindex ?? true,
  });
}

export default async function PrivacyPolicyPage() {
  const data = await getData();

  return (
    <main>
      <LegalContent content={data} />
    </main>
  );
}
