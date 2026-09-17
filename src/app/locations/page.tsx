import type { Metadata } from "next";
import { LocationsHero } from "@/components/LocationsHero";
import { LocationsCounties } from "@/components/LocationsCounties";
import { ComingSoonStates } from "@/components/ComingSoonStates";
import { fetchLocationsPage } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/locations",
  title: "Locations | Blinds & Drapery",
  description: "Window treatment services across Broward County and South Florida, with expansion to Texas, California, and more states coming soon.",
});

export default async function LocationsPage() {
  const data = await fetchLocationsPage().catch(() => undefined);

  return (
    <main>
      <LocationsHero content={data?.hero} />
      <LocationsCounties counties={data?.counties} />
      <ComingSoonStates content={data?.comingSoon} />
    </main>
  );
}
