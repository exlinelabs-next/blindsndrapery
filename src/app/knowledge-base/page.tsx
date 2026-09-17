import type { Metadata } from "next";
import { KnowledgeHero } from "@/components/KnowledgeHero";
import { KnowledgeGrid } from "@/components/KnowledgeGrid";
import { fetchKnowledgeBasePage } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/knowledge-base",
  title: "Knowledge Base | Blinds & Drapery",
  description:
    "Expert answers to common window treatment questions. Browse maintenance tips, cleaning guides, and style advice for blinds and shades.",
});

export default async function KnowledgeBasePage() {
  const data = await fetchKnowledgeBasePage().catch(() => undefined);

  return (
    <main>
      <KnowledgeHero heading={data?.heading} subtitle={data?.subtitle} />
      <KnowledgeGrid articles={data?.articles} />
    </main>
  );
}
