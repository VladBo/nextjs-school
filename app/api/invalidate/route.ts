import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { CACHE_TAGS, CONTENT_TYPE_CACHE_MAP } from '@/lib/cache';

interface StrapiWebhookPayload {
  event: string;
  createdAt: string;
  model: string;
  entry: {
    id: number;
    documentId?: string;
    slug?: string;
    [key: string]: any;
  };
}

export async function POST(request: NextRequest) {
  try {
    const webhookSecret = request.headers.get('Authorization');

    if (webhookSecret !== process.env.STRAPI_WEBHOOK_SECRET) {
      console.error('Invalid webhook secret');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload: StrapiWebhookPayload = await request.json();

    console.log('🔄 Webhook received:', {
      event: payload.event,
      model: payload.model,
      entryId: payload.entry?.id,
      slug: payload.entry?.slug,
    });

    const tagsToInvalidate =
      CONTENT_TYPE_CACHE_MAP[
        payload.model as keyof typeof CONTENT_TYPE_CACHE_MAP
      ] || [];

    for (const tag of tagsToInvalidate) {
      console.log(`🗑️  Invalidating cache tag: ${tag}`);
      revalidateTag(tag);
    }

    if (payload.model === 'article' && payload.entry?.slug) {
      revalidatePath(`/articles/${payload.entry.slug}`);
    }

    if (payload.model === 'course' && payload.entry?.slug) {
      revalidatePath(`/courses/${payload.entry.slug}`);
    }

    if (payload.model === 'homepage') {
      console.log('🔄 Revalidating homepage path');
      revalidatePath('/');
    }

    if (
      payload.model === 'header-menu' ||
      payload.model === 'footer-menu' ||
      payload.model === 'global'
    ) {
      console.log('🔄 Revalidating all paths due to menu change');
      revalidatePath('/', 'layout');
    }

    return NextResponse.json({
      success: true,
      message: 'Cache invalidated successfully',
      invalidated: {
        tags: tagsToInvalidate,
        entry: payload.entry?.slug || payload.entry?.id,
        model: payload.model,
      },
    });
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Handle GET request for webhook verification/testing
export async function GET() {
  return NextResponse.json({
    message: 'Cache invalidation webhook endpoint is active',
    supportedMethods: ['POST'],
    cacheTagsAvailable: Object.values(CACHE_TAGS),
  });
}
