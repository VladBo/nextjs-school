import {
  Award,
  BookOpen,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';

export default function AboutPage() {
  return (
    <>
      <section className="w-full py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[600px_1fr] lg:gap-12">
            <div className="flex items-center justify-center lg:justify-start">
              <Image
                alt="Janna Bondarchuk - Computer Science Teacher"
                className="aspect-square overflow-hidden rounded-xl object-cover"
                height="600"
                src="/placeholder.svg?height=600&width=600"
                width="600"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  About Janna Bondarchuk
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Passionate Computer Science Educator
                </p>
              </div>
              <div className="space-y-4">
                <p className="leading-relaxed text-gray-600">
                  With over 15 years of experience in computer science education
                  at Lutsk School №2, I am dedicated to inspiring students to
                  explore the fascinating world of programming and technology.
                  My mission is to make computer science accessible, engaging,
                  and relevant to students of all backgrounds and skill levels.
                </p>
                <p className="leading-relaxed text-gray-600">
                  I believe that every student has the potential to become a
                  creative problem solver and innovative thinker through
                  computer science. My teaching approach combines theoretical
                  foundations with hands-on projects that connect to real-world
                  applications.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/courses">View My Courses</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Experience */}
      <section className="w-full bg-gray-50 py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Education & Experience
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed">
              My academic background and professional journey in computer
              science education.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2 lg:gap-12">
            <Card>
              <CardHeader>
                <GraduationCap className="mb-2 size-10 text-blue-600" />
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">
                    Master of Science in Computer Science
                  </h4>
                  <p className="text-sm text-gray-500">
                    Kyiv National University, 2008
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Specialized in Software Engineering and Algorithms
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold">
                    Bachelor of Science in Mathematics
                  </h4>
                  <p className="text-sm text-gray-500">
                    Kyiv National University, 2006
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Focus on Applied Mathematics and Computer Modeling
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold">Teaching Certification</h4>
                  <p className="text-sm text-gray-500">
                    Ministry of Education, Ukraine, 2009
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Certified to teach Computer Science and Mathematics
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="mb-2 size-10 text-green-600" />
                <CardTitle>Teaching Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">
                    Senior Computer Science Teacher
                  </h4>
                  <p className="text-sm text-gray-500">
                    Lutsk School №2, 2015 - Present
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Lead computer science curriculum development and teach
                    advanced programming courses
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold">Computer Science Teacher</h4>
                  <p className="text-sm text-gray-500">
                    Previous Educational Institution, 2009 - 2015
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Taught introductory programming and established the
                    school&apos;s first CS program
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold">Programming Tutor</h4>
                  <p className="text-sm text-gray-500">
                    Private Practice, 2008 - 2009
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Provided one-on-one programming instruction to high school
                    students
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements & Skills */}
      <section className="w-full py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div>
              <h3 className="mb-6 text-2xl font-bold tracking-tighter">
                Achievements & Recognition
              </h3>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Award className="size-5 text-yellow-600" />
                      <CardTitle className="text-lg">
                        Excellence in Teaching Award
                      </CardTitle>
                    </div>
                    <CardDescription>
                      Recognized for outstanding contribution to computer
                      science education (2022)
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Users className="size-5 text-blue-600" />
                      <CardTitle className="text-lg">
                        Student Competition Success
                      </CardTitle>
                    </div>
                    <CardDescription>
                      Coached students to 15+ regional and national programming
                      competition wins
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="size-5 text-green-600" />
                      <CardTitle className="text-lg">
                        Curriculum Development
                      </CardTitle>
                    </div>
                    <CardDescription>
                      Developed modern CS curriculum adopted by 5+ schools in
                      the region
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-2xl font-bold tracking-tighter">
                Technical Skills & Expertise
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="mb-3 font-semibold">Programming Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Python</Badge>
                    <Badge variant="secondary">Java</Badge>
                    <Badge variant="secondary">C++</Badge>
                    <Badge variant="secondary">JavaScript</Badge>
                    <Badge variant="secondary">HTML/CSS</Badge>
                    <Badge variant="secondary">SQL</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold">Frameworks & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">Git</Badge>
                    <Badge variant="outline">VS Code</Badge>
                    <Badge variant="outline">IntelliJ IDEA</Badge>
                    <Badge variant="outline">Scratch</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold">Teaching Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="destructive">Algorithm Design</Badge>
                    <Badge variant="destructive">Data Structures</Badge>
                    <Badge variant="destructive">Web Development</Badge>
                    <Badge variant="destructive">Problem Solving</Badge>
                    <Badge variant="destructive">Project Management</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="w-full bg-gray-50 py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Get in Touch
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed">
              Feel free to reach out for questions about courses, collaboration
              opportunities, or educational resources.
            </p>
          </div>
          <div className="mx-auto grid max-w-3xl gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader className="text-center">
                <Mail className="mx-auto mb-2 size-10 text-blue-600" />
                <CardTitle>Email</CardTitle>
                <CardDescription>
                  janna.bondarchuk@lutsk-school2.edu.ua
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <Phone className="mx-auto mb-2 size-10 text-green-600" />
                <CardTitle>Phone</CardTitle>
                <CardDescription>+380 (44) 123-4567</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <MapPin className="mx-auto mb-2 size-10 text-red-600" />
                <CardTitle>Office</CardTitle>
                <CardDescription>
                  Room 205, Computer Science Department, Lutsk School №2
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
