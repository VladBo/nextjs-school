import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getStrapiMediaUrl } from '@/lib/utils';

interface QuizCardProps {
  quiz: {
    id: number;
    title?: string;
    description?: string;
    grade?: string;
    subject?: string;
    difficulty?: string;
    estimatedTime?: number;
    thumbnail?: {
      url?: string;
      alternativeText?: string;
    };
  };
}

export function QuizCard({ quiz }: QuizCardProps) {
  return (
    <Link href={`/quizzes/${quiz.id}`}>
      <Card className="h-full transition-shadow hover:shadow-lg">
        {quiz.thumbnail && (
          <div className="relative h-48 w-full">
            <Image
              src={getStrapiMediaUrl(quiz.thumbnail.url)}
              alt={quiz.thumbnail.alternativeText ?? quiz.title ?? 'Quiz'}
              fill
              className="rounded-t-lg object-cover"
            />
          </div>
        )}
        <CardHeader>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {quiz.grade && (
              <Badge variant="outline" className="bg-primary/10 text-primary">
                Grade {quiz.grade}
              </Badge>
            )}
            {quiz.subject && (
              <Badge variant="outline" className="bg-accent/10 text-accent">
                {quiz.subject}
              </Badge>
            )}
            {quiz.difficulty && (
              <Badge variant="outline">{quiz.difficulty}</Badge>
            )}
          </div>
          <CardTitle className="line-clamp-2 text-lg">{quiz.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {quiz.description}
          </p>
          {quiz.estimatedTime && (
            <div className="mt-4 text-xs text-muted-foreground">
              {quiz.estimatedTime} minutes
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
