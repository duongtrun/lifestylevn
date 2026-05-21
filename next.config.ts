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
    ],
  },
};

export default nextConfig;

