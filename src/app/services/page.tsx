import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ServiceGlimpse } from "@/components/ServiceGlimpse";
import { ServiceProcess } from "@/components/ServiceProcess";
import { ServiceAboutSection } from "@/components/ServiceAboutSection";
import { FAQ } from "@/components/FAQ";
import { useContent } from "@/hooks/useContent";

export const metadata: Metadata = {
  title: "Services | Blinds & Drapery",
  description:
    "Explore custom blinds, shades, shutters, drapery, and motorized window coverings for South Florida homes and businesses.",
};

export default function ServicesPage() {
  const { heroBreadcrumb } = useContent("servicePage");

  return (
    <main>
      <Hero breadcrumb={heroBreadcrumb} />
      <ServiceGlimpse />
      <ServiceProcess />
      <ServiceAboutSection />
      <FAQ />
    </main>
  );
}
