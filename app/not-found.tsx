import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-12 text-center">
      <div>
        <p className="text-sm font-semibold text-blue-700">Помилка 404</p>
        <h1 className="mt-2 text-3xl font-bold">Сторінку не знайдено</h1>
        <p className="mt-3 text-muted-foreground">
          Перевірте адресу або поверніться на головну сторінку.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">На головну</Link>
        </Button>
      </div>
    </main>
  );
}
