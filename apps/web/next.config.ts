import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  
  allowedDevOrigins: [
    "192.168.1.18",
    "10.79.228.98",
    "10.79.228.98:3000",
    "192.168.1.18:3000",
    "192.168.85.98",
    "192.168.85.98:3000",
    "localhost:3000",
  ],

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
