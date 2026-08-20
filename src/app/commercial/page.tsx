import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { CommercialPlaces } from "@/components/CommercialPlaces";
import { InstallationGallery } from "@/components/InstallationGallery";
import { CommercialQuoteForm } from "@/components/CommercialQuoteForm";
import { FAQ } from "@/components/FAQ";
import { useContent } from "@/hooks/useContent";

export const metadata: Metadata = {
  title: "Commercial Window Treatments | Blinds & Drapery",
  description:
    "High-volume window covering supply and installation for offices, hospitality, and healthcare facilities across South Florida.",
};

// Section order matches the Figma "Desktop / Commercial" frame top-to-bottom
// (node 2220:843). Header and Footer are site-wide chrome, already rendered
// once in src/app/layout.tsx. FAQ is reused directly — its Figma instance
// on this page (Frame 277) is confirmed identical content/structure to the
// already-built FAQ component. The Hero section reuses the shared <Hero>
// component (extended with content-override props for this page — see
// Hero.tsx) rather than a new component, since this page's hero is
// structurally identical to the shared one (full-bleed photo with a
// breadcrumb pill + heading + subheading + CTA overlaid), just with its own
// content and one confirmed mobile-only heading-size exception.
export default function CommercialPage() {
  const { hero } = useContent("commercialPage");

  return (
    <main>
      <Hero
        breadcrumb={hero.breadcrumb}
        heading={hero.heading}
        subheading={hero.subheading}
        ctaLabel={hero.ctaLabel}
        ctaHref={hero.ctaHref}
        backgroundImage={hero.backgroundImage}
        headingScalesOnMobile
      />
      <CommercialPlaces />
      <InstallationGallery />
      <CommercialQuoteForm />
      <FAQ />
    </main>
  );
}
