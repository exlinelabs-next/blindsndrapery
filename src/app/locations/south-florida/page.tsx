import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { CityServiceGrid } from "@/components/CityServiceGrid";
import { CityConsultationForm } from "@/components/CityConsultationForm";
import { FAQ } from "@/components/FAQ";
import { useContent } from "@/hooks/useContent";

export const metadata: Metadata = {
  title: "South Florida Window Treatments | Blinds & Drapery",
  description:
    "Custom blinds, shades, shutters, and drapery for South Florida homes. Professional installation and consultation.",
};

export default function CityPage() {
  const { hero } = useContent("cityPage");

  return (
    <main>
      <Hero
        breadcrumb={hero.breadcrumb}
        heading={hero.heading}
        subheading={hero.subheading}
        ctaLabel={hero.ctaLabel}
        ctaHref={hero.ctaHref}
        backgroundImage={hero.backgroundImage}
      />
      <CityServiceGrid />
      <CityConsultationForm />
      <FAQ />
    </main>
  );
}
