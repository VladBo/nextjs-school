import { CheckCircle, FileQuestion, PlayCircle } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getH5PContents } from '@/features/h5p/db';
import { getH5PRouteSlug, getLibraryDisplayName } from '@/features/h5p/types';

export default async function QuizzesPage() {
  const response = await getH5PContents();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          Інтерактивні вправи
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Перевіряйте знання за допомогою інтерактивних вправ H5P
        </p>
      </div>

      {!response || !response.data || response.data.length === 0 ? (
        <div className="rounded-lg border bg-card p-12 text-center">
          <FileQuestion className="mx-auto mb-4 size-12 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-semibold">Матеріалів поки немає</h3>
          <p className="text-sm text-muted-foreground">
            Інтерактивні вправи з’являться тут після публікації у Strapi
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {response.data.map((item) => {
            const hasContent = Boolean(item.h5pContent?.contentId);
            const libraryType = item.h5pContent?.library;
            const displayType = getLibraryDisplayName(libraryType);

            return (
              <Link
                key={item.documentId}
                href={`/quizzes/${getH5PRouteSlug(item)}`}
              >
                <Card className="group h-full transition-all hover:border-primary/50 hover:shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="line-clamp-2 text-lg">
                        {item.title}
                      </CardTitle>
                      {hasContent && (
                        <CheckCircle className="size-5 shrink-0 text-green-500" />
                      )}
                    </div>
                    {libraryType && (
                      <Badge variant="secondary" className="w-fit">
                        {displayType}
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <PlayCircle className="size-4" />
                      <span>
                        {hasContent
                          ? 'Відкрити вправу'
                          : 'Вправа поки недоступна'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
