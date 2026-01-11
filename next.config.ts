import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  experimental: {
    staleTimes: {
      dynamic: 30000,
      static: 30000,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lzmijym9f9dkp5qm.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
