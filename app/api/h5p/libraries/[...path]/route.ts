import { NextRequest, NextResponse } from 'next/server';

import { logger } from '@/lib/logger';

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

function getContentType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  const mimeTypes: Record<string, string> = {
    json: 'application/json',
    js: 'application/javascript',
    css: 'text/css',
    html: 'text/html',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    woff: 'font/woff',
    woff2: 'font/woff2',
    ttf: 'font/ttf',
    eot: 'application/vnd.ms-fontobject',
    mp3: 'audio/mpeg',
    mp4: 'video/mp4',
    webm: 'video/webm',
  };
  return mimeTypes[ext || ''] || 'application/octet-stream';
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const filePath = path.join('/');

  try {
    // Proxy to Strapi's H5P libraries endpoint
    const strapiUrl = `${STRAPI_URL}/api/h5p/libraries/${filePath}`;

    const response = await fetch(strapiUrl, {
      headers: {
        Accept: '*/*',
      },
    });

    if (!response.ok) {
      logger.error(
        `Failed to fetch H5P library from Strapi: ${response.status} ${strapiUrl}`
      );
      return NextResponse.json(
        { error: 'H5P library not found' },
        { status: response.status }
      );
    }

    const contentType =
      response.headers.get('Content-Type') || getContentType(filePath);
    const data = await response.arrayBuffer();

    return new NextResponse(data, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    logger.error('Error fetching H5P library:', error);
    return NextResponse.json(
      { error: 'Failed to fetch H5P library' },
      { status: 500 }
    );
  }
}
