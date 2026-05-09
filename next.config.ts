import type { NextConfig } from "next";

const THEME_SLUGS =
  "maison|pulse|ferment|pantry|tread|bloom|hearth|roast|frame|trail";

// mockshop.dev is the public domain; *.localhost is for local dev (browsers
// resolve it to 127.0.0.1 with no /etc/hosts changes).
const THEME_HOST = `(?<theme>${THEME_SLUGS})\\.(?:mockshop\\.dev|localhost(?::\\d+)?)`;

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "supabase.frontend-ai.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
  async rewrites() {
    return {
      // beforeFiles runs before filesystem routing, so a request to `/` on a
      // theme subdomain doesn't get caught by app/page.tsx (the picker).
      beforeFiles: [
        // Shopify Storefront canonical path (and the .json-less variant) →
        // fixed handler that resolves the theme from the Host header.
        {
          source: "/api/:version/graphql.json",
          has: [{ type: "host", value: THEME_HOST }],
          destination: "/api/_storefront",
        },
        {
          source: "/api/:version/graphql",
          has: [{ type: "host", value: THEME_HOST }],
          destination: "/api/_storefront",
        },

        // Storefront pages: subdomain `/...` → internal `/<theme>/...`.
        {
          source: "/",
          has: [{ type: "host", value: THEME_HOST }],
          destination: "/:theme",
        },
        {
          source: "/:path*",
          has: [{ type: "host", value: THEME_HOST }],
          destination: "/:theme/:path*",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
