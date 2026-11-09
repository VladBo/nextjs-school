import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { CACHE_TAGS, CONTENT_TYPE_CACHE_MAP } from '@/lib/cache';
import { logger } from '@/lib/logger';

interface StrapiWebhookPayload {
  event: string;
  createdAt: string;
  model?: string;
  uid?: string;
  entry?: {
    id?: number;
    documentId?: string;
    slug?: string;
    [key: string]: unknown;
  };
  media?: Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  try {
    const webhookSecret = request.headers.get('Authorization');

    if (webhookSecret !== process.env.STRAPI_WEBHOOK_SECRET) {
      logger.error('Invalid webhook secret');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload: StrapiWebhookPayload = await request.json();
    // Strapi sends a short `model` name for entry events and a separate `uid`.
    // Media events have a different envelope and no model/uid.
    const rawModel = payload.model || payload.uid;
    const model = rawModel?.includes('::')
      ? rawModel.split('.').at(-1)
      : rawModel;
    const isMediaEvent =
      payload.event.startsWith('media.') ||
      !!payload.media ||
      rawModel === 'plugin::upload.file' ||
      model === 'file';

    logger.info('Webhook received:', {
      event: payload.event,
      model: isMediaEvent ? 'media' : model,
      entryId: payload.entry?.id,
      slug: payload.entry?.slug,
    });

    const tagsToInvalidate = isMediaEvent
      ? [...new Set([...Object.values(CACHE_TAGS), 'legacy-content-aliases'])]
      : CONTENT_TYPE_CACHE_MAP[model as keyof typeof CONTENT_TYPE_CACHE_MAP] ||
        [];

    for (const tag of tagsToInvalidate) {
      logger.info(`Invalidating cache tag: ${tag}`);
      revalidateTag(tag);
    }

    // Sitemap content is assembled from the same cached Strapi collections.
    revalidatePath('/sitemap.xml');

    if (isMediaEvent) {
      // Media can be referenced from any page, so refresh the full route tree.
      revalidatePath('/', 'layout');
    }

    if (model === 'article') {
      revalidateTag('legacy-content-aliases');
      if (payload.entry?.slug) {
        revalidateTag(`article-${payload.entry.slug}`);
        revalidatePath('/articles/[slug]', 'page');
      }
    }

    if (model === 'page') {
      revalidateTag('legacy-content-aliases');
      if (payload.entry?.slug) {
        revalidatePath('/pages/[slug]', 'page');
      }
    }

    if (model === 'course' && payload.entry?.slug) {
      revalidatePath(`/courses/${payload.entry.slug}`);
    }

    if (model === 'h5p-content') {
      revalidatePath('/quizzes');
      revalidatePath('/api/h5p/[contentId]/[...path]', 'page');
      revalidateTag('legacy-content-aliases');
      if (payload.entry?.documentId) {
        revalidatePath(`/quizzes/${payload.entry.documentId}`);
      }
      if (payload.entry?.slug) {
        revalidatePath(`/quizzes/${payload.entry.slug}`);
      }
    }

    if (model === 'homepage') {
      logger.info('Revalidating homepage path');
      revalidatePath('/');
    }

    if (
      model === 'header-menu' ||
      model === 'footer-menu' ||
      model === 'global'
    ) {
      logger.info('Revalidating all paths due to menu change');
      revalidatePath('/', 'layout');
    }

    return NextResponse.json({
      success: true,
      message: 'Cache invalidated successfully',
      invalidated: {
        tags: tagsToInvalidate,
        entry: payload.entry?.slug || payload.entry?.id,
        model: isMediaEvent ? 'media' : model,
      },
    });
  } catch (error) {
    logger.error('Error processing webhook:', error);
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
