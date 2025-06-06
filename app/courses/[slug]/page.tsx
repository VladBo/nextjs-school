import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import coursesData from '@/data/courses.json';

import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';

interface Course {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  heroImage?: string;
  breadcrumb?: { label: string; href: string };
  sidebarHtml?: string;
  contentHtml: string;
}

const courses = coursesData as Record<string, Course>;

const getCourse = async (slug: string): Promise<Course | null> => {
  return courses[slug] ?? null;
};

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const course = await getCourse(params.slug);

  if (!course) {
    return {
      title: 'Course Not Found',
    };
  }

  return {
    title: course.title,
    description: course.description,
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    return <div className="container mx-auto py-8">Course not found</div>;
  }

  return (
    <>
      <section className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 py-6 md:py-8 lg:py-10">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          {course.breadcrumb && (
            <nav className="mb-4 flex items-center space-x-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-700">
                Home
              </Link>
              <span>/</span>
              <Link
                href={course.breadcrumb.href}
                className="hover:text-gray-700"
              >
                {course.breadcrumb.label}
              </Link>
              <span>/</span>
              <span className="text-gray-900">{course.title}</span>
            </nav>
          )}
          <div className="mb-4">
            <Button variant="ghost" asChild>
              <Link href="/courses">
                <ArrowLeft className="mr-2 size-4" />
                All Courses
              </Link>
            </Button>
          </div>
          <div className="grid items-start gap-6 lg:grid-cols-[1fr_300px] lg:gap-12">
            <div className="space-y-4">
              <div className="space-y-2">
                {course.badge && (
                  <Badge variant="secondary">{course.badge}</Badge>
                )}
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
                  {course.title}
                </h1>
                {course.subtitle && (
                  <p className="text-xl font-medium text-gray-600">
                    {course.subtitle}
                  </p>
                )}
                {course.description && (
                  <p className="max-w-[700px] leading-relaxed text-gray-500 md:text-lg">
                    {course.description}
                  </p>
                )}
              </div>
            </div>
            {course.heroImage && (
              <div className="flex items-center justify-center lg:justify-end">
                <div className="relative h-[200px] w-full max-w-[300px] overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={course.heroImage || '/placeholder.svg'}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-6 md:py-8 lg:py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:gap-12">
            {/* Main Content */}
            <div
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: course.contentHtml }}
            />
            {/* Sidebar */}
            {course.sidebarHtml && (
              <aside
                className="space-y-6"
                dangerouslySetInnerHTML={{ __html: course.contentHtml }}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
