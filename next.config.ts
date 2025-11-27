import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'hydeparkwinterwonderland.com',
      },
      {
        protocol: 'https',
        hostname: 'wembleypark.com',
      },
      {
        protocol: 'https', // <-- Added this new one
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https', // <-- Added this new one
        hostname: 'i.pinimg.com',
      }
    ],
  },
  devIndicators: false,
};
export default nextConfig;
