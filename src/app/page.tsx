"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Code,
  Users,
  Calendar,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

function HeroSlideshow() {
  const slides = [
    {
      image: "/placeholder.svg?height=550&width=550",
      title: "Interactive Learning",
      description: "Students working on collaborative programming projects",
    },
    {
      image: "/placeholder.svg?height=550&width=550",
      title: "Modern Technology",
      description: "Learning with the latest development tools and frameworks",
    },
    {
      image: "/placeholder.svg?height=550&width=550",
      title: "Competition Success",
      description: "Our students excel in programming competitions",
    },
    {
      image: "/placeholder.svg?height=550&width=550",
      title: "Real-World Projects",
      description: "Building applications that solve real problems",
    },
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <div className="relative w-full max-w-[550px] h-[550px]">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="h-[550px]">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
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
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <Code className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">
                Janna Bondarchuk
              </span>
            </Link>
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/courses"
                          >
                            <BookOpen className="h-6 w-6" />
                            <div className="mb-2 mt-4 text-lg font-medium">
                              All Courses
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Explore our comprehensive computer science
                              curriculum
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem
                        href="/courses/intro-programming"
                        title="Introduction to Programming"
                      >
                        Learn Python fundamentals and basic programming concepts
                      </ListItem>
                      <ListItem
                        href="/courses/advanced-programming"
                        title="Advanced Programming"
                      >
                        Object-oriented programming with Java and C++
                      </ListItem>
                      <ListItem
                        href="/courses/web-development"
                        title="Web Development"
                      >
                        Modern web technologies and frameworks
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem href="/resources/tutorials" title="Tutorials">
                        Step-by-step programming guides and exercises
                      </ListItem>
                      <ListItem href="/resources/downloads" title="Downloads">
                        Course materials, software, and reference documents
                      </ListItem>
                      <ListItem href="/resources/links" title="Useful Links">
                        External resources and educational websites
                      </ListItem>
                      <ListItem
                        href="/resources/projects"
                        title="Student Projects"
                      >
                        Showcase of outstanding student work
                      </ListItem>
                      <ListItem
                        href="/resources/competitions"
                        title="Competitions"
                      >
                        Programming contests and olympiad information
                      </ListItem>
                      <ListItem
                        href="/resources/career"
                        title="Career Guidance"
                      >
                        Information about CS careers and university programs
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>News & Articles</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/articles"
                          >
                            <BookOpen className="h-6 w-6" />
                            <div className="mb-2 mt-4 text-lg font-medium">
                              All Articles
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Latest news, updates, and educational insights
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem
                        href="/articles/programming-competition-success"
                        title="Programming Competition Success"
                      >
                        Our students win first place in regional olympiad
                      </ListItem>
                      <ListItem
                        href="/articles/new-web-development-module"
                        title="New Web Development Module"
                      >
                        React and modern JavaScript added to curriculum
                      </ListItem>
                      <ListItem
                        href="/articles/tech-industry-guest-speaker"
                        title="Tech Industry Guest Speaker"
                      >
                        Senior engineer shares career insights with students
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>About</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/about"
                          >
                            <GraduationCap className="h-6 w-6" />
                            <div className="mb-2 mt-4 text-lg font-medium">
                              About Me
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Learn about my background and teaching philosophy
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/about/experience" title="Experience">
                        My professional journey in computer science education
                      </ListItem>
                      <ListItem href="/about/achievements" title="Achievements">
                        Awards and recognition in teaching
                      </ListItem>
                      <ListItem
                        href="/about/philosophy"
                        title="Teaching Philosophy"
                      >
                        My approach to computer science education
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with Slideshow */}
        <section className="w-full py-6 md:py-10 lg:py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Computer Science Education
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Welcome to my educational portal. I'm Janna Bondarchuk, a
                    passionate computer science teacher at Lutsk School №2,
                    dedicated to inspiring the next generation of programmers
                    and technology innovators.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/about">
                      Learn More About Me
                      <ArrowRight className="ml-2 h-4 w-4" />
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
                  <BookOpen className="h-10 w-10 text-blue-600" />
                  <CardTitle>Programming Fundamentals</CardTitle>
                  <CardDescription>
                    Learn the basics of programming with Python, Java, and C++.
                    Build a strong foundation in computational thinking.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Code className="h-10 w-10 text-green-600" />
                  <CardTitle>Web Development</CardTitle>
                  <CardDescription>
                    Master HTML, CSS, JavaScript, and modern frameworks. Create
                    responsive and interactive web applications.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-purple-600" />
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
        <section className="w-full py-6 md:py-8 lg:py-10 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Current Courses
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore the courses I'm currently teaching this semester.
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
                      <Calendar className="mr-1 h-3 w-3" />
                      Mon, Wed, Fri
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-3 w-3" />
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
                      <Calendar className="mr-1 h-3 w-3" />
                      Tue, Thu
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-3 w-3" />
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
                      <Calendar className="mr-1 h-3 w-3" />
                      Mon, Wed
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-3 w-3" />
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
                      <Calendar className="mr-1 h-3 w-3" />
                      Friday
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-3 w-3" />
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

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-4 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
          <p className="text-xs text-gray-500">
            © 2024 Janna Bondarchuk. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6 mt-2 sm:mt-0">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="/contact"
            >
              Contact
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="/resources"
            >
              Resources
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
