import JSZip from 'jszip';
import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// Cache extracted h5p files in memory
const h5pCache = new Map<string, JSZip>();

async function getH5PZip(contentId: string): Promise<JSZip | null> {
  // Check cache first
  if (h5pCache.has(contentId)) {
    return h5pCache.get(contentId)!;
  }

  try {
    // Fetch content info from Strapi
    const response = await fetch(
      `${STRAPI_URL}/api/h5p-contents/${contentId}?populate=h5pFile`
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const h5pFileUrl = data.data?.h5pFile?.url;

    if (!h5pFileUrl) {
      return null;
    }

    // Fetch the .h5p file
    const fullUrl = h5pFileUrl.startsWith('http')
      ? h5pFileUrl
      : `${STRAPI_URL}${h5pFileUrl}`;

    const fileResponse = await fetch(fullUrl);
    if (!fileResponse.ok) {
      return null;
    }

    const arrayBuffer = await fileResponse.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);

    // Cache for future requests
    h5pCache.set(contentId, zip);

    return zip;
  } catch {
    return null;
  }
}

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
  { params }: { params: Promise<{ contentId: string; path: string[] }> }
) {
  const { contentId, path } = await params;
  const filePath = path.join('/');

  const zip = await getH5PZip(contentId);
  if (!zip) {
    return NextResponse.json(
      { error: 'H5P content not found' },
      { status: 404 }
    );
  }

  // Try to find the file in the zip
  const file = zip.file(filePath);
  if (!file) {
    // Try with 'content/' prefix for content files
    const contentFile = zip.file(`content/${filePath}`);
    if (!contentFile) {
      return NextResponse.json(
        { error: 'File not found in H5P package' },
        { status: 404 }
      );
    }

    const content = await contentFile.async('arraybuffer');
    return new NextResponse(content, {
      headers: {
        'Content-Type': getContentType(filePath),
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  }

  const content = await file.async('arraybuffer');
  return new NextResponse(content, {
    headers: {
      'Content-Type': getContentType(filePath),
      'Cache-Control': 'public, max-age=31536000',
    },
  });
}
