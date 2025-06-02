import Image from "next/image"
import Link from "next/link"
import { Code, GraduationCap, BookOpen, ArrowLeft, Calendar, Clock, User, Tag, Share2 } from "lucide-react"
import React from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

interface ArticlePageTemplateProps {
  title: string
  excerpt?: string
  author?: string
  publishedAt: string
  category: string
  readingTime?: string
  featuredImage?: string
  tags?: string[]
  children: React.ReactNode
  relatedArticles?: Array<{
    title: string
    excerpt: string
    href: string
    category: string
    publishedAt: string
    image?: string
  }>
  previousArticle?: { title: string; href: string }
  nextArticle?: { title: string; href: string }
}

export default function ArticlePageTemplate({
  title,
  excerpt,
  author = "Janna Bondarchuk",
  publishedAt,
  category,
  readingTime = "5 min read",
  featuredImage,
  tags = [],
  children,
  relatedArticles = [],
  previousArticle,
  nextArticle,
}: ArticlePageTemplateProps) {
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
        {/* Article Header */}
        <article className="w-full">
          {/* Breadcrumb */}
          <nav className="w-full py-4 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-gray-700">
                  Home
                </Link>
                <span>/</span>
                <Link href="/articles" className="hover:text-gray-700">
                  Articles
                </Link>
                <span>/</span>
                <span className="text-gray-900">{title}</span>
              </div>
            </div>
          </nav>

          {/* Back Button */}
          <div className="w-full py-4">
            <div className="container mx-auto px-4 md:px-6">
              <Button variant="ghost" asChild>
                <Link href="/articles">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Articles
                </Link>
              </Button>
            </div>
          </div>

          {/* Article Hero */}
          <section className="w-full py-6 md:py-8">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                <div className="space-y-4">
                  <Badge variant="secondary">{category}</Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">{title}</h1>
                  {excerpt && <p className="text-xl text-gray-600 leading-relaxed">{excerpt}</p>}

                  {/* Article Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{publishedAt}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{readingTime}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>

                  {/* Featured Image */}
                  {featuredImage && (
                    <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
                      <Image src={featuredImage || "/placeholder.svg"} alt={title} fill className="object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Article Content */}
          <section className="w-full py-6">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                <div className="prose prose-gray prose-lg max-w-none">{children}</div>

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Tag className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">Tags:</span>
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Article Navigation */}
          {(previousArticle || nextArticle) && (
            <section className="w-full py-6 bg-gray-50">
              <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                  <div className="grid gap-4 md:grid-cols-2">
                    {previousArticle && (
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-sm text-gray-500 mb-2">Previous Article</p>
                          <Link href={previousArticle.href} className="font-medium hover:text-blue-600">
                            {previousArticle.title}
                          </Link>
                        </CardContent>
                      </Card>
                    )}
                    {nextArticle && (
                      <Card>
                        <CardContent className="p-4 text-right">
                          <p className="text-sm text-gray-500 mb-2">Next Article</p>
                          <Link href={nextArticle.href} className="font-medium hover:text-blue-600">
                            {nextArticle.title}
                          </Link>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="w-full py-6 md:py-8">
              <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {relatedArticles.map((article, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <Link href={article.href}>
                          {article.image && (
                            <div className="relative w-full h-48">
                              <Image
                                src={article.image || "/placeholder.svg"}
                                alt={article.title}
                                fill
                                className="object-cover rounded-t-lg"
                              />
                            </div>
                          )}
                          <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline">{article.category}</Badge>
                              <span className="text-xs text-gray-500">{article.publishedAt}</span>
                            </div>
                            <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-600 line-clamp-3">{article.excerpt}</p>
                          </CardContent>
                        </Link>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </article>
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
