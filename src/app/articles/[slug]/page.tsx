import { ArrowLeft, Calendar, Clock, Share2, Tag, User } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import articles from '@/data/articles.json';

export type Article = {
  title: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  readingTime: string;
  featuredImage?: string;
  tags: string[];
  relatedArticles: {
    title: string;
    href: string;
    image?: string;
    category?: string;
    publishedAt?: string;
    excerpt?: string;
  }[];
  previousArticle?: {
    title: string;
    href: string;
  };
  nextArticle?: {
    title: string;
    href: string;
  };
  author: string;
  contentHtml: string;
};

const getArticle = async (slug: string): Promise<Article | null> => {
  return (articles as Record<string, Article>)[slug] ?? null;
};

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return {
    title: article.title,
    description: `Article by ${article.author} on ${article.publishedAt}`,
  };
}

export default async function ArticlePage(props: Props) {
  const params = await props.params;
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="w-full">
      {/* Breadcrumb */}
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

      {/* Back Button */}
      <div className="w-full py-4">
        <div className="container mx-auto px-4 md:px-6">
          <Button variant="ghost" asChild>
            <Link href="/articles">
              <ArrowLeft className="mr-2 size-4" />
              Back to Articles
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Hero */}
      <section className="w-full py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-4">
              <Badge variant="secondary">{article.category}</Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
                {article.title}
              </h1>
              {article.excerpt && (
                <p className="text-xl leading-relaxed text-gray-600">
                  {article.excerpt}
                </p>
              )}

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <User className="size-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="size-4" />
                  <span>{article.publishedAt}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="size-4" />
                  <span>{article.readingTime}</span>
                </div>
                <Button variant="ghost" size="sm">
                  <Share2 className="mr-1 size-4" />
                  Share
                </Button>
              </div>

              {/* Featured Image */}
              {article.featuredImage && (
                <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
                  <Image
                    src={article.featuredImage || '/placeholder.svg'}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="w-full py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div
              className="prose prose-gray prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="mt-8 border-t pt-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="size-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Tags:</span>
                  {article.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      {(article.previousArticle || article.nextArticle) && (
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
      )}

      {/* Related Articles */}
      {article.relatedArticles.length > 0 && (
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
      )}
    </article>
  );
}
