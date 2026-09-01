import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { CityServiceGrid } from "@/components/CityServiceGrid";
import { CityConsultationForm } from "@/components/CityConsultationForm";
import { FAQ } from "@/components/FAQ";
import { fetchLocationSinglePage } from "@/lib/api";

export const metadata: Metadata = {
  title: "South Florida Window Treatments | Blinds & Drapery",
  description:
    "Custom blinds, shades, shutters, and drapery for South Florida homes. Professional installation and consultation.",
};

export default async function CityPage() {
  const data = await fetchLocationSinglePage("/locations-hub/florida/").catch(() => undefined);

  return (
    <main>
      <Hero
        breadcrumb={data?.hero.breadcrumb}
        heading={data?.hero.heading}
        subheading={data?.hero.subheading}
        ctaLabel={data?.hero.ctaLabel}
        ctaHref={data?.hero.ctaHref}
        backgroundImage={data?.hero.backgroundImage}
      />
      <CityServiceGrid content={data?.serviceGrid} />
      <CityConsultationForm content={data?.consultation} />
      <FAQ variant="flat" content={data?.faq} />
    </main>
  );
}
