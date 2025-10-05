import { FC } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { components } from '@/types/strapi';

type CoursesSectionProps = {
  content: components['schemas']['SectionsCoursesSectionComponent'];
};

export const CoursesSection: FC<CoursesSectionProps> = ({ content }) => {
  const { courses, title, subtitle } = content;
  return (
    <section className="w-full bg-gray-50 py-6 md:py-8 lg:py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {title}
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-6 lg:grid-cols-2 lg:gap-12">
          {courses?.map((course: components['schemas']['Course']) => (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              {course.description && (
                <CardContent>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    {course.description}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
