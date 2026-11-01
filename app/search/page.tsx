import type { Metadata } from 'next';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { searchContent } from '@/features/search/db/search';

export const metadata: Metadata = {
  title: 'Пошук',
  description: 'Пошук статей і навчальних матеріалів.',
};

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '' } = await searchParams;
  const query = q.trim();
  const results = await searchContent(query);

  return (
    <main className="container mx-auto min-h-[60vh] px-4 py-10 md:px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Пошук на сайті
        </h1>
        <form action="/search" className="mt-6" method="get" role="search">
          <label className="sr-only" htmlFor="site-search">
            Пошук статей і навчальних матеріалів
          </label>
          <Input
            autoFocus
            defaultValue={query}
            id="site-search"
            name="q"
            placeholder="Введіть назву або ключове слово"
            type="search"
          />
        </form>

        {!query ? (
          <p className="mt-8 text-muted-foreground">
            Введіть ключове слово, щоб знайти сторінки та статті.
          </p>
        ) : (
          <section className="mt-8" aria-live="polite">
            <p className="mb-5 text-sm text-muted-foreground">
              Знайдено: {results.length}. Запит: «{query}»
            </p>
            {results.length > 0 ? (
              <ul className="divide-y rounded-xl border bg-card">
                {results.map((result) => (
                  <li key={`${result.type}-${result.id}`}>
                    <Link
                      className="block p-5 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                      href={result.href}
                    >
                      <div className="mb-2 flex items-center gap-3">
                        <h2 className="text-lg font-semibold">
                          {result.title}
                        </h2>
                        <Badge variant="secondary">{result.type}</Badge>
                      </div>
                      {result.description && (
                        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                          {result.description}
                        </p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
                Нічого не знайдено. Спробуйте коротший або інший запит.
              </p>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
