import { NextRequest, NextResponse } from 'next/server';

import { proxyH5PFile } from '@/lib/h5p-proxy.mjs';
import { logger } from '@/lib/logger';

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const filePath = path.join('/');

  try {
    const strapiUrl = `${STRAPI_URL}/api/h5p/libraries/${filePath}`;
    return proxyH5PFile({
      cacheControl: 'public, max-age=31536000, immutable',
      request,
      upstreamUrl: strapiUrl,
    });
  } catch (error) {
    logger.error('Error fetching H5P library:', error);
    return NextResponse.json(
      { error: 'Failed to fetch H5P library' },
      { status: 500 }
    );
  }
}
