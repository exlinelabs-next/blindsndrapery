import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { TrustBadges } from "@/components/TrustBadges";
import { ProcessIntro } from "@/components/ProcessIntro";
import { ServicesGlimpse } from "@/components/ServicesGlimpse";
import { FeaturedCategory } from "@/components/FeaturedCategory";
import { HowWeWork } from "@/components/HowWeWork";
import { Testimonials } from "@/components/Testimonials";
import { QuoteGallery } from "@/components/QuoteGallery";
import { Commercial } from "@/components/Commercial";
import { RepairMaintenance } from "@/components/RepairMaintenance";
import { Locations } from "@/components/Locations";
import { fetchHomePage } from "@/lib/api";

const QuoteForm = dynamic(() => import("@/components/QuoteForm").then(m => ({ default: m.QuoteForm })));
const FAQ = dynamic(() => import("@/components/FAQ").then(m => ({ default: m.FAQ })));

export default async function Home() {
  const data = await fetchHomePage().catch(() => undefined);

  return (
    <main>
      <Hero content={data?.hero} headingScalesOnMobile />
      <TrustBadges content={data?.trustBadges} />
      <ProcessIntro content={data?.processIntro} />
      <ServicesGlimpse content={data?.servicesGlimpse} />
      <FeaturedCategory content={data?.featuredCategory} />
      <HowWeWork content={data?.howItWorks} />
      <Testimonials />
      <QuoteGallery content={data?.quoteGallery} />
      <Commercial content={data?.commercial} />
      <RepairMaintenance content={data?.repairMaintenance} />
      <Locations content={data?.locations} />
      <QuoteForm content={data?.quoteForm} />
      <FAQ content={data?.faq} />
    </main>
  );
}
