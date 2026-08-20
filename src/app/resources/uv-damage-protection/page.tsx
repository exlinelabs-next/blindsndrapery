import type { Metadata } from "next";
import { BlogArticleHero } from "@/components/BlogArticleHero";
import { BlogArticleContent } from "@/components/BlogArticleContent";

export const metadata: Metadata = {
  title:
    "5 Ways to Protect Your Florida Home from UV Damage | Blinds & Drapery",
  description:
    "Learn five effective strategies to protect your Florida home from UV damage with the right window treatments and practical tips.",
};

export default function BlogArticlePage() {
  return (
    <main>
      <BlogArticleHero />
      <BlogArticleContent />
    </main>
  );
}
