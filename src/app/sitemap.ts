import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getBlogArticleSlugs, getKnowledgeArticleSlugs } from "@/content/mock";
import { fetchKnowledgeBaseSlugs } from "@/lib/api";
import { subServiceMap } from "@/app/services/shades/[sub]/page";

// Excludes /privacy-policy and /terms per the launch checklist's sitemap
// requirement (legal pages are intentionally left out).
const STATIC_ROUTES = [
  "",
  "/about",
  "/commercial",
  "/free-quote",
  "/gallery",
  "/knowledge-base",
  "/locations",
  "/locations/south-florida",
  "/resources",
  "/services",
  "/services/blinds",
  "/services/drapery",
  "/services/motorized",
  "/services/repairs",
  "/services/shades",
  "/services/shutters",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Same real-slugs-only, mock-as-fallback approach as the [slug] route's
  // own generateStaticParams — see the comment there. Without this the
  // sitemap only ever listed the 6 mock placeholder KB slugs, none of
  // which are real pages, while omitting the actual published articles.
  const realKnowledgeSlugs = await fetchKnowledgeBaseSlugs().catch(() => null);
  const knowledgeSlugs =
    realKnowledgeSlugs && realKnowledgeSlugs.length > 0 ? realKnowledgeSlugs : getKnowledgeArticleSlugs();

  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
  }));

  const shadeSubPages = Object.keys(subServiceMap).map((sub) => ({
    url: `${SITE_URL}/services/shades/${sub}`,
    lastModified: now,
  }));

  const blogPages = getBlogArticleSlugs().map((slug) => ({
    url: `${SITE_URL}/resources/${slug}`,
    lastModified: now,
  }));

  const knowledgeBasePages = knowledgeSlugs.map((slug) => ({
    url: `${SITE_URL}/knowledge-base/${slug}`,
    lastModified: now,
  }));

  return [...staticEntries, ...shadeSubPages, ...blogPages, ...knowledgeBasePages];
}
