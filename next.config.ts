import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ];
  },
  images: {
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
