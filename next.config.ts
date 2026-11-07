import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Hide the Next.js "N" badge in development (it never shows in production)
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 80, 90],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
