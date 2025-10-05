import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getStrapiMediaUrl } from '@/lib/utils';
import { components } from '@/types/strapi';

type ArticlesSectionProps = {
  content: components['schemas']['SectionsArticlesSectionComponent'];
};

export const ArticlesSection: FC<ArticlesSectionProps> = ({ content }) => {
  const { articles, title, subtitle } = content;
  return (
    <section className="w-full py-6 md:py-8 lg:py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {title}
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-6 lg:grid-cols-3 lg:gap-12">
          {articles?.map((article: components['schemas']['Article']) => (
            <Card
              key={article.id}
              className="transition-shadow hover:shadow-lg"
            >
              {article.slug ? (
                <Link href={article.slug}>
                  {article.cover && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={getStrapiMediaUrl(article.cover.url)}
                        alt={
                          article.cover.alternativeText ?? article.title ?? ''
                        }
                        fill
                        className="rounded-t-lg object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="mb-2 flex items-center justify-between">
                      {article.category && (
                        <Badge variant="outline">
                          {(article.category as { name: string })?.name}
                        </Badge>
                      )}
                      {article.publishedAt && (
                        <span className="text-xs text-gray-500">
                          {article.publishedAt}
                        </span>
                      )}
                    </div>
                    <CardTitle className="line-clamp-2 text-lg">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm text-gray-600">
                      {article.description}
                    </p>
                  </CardContent>
                </Link>
              ) : (
                <>
                  {article.cover && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={getStrapiMediaUrl(article.cover.url)}
                        alt={
                          article.cover.alternativeText ?? article.title ?? ''
                        }
                        fill
                        className="rounded-t-lg object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="mb-2 flex items-center justify-between">
                      {article.category && (
                        <Badge variant="outline">
                          {' '}
                          {(article.category as { name: string })?.name}
                        </Badge>
                      )}
                      {article.publishedAt && (
                        <span className="text-xs text-gray-500">
                          {article.publishedAt}
                        </span>
                      )}
                    </div>
                    <CardTitle className="line-clamp-2 text-lg">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm text-gray-600">
                      {article.description}
                    </p>
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
