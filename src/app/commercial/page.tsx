import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { CommercialPlaces } from "@/components/CommercialPlaces";
import { InstallationGallery } from "@/components/InstallationGallery";
import { CommercialQuoteForm } from "@/components/CommercialQuoteForm";
import { FAQ } from "@/components/FAQ";
import { fetchCommercialPage } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/commercial",
  title: "Commercial Window Treatments | Blinds & Drapery",
  description:
    "High-volume window covering supply and installation for offices, hospitality, and healthcare facilities across South Florida.",
});

export default async function CommercialPage() {
  const data = await fetchCommercialPage().catch(() => undefined);

  return (
    <main>
      <Hero
        breadcrumb={data?.hero.breadcrumb}
        heading={data?.hero.heading}
        subheading={data?.hero.subheading}
        ctaLabel={data?.hero.ctaLabel}
        ctaHref={data?.hero.ctaHref}
        backgroundImage={data?.hero.backgroundImage}
        headingScalesOnMobile
      />
      <CommercialPlaces content={data?.places} />
      <InstallationGallery content={data?.installation} />
      <CommercialQuoteForm content={data?.quoteForm} />
      <FAQ content={data?.faq} />
    </main>
  );
}
