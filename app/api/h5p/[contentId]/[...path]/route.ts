import { NextRequest, NextResponse } from 'next/server';

import { proxyH5PFile } from '@/lib/h5p-proxy.mjs';
import { logger } from '@/lib/logger';

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ contentId: string; path: string[] }> }
) {
  const { contentId, path } = await params;
  const filePath = path.join('/');

  try {
    const strapiUrl = `${STRAPI_URL}/api/h5p/content/${contentId}/${filePath}`;
    return proxyH5PFile({
      cacheControl:
        'public, max-age=0, s-maxage=60, stale-while-revalidate=300',
      request,
      upstreamUrl: strapiUrl,
    });
  } catch (error) {
    logger.error('Error fetching H5P content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch H5P content' },
      { status: 500 }
    );
  }
}
