import type { NextConfig } from 'next';

const assetBaseUrl = process.env.ASSET_BASE_URL;
const assetImagePattern = assetBaseUrl
  ? (() => {
      const assetUrl = new URL(assetBaseUrl);
      const assetPath = assetUrl.pathname.replace(/\/$/, '');

      return {
        protocol: assetUrl.protocol.slice(0, -1) as 'http' | 'https',
        hostname: assetUrl.hostname,
        port: assetUrl.port,
        pathname: `${assetPath}/media/**`,
        search: '',
      };
    })()
  : undefined;

const nextConfig: NextConfig = {
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
      ...(assetImagePattern ? [assetImagePattern] : []),
    ],
    unoptimized: false,
  },
  async rewrites() {
    const strapiUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

    return [
      // H5P core JS/CSS assets
      {
        source: '/h5p/core/:path*',
        destination: `${strapiUrl}/h5p/core/:path*`,
      },
      // H5P editor assets (for admin editing)
      {
        source: '/h5p/editor/:path*',
        destination: `${strapiUrl}/h5p/editor/:path*`,
      },
      // H5P library files (content type implementations)
      {
        source: '/h5p/libraries/:path*',
        destination: `${strapiUrl}/h5p/libraries/:path*`,
      },
      // H5P content files (extracted .h5p content)
      {
        source: '/h5p/content/:path*',
        destination: `${strapiUrl}/h5p/content/:path*`,
      },
      // H5P embed pages (iframe player)
      {
        source: '/h5p/embed/:contentId',
        destination: `${strapiUrl}/h5p/embed/:contentId`,
      },
      // H5P play endpoint
      {
        source: '/h5p/play/:contentId',
        destination: `${strapiUrl}/h5p/play/:contentId`,
      },
    ];
  },
  // reactCompiler: true,
  // experimental: {
  //   turbopackFileSystemCacheForDev: true,
  // },
};

export default nextConfig;
