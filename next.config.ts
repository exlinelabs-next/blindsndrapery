import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // TEMPORARY: Figma's exported-asset CDN. These URLs expire ~7 days
        // after being generated (see components using them for a TODO).
        // Once real photo assets are exported and committed to public/,
        // remove this entry.
        protocol: "https",
        hostname: "www.figma.com",
        pathname: "/api/mcp/asset/**",
      },
    ],
  },
};

export default nextConfig;
