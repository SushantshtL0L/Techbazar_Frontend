import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5050/api/:path*',
      },
      {
        source: '/user_photos/:path*',
        destination: 'http://localhost:5050/user_photos/:path*',
      },
      {
        source: '/item_photos/:path*',
        destination: 'http://localhost:5050/item_photos/:path*',
      },
    ]
  }
};

export default nextConfig;
