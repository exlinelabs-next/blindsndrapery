import type { Metadata } from "next";
import { GalleryHero } from "@/components/GalleryHero";
import { GalleryContent } from "@/components/GalleryContent";
import { ConsultationCTA } from "@/components/ConsultationCTA";
import { FAQ } from "@/components/FAQ";
import { fetchGalleryPage } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/gallery",
  title: "Inspiration Gallery | Blinds & Drapery",
  description:
    "Browse completed window treatment installations from South Florida homes and businesses — blinds, shades, shutters, and drapery.",
});

export default async function GalleryPage() {
  const data = await fetchGalleryPage().catch(() => undefined);

  return (
    <main>
      <GalleryHero content={data?.hero} />
      <GalleryContent filtersContent={data?.filters} gridContent={data?.grid} />
      <ConsultationCTA content={data?.cta} />
      <FAQ content={data?.faq} />
    </main>
  );
}
