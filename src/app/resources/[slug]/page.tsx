import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticleHero } from "@/components/BlogArticleHero";
import { BlogArticleContent } from "@/components/BlogArticleContent";
import { fetchBlogSinglePage } from "@/lib/api";
import { getBlogArticle, getBlogArticleSlugs } from "@/content/mock";
import { pageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getBlogArticleSlugs().map((slug) => ({ slug }));
}

async function getData(slug: string) {
  const article = await fetchBlogSinglePage(`/${slug}/`).catch(() => null);
  const fallback = getBlogArticle(slug);
  return article ?? fallback;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getData(slug);
  if (!data) return {};
  return pageMetadata({
    path: `/resources/${slug}`,
    title: `${data.title} | Blinds & Drapery`,
    description: `Read about ${data.title.toLowerCase()} — expert window treatment advice from Blinds & Drapery.`,
    image: data.heroImage,
  });
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const data = await getData(slug);
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
