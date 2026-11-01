import { BookOpen, Code2, GraduationCap } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Про вчителя',
  description: 'Про Жанну Бондарчук та навчальні матеріали з інформатики.',
};

const focusAreas = [
  {
    title: 'Інформатика',
    description:
      'Матеріали для уроків, самостійної роботи та розвитку цифрової грамотності.',
    icon: GraduationCap,
  },
  {
    title: 'Програмування',
    description:
      'Алгоритмічне мислення, Scratch, Python і практичне розв’язування задач.',
    icon: Code2,
  },
  {
    title: 'Методична робота',
    description: 'Розробки уроків, рекомендації та обмін досвідом з колегами.',
    icon: BookOpen,
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="border-b bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-3 font-medium text-blue-700">Про вчителя</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Жанна Бондарчук
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
              Учителька інформатики. Цей сайт створено для учнів, батьків і
              колег як простір для навчання, спілкування та обміну досвідом.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/pages/metodichni-rekomendaciyi">
                  Переглянути матеріали
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pages/kontakti">Зв’язатися</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {focusAreas.map(({ title, description, icon: Icon }) => (
            <Card key={title}>
              <CardHeader>
                <Icon className="mb-2 size-10 text-blue-600" />
                <CardTitle>{title}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
