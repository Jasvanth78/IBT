import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  // GitHub Pages usually hosts from https://Jasvanth78.github.io/IBT/
  // We only apply basePath in production/CI to avoid breaking local dev
  basePath: isGithubActions ? '/IBT' : '',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
    ],
  },
  allowedDevOrigins: ['10.248.33.25', 'localhost:3000'],
};

export default nextConfig;

