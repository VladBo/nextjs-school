import type { Metadata } from 'next';
import Link from 'next/link';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import coursesData from '@/data/courses.json';

export const metadata: Metadata = {
  title: 'Курси',
  description: 'Курси з програмування та веброзробки.',
};

export default function CoursesPage() {
  return (
    <main className="container mx-auto px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Навчальні курси
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
            Програми для послідовного вивчення програмування та сучасних
            вебтехнологій.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(coursesData).map(([slug, course]) => (
            <Link key={slug} href={`/courses/${slug}`}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
