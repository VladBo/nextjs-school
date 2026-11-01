import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BlockManager } from '@/features/blocks/block-manager';
import { ContactMap } from '@/features/pages/components/contact-map';
import { getPageBySlug, getPageSlugs } from '@/features/pages/db/pages';
import { getSearchIndex } from '@/features/search/db/search';
import { getStrapiMediaUrl } from '@/lib/utils';

type PageProps = {
  params: Promise<{ slug: string }>;
};

const archivedScheduleDates: Record<string, { iso: string; label: string }> = {
  'rozklad-urokiv': { iso: '2016-11-03', label: '3 листопада 2016 року' },
  'rozklad-dzvinkiv': { iso: '2016-11-03', label: '3 листопада 2016 року' },
  'rozklad-fakultativiv': { iso: '2017-12-18', label: '18 грудня 2017 року' },
};

export async function generateStaticParams() {
  const [slugs] = await Promise.all([getPageSlugs(), getSearchIndex()]);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return { title: 'Сторінку не знайдено' };
  }

  return {
    title: page.title,
    description: page.description || undefined,
  };
}

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const archiveDate = archivedScheduleDates[slug];

  return (
    <main className="w-full">
      <section className="border-b bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <nav className="mb-6 text-sm text-muted-foreground">
            <Link className="hover:text-foreground" href="/">
              Головна
            </Link>
            <span className="px-2">/</span>
            <span>{page.title}</span>
          </nav>
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_420px]">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                {page.title}
              </h1>
              {page.description && (
                <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
                  {page.description}
                </p>
              )}
            </div>
            {page.cover?.url && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                <Image
                  alt={page.cover.alternativeText || page.title}
                  className="object-cover"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 420px"
                  src={getStrapiMediaUrl(page.cover.url)}
                />
              </div>
            )}
          </div>
        </div>
      </section>
      {archiveDate && (
        <aside
          aria-label="Архівний розклад"
          className="container mx-auto px-4 pt-6 md:px-6"
        >
          <p
            className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950"
            role="status"
          >
            <strong>Архівна інформація.</strong> Дані перенесено з архіву;
            актуальність не підтверджена. Останнє оновлення:{' '}
            <time dateTime={archiveDate.iso}>{archiveDate.label}</time>.
          </p>
        </aside>
      )}
      {(page.blocks?.length ||
        (page.pageType === 'contact' && page.mapEmbedUrl)) && (
        <section className="container mx-auto px-4 py-10 md:px-6 md:py-14">
          <div className="mx-auto max-w-4xl space-y-10">
            {page.blocks?.length ? <BlockManager blocks={page.blocks} /> : null}
            {page.pageType === 'contact' && page.mapEmbedUrl ? (
              <ContactMap
                embedUrl={page.mapEmbedUrl}
                linkUrl={page.mapLinkUrl}
              />
            ) : null}
          </div>
        </section>
      )}
    </main>
  );
}
