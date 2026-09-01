import type { Metadata } from "next";
import { LocationsHero } from "@/components/LocationsHero";
import { ServiceAreaPanel } from "@/components/ServiceAreaPanel";
import { ComingSoonStates } from "@/components/ComingSoonStates";
import { fetchLocationsPage } from "@/lib/api";

export const metadata: Metadata = {
  title: "Locations | Blinds & Drapery",
  description: "Window treatment services across Broward County and South Florida, with expansion to Texas, California, and more states coming soon.",
};

export default async function LocationsPage() {
  const data = await fetchLocationsPage().catch(() => undefined);

  return (
    <main>
      <LocationsHero content={data?.hero} />
      <ServiceAreaPanel content={data?.serviceArea} />
      <ComingSoonStates content={data?.comingSoon} />
    </main>
  );
}
