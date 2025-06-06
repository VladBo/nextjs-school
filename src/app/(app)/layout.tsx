import { ReactNode } from 'react';

// import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';

export default function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
