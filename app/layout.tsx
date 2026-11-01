import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

import { Footer } from '@/features/footer/components';
import { Header } from '@/features/header/components';
import { fontVariables } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Сайт учителя інформатики',
  description:
    'Навчальні матеріали, новини та інтерактивні завдання з інформатики.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={cn(
          'group/body theme-blue overscroll-none font-sans text-foreground antialiased',
          fontVariables
        )}
      >
        <div className="flex min-h-screen flex-col">
          {/* @ts-expect-error Async Server Component */}
          <Header />
          <main className="flex-1">{children}</main>
          {/* @ts-expect-error Async Server Component */}
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
