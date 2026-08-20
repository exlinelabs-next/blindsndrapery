import type { Metadata } from "next";
import { LocationsHero } from "@/components/LocationsHero";
import { ServiceAreaPanel } from "@/components/ServiceAreaPanel";
import { ComingSoonStates } from "@/components/ComingSoonStates";

export const metadata: Metadata = {
  title: "Locations | Blinds & Drapery",
  description: "Window treatment services across Broward County and South Florida, with expansion to Texas, California, and more states coming soon.",
};

// Section order matches the Figma "Desktop / Locations Hub" frame top-to-bottom
// (node 2251:68). Header and Footer are site-wide chrome, already rendered
// once in src/app/layout.tsx. Route chosen as "/locations" to match the
// existing Header nav link (src/content/mock.ts nav.links already points
// "Locations" at "/locations" — this page fills that previously-dead route
// rather than introducing a new one).
export default function LocationsPage() {
  return (
    <main>
      <LocationsHero />
      <ServiceAreaPanel />
      <ComingSoonStates />
    </main>
  );
}
