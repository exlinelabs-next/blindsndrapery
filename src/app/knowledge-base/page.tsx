import type { Metadata } from "next";
import { KnowledgeHero } from "@/components/KnowledgeHero";
import { KnowledgeGrid } from "@/components/KnowledgeGrid";

export const metadata: Metadata = {
  title: "Knowledge Base | Blinds & Drapery",
  description:
    "Expert answers to common window treatment questions. Browse maintenance tips, cleaning guides, and style advice for blinds and shades.",
};

export default function KnowledgeBasePage() {
  return (
    <main>
      <KnowledgeHero />
      <KnowledgeGrid />
    </main>
  );
}
