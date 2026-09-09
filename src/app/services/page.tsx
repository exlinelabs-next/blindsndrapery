import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ServiceGlimpse } from "@/components/ServiceGlimpse";
import { ServiceProcess } from "@/components/ServiceProcess";
import { ServiceAboutSection } from "@/components/ServiceAboutSection";
import { FAQ } from "@/components/FAQ";
import { fetchServicePage } from "@/lib/api";

export const metadata: Metadata = {
  title: "Services | Blinds & Drapery",
  description:
    "Explore custom blinds, shades, shutters, drapery, and motorized window coverings for South Florida homes and businesses.",
};

export default async function ServicesPage() {
  const data = await fetchServicePage().catch(() => undefined);

  return (
    <main>
      <Hero
        breadcrumb="HOME > SERVICES"
        content={data?.hero}
        headingScalesOnMobile
      />
      <ServiceGlimpse content={data?.serviceGlimpse} />
      <ServiceProcess content={data?.howItWorks} />
      <ServiceAboutSection content={data?.about} />
      <FAQ content={data?.faq} />
    </main>
  );
}
