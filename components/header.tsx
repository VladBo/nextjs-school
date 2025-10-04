import { BookOpen, Code } from 'lucide-react';
import Link from 'next/link';
import React, {
  ComponentPropsWithoutRef,
  ComponentRef,
  forwardRef,
} from 'react';

import { cn } from '../lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';

const ListItem = forwardRef<
  ComponentRef<typeof Link>,
  ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href as string}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <Code className="size-6" />
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
                        <Link
                          className="flex size-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/courses"
                        >
                          <BookOpen className="size-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            All Courses
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Explore our comprehensive computer science
                            curriculum
                          </p>
                        </Link>
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
                <NavigationMenuTrigger>Articles</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex size-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/articles"
                        >
                          <BookOpen className="size-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            All Articles
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Latest news, updates, and educational insights
                          </p>
                        </Link>
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
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}
