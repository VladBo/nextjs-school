import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // @ts-expect-error: 'eslint' is not a valid Next.js config in v16+
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
    ],
    unoptimized: false,
  },
  async rewrites() {
    return [
      {
        source: '/h5p/core/:path*',
        destination: `${process.env.NEXT_PUBLIC_STRAPI_URL}/h5p/core/:path*`,
      },
      {
        source: '/h5p/editor/:path*',
        destination: `${process.env.NEXT_PUBLIC_STRAPI_URL}/h5p/editor/:path*`,
      },
    ];
  },
  // reactCompiler: true,
  // experimental: {
  //   turbopackFileSystemCacheForDev: true,
  // },
};

export default nextConfig;
