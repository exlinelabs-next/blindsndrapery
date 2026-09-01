import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticleHero } from "@/components/BlogArticleHero";
import { BlogArticleContent } from "@/components/BlogArticleContent";
import { fetchBlogSinglePage } from "@/lib/api";
import { getBlogArticle, getBlogArticleSlugs } from "@/content/mock";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getBlogArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchBlogSinglePage(`/${slug}/`).catch(() => null);
  const fallback = getBlogArticle(slug);
  const title = article?.title ?? fallback?.title;
  if (!title) return {};
  return {
    title: `${title} | Blinds & Drapery`,
    description: `Read about ${title.toLowerCase()} — expert window treatment advice from Blinds & Drapery.`,
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await fetchBlogSinglePage(`/${slug}/`).catch(() => null);
  const fallback = getBlogArticle(slug);
  const data = article ?? fallback;
  if (!data) notFound();

  return (
    <main>
      <BlogArticleHero
        breadcrumb={data.breadcrumb}
        heroImage={data.heroImage}
        heroBadge={data.heroBadge}
      />
      <BlogArticleContent
        date={data.date}
        author={data.author}
        readTime={data.readTime}
        title={data.title}
        blocks={data.blocks}
      />
    </main>
  );
}
