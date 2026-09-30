import type { Metadata } from "next";
import { LegalContent } from "@/components/LegalContent";
import { fetchTermsPage } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/terms",
  title: "Terms of Use | Blinds & Drapery",
  description:
    "Read the Blinds & Drapery terms of use for our window treatment solutions.",
});

export default async function TermsPage() {
  const data = await fetchTermsPage().catch(() => undefined);

  return (
    <main>
      <LegalContent content={data} />
    </main>
  );
}
