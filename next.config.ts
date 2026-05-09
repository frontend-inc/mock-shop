import type { NextConfig } from "next";

// All 10 storefront slugs. Kept inline (rather than imported) so this file
// stays a plain config that next-config can statically analyse.
const THEME_SLUGS =
  "maison|pulse|ferment|pantry|tread|bloom|hearth|roast|frame|trail";

// Subdomain hosts we accept for theme routing. mockshop.dev is the public
// pattern; localhost is for local dev (browsers resolve *.localhost to
// 127.0.0.1 with no /etc/hosts changes).
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
    return [
      // Shopify Storefront API canonical path → internal yoga handler.
      // Any API version segment is accepted; the .json suffix is optional.
      {
        source: "/api/:version/graphql.json",
        has: [{ type: "host", value: THEME_HOST }],
        destination: "/api/:theme/graphql",
      },
      {
        source: "/api/:version/graphql",
        has: [{ type: "host", value: THEME_HOST }],
        destination: "/api/:theme/graphql",
      },

      // Storefront pages: the subdomain shop's `/...` becomes `/:theme/...`
      // internally so the existing /[theme] route tree handles rendering.
      {
        source: "/",
        has: [{ type: "host", value: THEME_HOST }],
        destination: "/:theme",
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: THEME_HOST }],
        // Don't double-rewrite the storefront's own internal /api/<theme>/...
        missing: [{ type: "header", key: "x-skip-theme-rewrite" }],
        destination: "/:theme/:path*",
      },
    ];
  },
};

export default nextConfig;
