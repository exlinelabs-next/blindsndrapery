import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KnowledgeArticleHero } from "@/components/KnowledgeArticleHero";
import { KnowledgeArticleContent } from "@/components/KnowledgeArticleContent";
import { fetchKnowledgeBaseSinglePage } from "@/lib/api";
import {
  getKnowledgeArticle,
  getKnowledgeArticleSlugs,
} from "@/content/mock";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getKnowledgeArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchKnowledgeBaseSinglePage(`/${slug}/`).catch(() => null);
  const fallback = getKnowledgeArticle(slug);
  const title = article?.title ?? fallback?.title;
  if (!title) return {};
  return {
    title: `${title} | Blinds & Drapery`,
    description: `Read about ${title.toLowerCase()} — expert window treatment advice from Blinds & Drapery.`,
  };
}

export default async function KnowledgeArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await fetchKnowledgeBaseSinglePage(`/${slug}/`).catch(() => null);
  const fallback = getKnowledgeArticle(slug);
  const data = article ?? fallback;
  if (!data) notFound();

  return (
    <main>
      <KnowledgeArticleHero
        breadcrumb={data.breadcrumb}
        heroImage={data.heroImage}
      />
      <KnowledgeArticleContent
        categoryTag={data.categoryTag}
        date={data.date}
        readTime={data.readTime}
        title={data.title}
        blocks={data.blocks}
      />
    </main>
  );
}
