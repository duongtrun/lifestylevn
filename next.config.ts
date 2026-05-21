import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Cho phép gửi file lớn (tối đa 10MB) qua Server Actions — dùng cho form nộp CV
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'lifestyleadminvn.local',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '10004',
      },
      {
        protocol: 'https',
        hostname: '*.localsite.io',
      },
      {
        protocol: 'https',
        hostname: '*.loca.lt',
      },
      {
        protocol: 'https',
        hostname: '*.ngrok-free.app',
      },
      {
        protocol: 'https',
        hostname: '*.ngrok.io',
      },
    ],
  },
};

export default nextConfig;

