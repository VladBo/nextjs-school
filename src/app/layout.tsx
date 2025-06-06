import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

import { Header } from '@/components/shared/header';

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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
