import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

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
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
