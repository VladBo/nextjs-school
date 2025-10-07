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
  title: 'Lutsk School number 2',
  description: 'Created with v0',
  generator: 'v0.dev',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'group/body theme-blue overscroll-none font-sans text-foreground antialiased',
          fontVariables
        )}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
