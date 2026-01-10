import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getH5PContents } from '@/features/h5p/db';

export default async function QuizzesPage() {
  const response = await getH5PContents();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          Interactive Content
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Explore our H5P interactive content
        </p>
      </div>

      {!response || !response.data || response.data.length === 0 ? (
        <div className="rounded-lg border bg-card p-12 text-center">
          <h3 className="mb-2 text-lg font-semibold">No content found</h3>
          <p className="text-sm text-muted-foreground">
            Content will appear here once it is created in Strapi
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {response.data.map((item) => (
            <Link key={item.documentId} href={`/quizzes/${item.documentId}`}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Click to view interactive content
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
