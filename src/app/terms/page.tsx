import type { Metadata } from "next";
import { LegalContent } from "@/components/LegalContent";
import { fetchTermsPage } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

async function getData() {
  return fetchTermsPage().catch(() => undefined);
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();

  return pageMetadata({
    path: "/terms",
    title: "Terms of Use | Blinds & Drapery",
    description:
      "Read the Blinds & Drapery terms of use for our window treatment solutions.",
    // Defaults to noindex even if the fetch fails — safer than accidentally
    // indexing a page that fell back to generic placeholder copy.
    noindex: data?.noindex ?? true,
  });
}

export default async function TermsPage() {
  const data = await getData();

  return (
    <main>
      <LegalContent content={data} />
    </main>
  );
}
