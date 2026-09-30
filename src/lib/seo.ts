// Single source of truth for the production origin, used by canonical
// tags, sitemap.xml, robots.txt and absolute Open Graph/Twitter image URLs.
// Override with NEXT_PUBLIC_SITE_URL for preview/staging deployments so
// those don't self-canonicalize as the production domain.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://blindsndrapery.com";

// The homepage hero photo is a real, committed local asset (not CMS- or
// Figma-sourced), which makes it a safe sitewide fallback Open Graph image
// for any page that doesn't supply its own real photo.
const DEFAULT_OG_IMAGE = {
  url: "/images/home/hero_image.webp",
  width: 1440,
  height: 700,
  alt: "Blinds & Drapery — Custom Window Coverings in South Florida",
};

export interface PageMetadataInput {
  path: string;
  title: string;
  description: string;
  image?: { src: string; alt: string; width?: number; height?: number };
  // WP-editorial noindex signal (Yoast's metaRobotsNoindex) for pages whose
  // content comes from a CMS field the editor can flag directly — distinct
  // from robots.ts's blanket disallow, which only stops crawling, not
  // indexing of a URL already linked from elsewhere.
  noindex?: boolean;
}

// Shared shape for canonical + Open Graph + Twitter card metadata so every
// route gets all three consistently instead of each page.tsx hand-rolling
// its own (and inevitably missing one). `path` is the route's own absolute
// path (e.g. "/services/blinds") — combined with metadataBase on the root
// layout, Next resolves every relative URL here to an absolute one.
export function pageMetadata({ path, title, description, image, noindex }: PageMetadataInput) {
  const ogImage = image
    ? { url: image.src, width: image.width ?? 1200, height: image.height ?? 630, alt: image.alt || title }
    : DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Blinds & Drapery",
      type: "website" as const,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [ogImage.url],
    },
  };
}
