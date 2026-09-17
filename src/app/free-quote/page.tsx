import type { Metadata } from "next";
import { FreeQuoteHero } from "@/components/FreeQuoteHero";
import { FreeQuoteProcess } from "@/components/FreeQuoteProcess";
import { FreeQuoteProcessIntro } from "@/components/FreeQuoteProcessIntro";
import { FreeQuoteForm } from "@/components/FreeQuoteForm";
import { FAQ } from "@/components/FAQ";
import { fetchFreeQuotePage } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/free-quote",
  title: "Free Quote | Blinds & Drapery",
  description:
    "Get a free quote for custom blinds, shades, shutters, and drapery installation in South Florida. Submit your request online.",
});

export default async function FreeQuotePage() {
  const data = await fetchFreeQuotePage().catch(() => undefined);

  return (
    <main>
      <FreeQuoteHero content={data?.hero} />
      <FreeQuoteProcess content={data?.process} />
      <FreeQuoteProcessIntro content={data?.processIntro} />
      <FreeQuoteForm content={data?.form} />
      <FAQ variant="flat" content={data?.faq} />
    </main>
  );
}
