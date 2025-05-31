import Image from "next/image"
import Link from "next/link"
import { Code, GraduationCap, Award, BookOpen, Users, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import React from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <Code className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">Janna Kovalenko</span>
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
                            <div className="mb-2 mt-4 text-lg font-medium">All Courses</div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Explore our comprehensive computer science curriculum
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/courses/intro-programming" title="Introduction to Programming">
                        Learn Python fundamentals and basic programming concepts
                      </ListItem>
                      <ListItem href="/courses/advanced-programming" title="Advanced Programming">
                        Object-oriented programming with Java and C++
                      </ListItem>
                      <ListItem href="/courses/web-development" title="Web Development">
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
                      <ListItem href="/resources/projects" title="Student Projects">
                        Showcase of outstanding student work
                      </ListItem>
                      <ListItem href="/resources/competitions" title="Competitions">
                        Programming contests and olympiad information
                      </ListItem>
                      <ListItem href="/resources/career" title="Career Guidance">
                        Information about CS careers and university programs
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
                            <div className="mb-2 mt-4 text-lg font-medium">About Me</div>
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
                      <ListItem href="/about/philosophy" title="Teaching Philosophy">
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
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[600px_1fr] lg:gap-12 items-center">
              <div className="flex items-center justify-center lg:justify-start">
                <Image
                  alt="Janna Kovalenko - Computer Science Teacher"
                  className="aspect-square overflow-hidden rounded-xl object-cover"
                  height="600"
                  src="/placeholder.svg?height=600&width=600"
                  width="600"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    About Janna Kovalenko
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">Passionate Computer Science Educator</p>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    With over 15 years of experience in computer science education, I am dedicated to inspiring students
                    to explore the fascinating world of programming and technology. My mission is to make computer
                    science accessible, engaging, and relevant to students of all backgrounds and skill levels.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    I believe that every student has the potential to become a creative problem solver and innovative
                    thinker through computer science. My teaching approach combines theoretical foundations with
                    hands-on projects that connect to real-world applications.
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Education & Experience</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed">
                My academic background and professional journey in computer science education.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2 lg:gap-12">
              <Card>
                <CardHeader>
                  <GraduationCap className="h-10 w-10 text-blue-600 mb-2" />
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Master of Science in Computer Science</h4>
                    <p className="text-sm text-gray-500">Kyiv National University, 2008</p>
                    <p className="text-sm text-gray-600 mt-1">Specialized in Software Engineering and Algorithms</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold">Bachelor of Science in Mathematics</h4>
                    <p className="text-sm text-gray-500">Kyiv National University, 2006</p>
                    <p className="text-sm text-gray-600 mt-1">Focus on Applied Mathematics and Computer Modeling</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold">Teaching Certification</h4>
                    <p className="text-sm text-gray-500">Ministry of Education, Ukraine, 2009</p>
                    <p className="text-sm text-gray-600 mt-1">Certified to teach Computer Science and Mathematics</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <BookOpen className="h-10 w-10 text-green-600 mb-2" />
                  <CardTitle>Teaching Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Senior Computer Science Teacher</h4>
                    <p className="text-sm text-gray-500">Current School, 2015 - Present</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Lead computer science curriculum development and teach advanced programming courses
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold">Computer Science Teacher</h4>
                    <p className="text-sm text-gray-500">Previous School, 2009 - 2015</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Taught introductory programming and established the school's first CS program
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold">Programming Tutor</h4>
                    <p className="text-sm text-gray-500">Private Practice, 2008 - 2009</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Provided one-on-one programming instruction to high school students
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Achievements & Skills */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div>
                <h3 className="text-2xl font-bold tracking-tighter mb-6">Achievements & Recognition</h3>
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-600" />
                        <CardTitle className="text-lg">Excellence in Teaching Award</CardTitle>
                      </div>
                      <CardDescription>
                        Recognized for outstanding contribution to computer science education (2022)
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <CardTitle className="text-lg">Student Competition Success</CardTitle>
                      </div>
                      <CardDescription>
                        Coached students to 15+ regional and national programming competition wins
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-green-600" />
                        <CardTitle className="text-lg">Curriculum Development</CardTitle>
                      </div>
                      <CardDescription>
                        Developed modern CS curriculum adopted by 5+ schools in the region
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-tighter mb-6">Technical Skills & Expertise</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Programming Languages</h4>
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
                    <h4 className="font-semibold mb-3">Frameworks & Tools</h4>
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
                    <h4 className="font-semibold mb-3">Teaching Specialties</h4>
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed">
                Feel free to reach out for questions about courses, collaboration opportunities, or educational
                resources.
              </p>
            </div>
            <div className="mx-auto grid max-w-3xl gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader className="text-center">
                  <Mail className="h-10 w-10 text-blue-600 mx-auto mb-2" />
                  <CardTitle>Email</CardTitle>
                  <CardDescription>janna.kovalenko@school.edu.ua</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <Phone className="h-10 w-10 text-green-600 mx-auto mb-2" />
                  <CardTitle>Phone</CardTitle>
                  <CardDescription>+380 (44) 123-4567</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <MapPin className="h-10 w-10 text-red-600 mx-auto mb-2" />
                  <CardTitle>Office</CardTitle>
                  <CardDescription>Room 205, Computer Science Building</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2024 Janna Kovalenko. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/contact">
            Contact
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/resources">
            Resources
          </Link>
        </nav>
      </footer>
    </div>
  )
}
