import type { Metadata } from "next";
import { ResourcesHero } from "@/components/ResourcesHero";
import { ResourcesFeatured } from "@/components/ResourcesFeatured";
import { ResourcesGrid } from "@/components/ResourcesGrid";
import { fetchResourcesPage } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/resources",
  title: "Blog & Resources | Blinds & Drapery",
  description:
    "Explore expert installation tips, detailed product comparisons, and the latest Florida home decor trends for window treatments.",
});

export default async function ResourcesPage() {
  const data = await fetchResourcesPage().catch(() => undefined);

  return (
    <main>
      <ResourcesHero heading={data?.heading} description={data?.description} />
      <ResourcesFeatured content={data?.featured} />
      <ResourcesGrid articles={data?.articles} />
    </main>
  );
}
