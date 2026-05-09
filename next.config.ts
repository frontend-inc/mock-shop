import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      // Generated theme imagery hosted in Supabase Storage.
      { protocol: "https", hostname: "supabase.frontend-ai.com" },
      // Fallback placeholder source for not-yet-generated images.
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};

export default nextConfig;
