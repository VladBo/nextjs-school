import { NextRequest, NextResponse } from 'next/server';

import { proxyH5PFile } from '@/lib/h5p-proxy.mjs';
import { logger } from '@/lib/logger';

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const ASSET_BASE_URL = process.env.ASSET_BASE_URL?.replace(/\/$/, '');

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ contentId: string; path: string[] }> }
) {
  const { contentId, path } = await params;
  const filePath = path.join('/');

  try {
    const assetUrl = ASSET_BASE_URL
      ? `${ASSET_BASE_URL}/h5p/content/${contentId}/${filePath}`
      : `${STRAPI_URL}/api/h5p/content/${contentId}/${filePath}`;
    return proxyH5PFile({
      cacheControl:
        'public, max-age=0, s-maxage=300, stale-while-revalidate=60',
      cacheTags: ['h5p-assets', `h5p-content-${contentId}`],
      request,
      upstreamUrl: assetUrl,
    });
  } catch (error) {
    logger.error('Error fetching H5P content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch H5P content' },
      { status: 500 }
    );
  }
}
