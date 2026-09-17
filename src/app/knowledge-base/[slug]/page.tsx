import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KnowledgeArticleHero } from "@/components/KnowledgeArticleHero";
import { KnowledgeArticleContent } from "@/components/KnowledgeArticleContent";
import { fetchKnowledgeBaseSinglePage, fetchKnowledgeBaseSlugs } from "@/lib/api";
import {
  getKnowledgeArticle,
  getKnowledgeArticleSlugs,
} from "@/content/mock";
import { pageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Build from the real published slugs so every live article actually
  // gets a static page (this route previously only ever built the mock
  // module's 6 placeholder slugs, none of which match a real WP post, so
  // every real article 404'd no matter what the listing page linked to).
  // Mock slugs are a build-time fallback only, used when the CMS fetch
  // itself fails — not merged in alongside real data, since the mock's 6
  // topics are placeholder content that doesn't exist in WP at all, and
  // permanently shipping them as their own indexable pages is exactly what
  // the launch checklist's "no placeholder text in production" rule bans.
  const realSlugs = await fetchKnowledgeBaseSlugs().catch(() => null);
  const slugs = realSlugs && realSlugs.length > 0 ? realSlugs : getKnowledgeArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

async function getData(slug: string) {
  const article = await fetchKnowledgeBaseSinglePage(`/${slug}/`).catch(() => null);
  const fallback = getKnowledgeArticle(slug);
  return article ?? fallback;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getData(slug);
  if (!data) return {};
  return pageMetadata({
    path: `/knowledge-base/${slug}`,
    title: `${data.title} | Blinds & Drapery`,
    description: `Read about ${data.title.toLowerCase()} — expert window treatment advice from Blinds & Drapery.`,
    image: data.heroImage,
  });
}

export default async function KnowledgeArticlePage({ params }: Props) {
  const { slug } = await params;
  const data = await getData(slug);
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
