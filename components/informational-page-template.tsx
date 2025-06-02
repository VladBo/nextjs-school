import Image from "next/image"
import Link from "next/link"
import { Code, GraduationCap, BookOpen, ArrowLeft } from "lucide-react"
import React from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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

interface InformationalPageTemplateProps {
  title: string
  subtitle?: string
  description?: string
  breadcrumb?: { label: string; href: string }
  heroImage?: string
  badge?: string
  children: React.ReactNode
  sidebar?: React.ReactNode
  showBackButton?: boolean
  backButtonText?: string
  backButtonHref?: string
}

export default function InformationalPageTemplate({
  title,
  subtitle,
  description,
  breadcrumb,
  heroImage,
  badge,
  children,
  sidebar,
  showBackButton = false,
  backButtonText = "Back",
  backButtonHref = "/",
}: InformationalPageTemplateProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <Code className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">Janna Bondarchuk</span>
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
                            <div className="mb-2 mt-4 text-lg font-medium">All Articles</div>
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
                      <ListItem href="/articles/new-web-development-module" title="New Web Development Module">
                        React and modern JavaScript added to curriculum
                      </ListItem>
                      <ListItem href="/articles/tech-industry-guest-speaker" title="Tech Industry Guest Speaker">
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
        <section className="w-full py-6 md:py-8 lg:py-10 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4 md:px-6">
            {/* Breadcrumb */}
            {breadcrumb && (
              <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                <Link href="/" className="hover:text-gray-700">
                  Home
                </Link>
                <span>/</span>
                <Link href={breadcrumb.href} className="hover:text-gray-700">
                  {breadcrumb.label}
                </Link>
                <span>/</span>
                <span className="text-gray-900">{title}</span>
              </nav>
            )}

            {/* Back Button */}
            {showBackButton && (
              <div className="mb-4">
                <Button variant="ghost" asChild>
                  <Link href={backButtonHref}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {backButtonText}
                  </Link>
                </Button>
              </div>
            )}

            <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:gap-12 items-start">
              <div className="space-y-4">
                <div className="space-y-2">
                  {badge && <Badge variant="secondary">{badge}</Badge>}
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">{title}</h1>
                  {subtitle && <p className="text-xl text-gray-600 font-medium">{subtitle}</p>}
                  {description && (
                    <p className="max-w-[700px] text-gray-500 md:text-lg leading-relaxed">{description}</p>
                  )}
                </div>
              </div>

              {/* Hero Image */}
              {heroImage && (
                <div className="flex items-center justify-center lg:justify-end">
                  <div className="relative w-full max-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
                    <Image src={heroImage || "/placeholder.svg"} alt={title} fill className="object-cover" />
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
              <div className="prose prose-gray max-w-none">{children}</div>

              {/* Sidebar */}
              {sidebar && <aside className="space-y-6">{sidebar}</aside>}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-4 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
          <p className="text-xs text-gray-500">© 2024 Janna Bondarchuk. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6 mt-2 sm:mt-0">
            <Link className="text-xs hover:underline underline-offset-4" href="/contact">
              Contact
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="/resources">
              Resources
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
