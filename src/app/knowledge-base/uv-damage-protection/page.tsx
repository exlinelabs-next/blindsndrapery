import type { Metadata } from "next";
import { KnowledgeArticleHero } from "@/components/KnowledgeArticleHero";
import { KnowledgeArticleContent } from "@/components/KnowledgeArticleContent";

export const metadata: Metadata = {
  title:
    "5 Ways to Protect Your Florida Home from UV Damage | Blinds & Drapery",
  description:
    "Learn how to protect your Florida home from UV damage with the right window treatments and practical strategies.",
};

export default function KnowledgeArticlePage() {
  return (
    <main>
      <KnowledgeArticleHero />
      <KnowledgeArticleContent />
    </main>
  );
}
