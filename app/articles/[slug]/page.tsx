import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BackButton } from '@/components/back-button';
import { Badge } from '@/components/ui/badge';
import { ArticleBlocks } from '@/features/articles/components/article-blocks';
import { ArticleImage } from '@/features/articles/components/article-image';
import { ArticleMeta } from '@/features/articles/components/article-meta';
import { getArticleBySlug } from '@/features/articles/db';
import { getStrapiMediaUrl } from '@/lib/utils';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return {
    title: article.title,
    description: `Article by ${article.author} on ${article.publishedAt}`,
  };
}

export default async function ArticlePage(props: PageProps) {
  const params = await props.params;
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  console.log('url:', article.cover?.url);
  console.log('media url:', getStrapiMediaUrl(article.cover?.url));

  return (
    <article className="w-full">
      <nav className="w-full bg-gray-50 py-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            <span>/</span>
            <Link href="/articles" className="hover:text-gray-700">
              Articles
            </Link>
            <span>/</span>
            <span className="text-gray-900">{article.title}</span>
          </div>
        </div>
      </nav>

      <BackButton href="/articles" title="Back to Articles" />

      {/* Article Hero */}
      <section className="w-full py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-4">
              <Badge variant="secondary">
                {(article.category as { name: string })?.name}
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
                {article.title}
              </h1>
              {article.description && (
                <p className="text-xl leading-relaxed text-gray-600">
                  {article.description}
                </p>
              )}

              <ArticleMeta
                authorName={article.author?.name ?? ''}
                publishedAt={article.publishedAt ?? ''}
              />
              {article.cover && (
                <ArticleImage
                  src={getStrapiMediaUrl(article.cover?.url)}
                  alt={article.cover?.alternativeText ?? ''}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      {/* <ArticleBlocks blocks={article.blocks} tags={article.tags} /> */}
      <ArticleBlocks blocks={article.blocks} />

      {/* Article Navigation */}
      {/* {(article.previousArticle || article.nextArticle) && (
        <section className="w-full bg-gray-50 py-6">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-4 md:grid-cols-2">
                {article.previousArticle && (
                  <Card>
                    <CardContent className="p-4">
                      <p className="mb-2 text-sm text-gray-500">
                        Previous Article
                      </p>
                      <Link
                        href={article.previousArticle.href}
                        className="font-medium hover:text-blue-600"
                      >
                        {article.previousArticle.title}
                      </Link>
                    </CardContent>
                  </Card>
                )}
                {article.nextArticle && (
                  <Card>
                    <CardContent className="p-4 text-right">
                      <p className="mb-2 text-sm text-gray-500">Next Article</p>
                      <Link
                        href={article.nextArticle.href}
                        className="font-medium hover:text-blue-600"
                      >
                        {article.nextArticle.title}
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      )} */}

      {/* Related Articles */}
      {/* {article.relatedArticles.length > 0 && (
        <section className="w-full py-6 md:py-8">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {article.relatedArticles.map((article, index) => (
                  <Card
                    key={index}
                    className="transition-shadow hover:shadow-lg"
                  >
                    <Link href={article.href}>
                      {article.image && (
                        <div className="relative h-48 w-full">
                          <Image
                            src={article.image || '/placeholder.svg'}
                            alt={article.title}
                            fill
                            className="rounded-t-lg object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="mb-2 flex items-center justify-between">
                          <Badge variant="outline">{article.category}</Badge>
                          <span className="text-xs text-gray-500">
                            {article.publishedAt}
                          </span>
                        </div>
                        <CardTitle className="line-clamp-2 text-lg">
                          {article.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="line-clamp-3 text-sm text-gray-600">
                          {article.excerpt}
                        </p>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )} */}
    </article>
  );
}
