import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { H5PPlayer } from '@/features/h5p/components';
import { getH5PContentById } from '@/features/h5p/db';

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getH5PContentById(id);

  if (!response || !response.data) {
    notFound();
  }

  const content = response.data;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Link href="/quizzes">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 size-4" />
          Back to Content
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold md:text-4xl">{content.title}</h1>
      </div>

      <div className="rounded-lg border bg-card p-8">
        {content.h5pFile ? (
          <H5PPlayer contentId={id} title={content.title} />
        ) : (
          <div className="p-12 text-center text-muted-foreground">
            No H5P file attached to this content
          </div>
        )}
      </div>
    </div>
  );
}
