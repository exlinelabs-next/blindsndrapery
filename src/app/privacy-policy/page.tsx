import type { Metadata } from "next";
import { LegalContent } from "@/components/LegalContent";
import { fetchPrivacyPolicyPage } from "@/lib/api";

export const metadata: Metadata = {
  title: "Privacy Policy & Terms | Blinds & Drapery",
  description:
    "Read the Blinds & Drapery privacy policy and terms of service for our window treatment solutions.",
};

export default async function PrivacyPolicyPage() {
  const data = await fetchPrivacyPolicyPage().catch(() => undefined);

  return (
    <main>
      <LegalContent content={data} />
    </main>
  );
}
