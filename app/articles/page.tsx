import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getArticles } from '@/features/articles/db';
import { getStrapiMediaUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Матеріали',
  description: 'Новини, події та навчальні матеріали з інформатики.',
};

const dateFormatter = new Intl.DateTimeFormat('uk-UA', { dateStyle: 'medium' });

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <main className="container mx-auto px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Матеріали та новини
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
            Події, конкурси й корисні матеріали з інформатики.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => {
            const categoryName = (
              article.category as { name?: string } | undefined
            )?.name;

            return (
              <Link key={article.documentId} href={`/articles/${article.slug}`}>
                <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                  {article.cover?.url && (
                    <div className="relative aspect-video">
                      <Image
                        alt={
                          article.cover.alternativeText || article.title || ''
                        }
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        src={getStrapiMediaUrl(article.cover.url)}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      {categoryName && (
                        <Badge variant="secondary">{categoryName}</Badge>
                      )}
                      {article.sourceUpdatedAt && (
                        <span className="text-xs text-muted-foreground">
                          {dateFormatter.format(
                            new Date(article.sourceUpdatedAt)
                          )}
                        </span>
                      )}
                    </div>
                    <CardTitle className="line-clamp-2 text-xl">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  {article.description && (
                    <CardContent>
                      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {article.description}
                      </p>
                    </CardContent>
                  )}
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
