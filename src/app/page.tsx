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

const QuoteForm = dynamic(() => import("@/components/QuoteForm").then(m => ({ default: m.QuoteForm })));
const FAQ = dynamic(() => import("@/components/FAQ").then(m => ({ default: m.FAQ })));

// Section order matches the Figma homepage frame top-to-bottom (node
// 2722:1367). Header and Footer are site-wide chrome, rendered once in
// src/app/layout.tsx rather than per-page.
export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBadges />
      <ProcessIntro />
      <ServicesGlimpse />
      <FeaturedCategory />
      <HowWeWork />
      <Testimonials />
      <QuoteGallery />
      <Commercial />
      <RepairMaintenance />
      <Locations />
      <QuoteForm />
      <FAQ />
    </main>
  );
}
