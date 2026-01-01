import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lzmijym9f9dkp5qm.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
