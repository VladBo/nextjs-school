import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { H5PPlayer } from '@/features/h5p/components';
import { getQuizById } from '@/features/h5p/db';

export default async function QuizPage({ params }: { params: { id: string } }) {
  const response = await getQuizById(params.id);

  if (!response || !response.data) {
    notFound();
  }

  const quizData = response.data;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Link href="/quizzes">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 size-4" />
          Back to Quizzes
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold md:text-4xl">
          {quizData.title}
        </h1>

        {quizData.description && (
          <p className="mb-4 text-lg text-muted-foreground">
            {quizData.description}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          {quizData.grade && (
            <Badge className="bg-primary/10 text-primary">
              Grade {quizData.grade}
            </Badge>
          )}
          {quizData.subject && (
            <Badge className="bg-accent/10 text-accent">
              {quizData.subject}
            </Badge>
          )}
          {quizData.difficulty && (
            <Badge variant="outline">{quizData.difficulty}</Badge>
          )}
          {quizData.estimatedTime && (
            <Badge variant="outline">{quizData.estimatedTime} minutes</Badge>
          )}
        </div>
      </div>

      <div className="rounded-lg border bg-card p-8">
        <H5PPlayer contentId={params.id} />
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          Having trouble with the quiz? Please contact your teacher for
          assistance.
        </p>
      </div>
    </div>
  );
}
