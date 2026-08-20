import type { Metadata } from "next";
import { ResourcesHero } from "@/components/ResourcesHero";
import { ResourcesFeatured } from "@/components/ResourcesFeatured";
import { ResourcesGrid } from "@/components/ResourcesGrid";

export const metadata: Metadata = {
  title: "Blog & Resources | Blinds & Drapery",
  description:
    "Explore expert installation tips, detailed product comparisons, and the latest Florida home decor trends for window treatments.",
};

export default function ResourcesPage() {
  return (
    <main>
      <ResourcesHero />
      <ResourcesFeatured />
      <ResourcesGrid />
    </main>
  );
}
