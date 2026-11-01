import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { H5PPlayer } from '@/features/h5p/components';
import { getH5PContentById, getH5PContents } from '@/features/h5p/db';
import { getH5PRouteSlug } from '@/features/h5p/types';

export async function generateStaticParams() {
  const response = await getH5PContents();

  if (!response) {
    throw new Error('Unable to load quizzes from Strapi during the build');
  }

  return response.data
    .filter((content) => content.sourceLocale === 'uk')
    .map((content) => ({ slug: getH5PRouteSlug(content) }));
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const contents = await getH5PContents();
  const indexedContent = contents?.data.find(
    (content) =>
      content.documentId === slug || getH5PRouteSlug(content) === slug
  );
  if (!indexedContent) notFound();

  const canonicalSlug = getH5PRouteSlug(indexedContent);
  if (slug !== canonicalSlug) permanentRedirect(`/quizzes/${canonicalSlug}`);

  const response = await getH5PContentById(indexedContent.documentId);

  if (!response || !response.data || response.data.sourceLocale !== 'uk') {
    notFound();
  }

  const content = response.data;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Link href="/quizzes">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 size-4" />
          До всіх вправ
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold md:text-4xl">{content.title}</h1>
      </div>

      <div className="rounded-lg border bg-card p-8">
        {content.h5pContent?.contentId ? (
          <H5PPlayer
            contentId={String(content.h5pContent.contentId)}
            title={content.title}
          />
        ) : (
          <div className="p-12 text-center text-muted-foreground">
            Для цього запису немає доступної вправи H5P
          </div>
        )}
      </div>
    </div>
  );
}
