import type { NextConfig } from "next";

// The CMS origin — client-side form submissions (src/lib/forms.ts) POST
// here directly for both the GraphQL mutation and the commercial-bid REST
// route, so it needs to be allowed in connect-src, and its uploaded media
// needs to be allowed in img-src alongside the frontend's own assets.
const WP_ORIGIN = "https://blindsndrapery.exlinelabs.com";

// www.figma.com is a temporary allowance — see the TODO comments in
// src/content/mock.ts on the handful of image fields still pointing at
// ephemeral Figma MCP export URLs. Remove once those are all replaced with
// committed local assets.
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: ${WP_ORIGIN} https://www.figma.com`,
  `media-src 'self' ${WP_ORIGIN}`,
  "font-src 'self' data:",
  `connect-src 'self' ${WP_ORIGIN}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
  // The WordPress backend's nav menu links "Locations" at /locations-hub —
  // that's the CMS page's own slug (also used internally as the content-fetch
  // URI, see fetchLocationSinglePage("/locations-hub/florida/")), not this
  // app's actual route, which is deliberately /locations. Redirect so the
  // stale CMS-configured link still resolves until the WP menu is corrected.
  async redirects() {
    return [
      { source: "/locations-hub", destination: "/locations", permanent: false },
      { source: "/locations-hub/florida", destination: "/locations/south-florida", permanent: false },
      // Same story: the WP child page's own slug is "woven-shades", but this
      // app's established public route is "woven-wood-shades" (see the mega
      // menu and shades sub-service cards). The dynamic sub-services grid
      // links out using the CMS's own uri field, so redirect the mismatch.
      { source: "/services/shades/woven-shades", destination: "/services/shades/woven-wood-shades", permanent: false },
      // The rest of these are the same class of bug, found by auditing every
      // header/footer link against the app's real routes: the WP menu items
      // (header "Services" mega-menu, footer columns) carry WordPress's own
      // permalinks, which don't match this app's shorter/renamed routes (or,
      // for /knowoedge-base, are just a typo on the WP side).
      { source: "/services/drapery-curtains", destination: "/services/drapery", permanent: false },
      { source: "/services/motorized-smart-home", destination: "/services/motorized", permanent: false },
      { source: "/services/repairs-and-maintenance", destination: "/services/repairs", permanent: false },
      { source: "/blog", destination: "/resources", permanent: false },
      { source: "/knowoedge-base", destination: "/knowledge-base", permanent: false },
      // These 3 blog article routes were originally built with shortened,
      // invented slugs instead of WordPress's actual post slugs, so
      // fetchBlogSinglePage's `/${slug}/` lookup never matched a real post
      // and the pages always rendered mock/placeholder content. The route
      // slugs were corrected to match WP; redirect the old ones so any
      // already-shared/indexed links still resolve.
      { source: "/resources/uv-damage-protection", destination: "/resources/5-ways-to-protect-your-florida-home-from-uv-damage", permanent: false },
      { source: "/resources/blinds-high-humidity", destination: "/resources/choosing-the-right-blinds-for-high-humidity-rooms", permanent: false },
      { source: "/resources/motorized-shades-101", destination: "/resources/smart-home-integration-motorized-shades-101", permanent: false },
    ];
  },
  images: {
    // Next.js only serves quality values in this allowlist (default is
    // just [75]) — 60 is added for the homepage hero's more compressed
    // variant (the dark gradient overlay masks the extra compression);
    // without this, a `quality={60}` prop is silently rejected by the
    // image optimizer (400 response) and Next falls back to the default
    // 75 in the rendered srcset.
    qualities: [60, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com",
        pathname: "/api/mcp/asset/**",
      },
      {
        protocol: "https",
        hostname: "blindsndrapery.exlinelabs.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
