'use client';

import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight, BookOpen, Calendar, Code, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../components/ui/carousel';

function HeroSlideshow() {
  const slides = [
    {
      image: '/placeholder.svg?height=550&width=550',
      title: 'Interactive Learning',
      description: 'Students working on collaborative programming projects',
    },
    {
      image: '/placeholder.svg?height=550&width=550',
      title: 'Modern Technology',
      description: 'Learning with the latest development tools and frameworks',
    },
    {
      image: '/placeholder.svg?height=550&width=550',
      title: 'Competition Success',
      description: 'Our students excel in programming competitions',
    },
    {
      image: '/placeholder.svg?height=550&width=550',
      title: 'Real-World Projects',
      description: 'Building applications that solve real problems',
    },
  ];

  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <div className="relative h-[550px] w-full max-w-[550px]">
      <Carousel
        plugins={[plugin.current]}
        className="size-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="h-[550px]">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative size-full overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src={slide.image || '/placeholder.svg'}
                  alt={slide.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-end bg-black/40">
                  <div className="p-6 text-white">
                    <h3 className="mb-2 text-xl font-bold">{slide.title}</h3>
                    <p className="text-sm opacity-90">{slide.description}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section with Slideshow */}
        <section className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 py-6 md:py-10 lg:py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Computer Science Education
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Welcome to my educational portal. I&#39;m Janna Bondarchuk,
                    a passionate computer science teacher at Lutsk School №2,
                    dedicated to inspiring the next generation of programmers
                    and technology innovators.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/about">
                      Learn More About Me
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/courses">View Courses</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <HeroSlideshow />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-6 md:py-8 lg:py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What I Offer
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comprehensive computer science education covering programming
                  fundamentals, algorithms, and modern development practices.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <BookOpen className="size-10 text-blue-600" />
                  <CardTitle>Programming Fundamentals</CardTitle>
                  <CardDescription>
                    Learn the basics of programming with Python, Java, and C++.
                    Build a strong foundation in computational thinking.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Code className="size-10 text-green-600" />
                  <CardTitle>Web Development</CardTitle>
                  <CardDescription>
                    Master HTML, CSS, JavaScript, and modern frameworks. Create
                    responsive and interactive web applications.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="size-10 text-purple-600" />
                  <CardTitle>Project-Based Learning</CardTitle>
                  <CardDescription>
                    Work on real-world projects and collaborate with peers.
                    Develop practical skills for the tech industry.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="w-full bg-gray-50 py-6 md:py-8 lg:py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Current Courses
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore the courses I&apos;m currently teaching this semester.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-6 lg:grid-cols-2 lg:gap-12">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Introduction to Programming</CardTitle>
                    <Badge variant="secondary">Grade 9-10</Badge>
                  </div>
                  <CardDescription>
                    Learn programming fundamentals using Python. Cover
                    variables, loops, functions, and basic data structures.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="mr-1 size-3" />
                      Mon, Wed, Fri
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 size-3" />
                      25 students
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Advanced Programming</CardTitle>
                    <Badge variant="secondary">Grade 11-12</Badge>
                  </div>
                  <CardDescription>
                    Advanced concepts including object-oriented programming,
                    algorithms, and data structures using Java and C++.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="mr-1 size-3" />
                      Tue, Thu
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 size-3" />
                      18 students
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Web Development</CardTitle>
                    <Badge variant="secondary">Grade 10-12</Badge>
                  </div>
                  <CardDescription>
                    Create modern websites using HTML, CSS, JavaScript, and
                    popular frameworks like React.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="mr-1 size-3" />
                      Mon, Wed
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 size-3" />
                      22 students
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Computer Science Olympiad</CardTitle>
                    <Badge variant="secondary">All Grades</Badge>
                  </div>
                  <CardDescription>
                    Preparation for programming competitions and olympiads.
                    Advanced algorithms and problem-solving techniques.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="mr-1 size-3" />
                      Friday
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 size-3" />
                      12 students
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Recent News Section */}
        <section className="w-full py-6 md:py-8 lg:py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Recent Updates
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Stay updated with the latest news from our computer science
                  program.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">Achievement</Badge>
                    <span className="text-sm text-gray-500">Dec 2024</span>
                  </div>
                  <CardTitle className="text-lg">
                    Programming Competition Success
                  </CardTitle>
                  <CardDescription>
                    Our students won 1st place in the regional programming
                    olympiad, demonstrating exceptional problem-solving skills.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">Course Update</Badge>
                    <span className="text-sm text-gray-500">Nov 2024</span>
                  </div>
                  <CardTitle className="text-lg">
                    New Web Development Module
                  </CardTitle>
                  <CardDescription>
                    Added React and modern JavaScript frameworks to our web
                    development curriculum for the spring semester.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">Event</Badge>
                    <span className="text-sm text-gray-500">Oct 2024</span>
                  </div>
                  <CardTitle className="text-lg">
                    Tech Industry Guest Speaker
                  </CardTitle>
                  <CardDescription>
                    Software engineer from a leading tech company shared
                    insights about career paths in computer science.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
