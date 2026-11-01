import { BookOpen, Code, Search } from 'lucide-react';
import Link from 'next/link';

import { ListItem } from '@/components/list-item';
import { Input } from '@/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { getGlobalSettings } from '@/features/homepage/db';
import { cn } from '@/lib/utils';

import { getHeaderMenu } from '../db';

export const Header = async () => {
  const [header, globalSettings] = await Promise.all([
    getHeaderMenu(),
    getGlobalSettings(),
  ]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex items-center justify-between gap-4 p-2 px-4 md:px-6">
        <div className="flex items-center">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <Code className="size-6" />
            <span className="hidden font-bold xl:inline-block">
              {globalSettings?.siteName}
            </span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {header?.links?.map((item) =>
                item.type === 'wrapper' ? (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul
                        className={cn(
                          'grid max-h-[min(72vh,680px)] w-[min(92vw,680px)] gap-1 overflow-y-auto p-3',
                          item.sublinks && item.sublinks.length > 4
                            ? 'sm:grid-cols-2'
                            : 'w-[min(88vw,440px)]'
                        )}
                      >
                        <li
                          className={cn(
                            'mb-1 rounded-md bg-muted/60 p-3',
                            item.sublinks &&
                              item.sublinks.length > 4 &&
                              'sm:col-span-2'
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <BookOpen className="mt-0.5 size-5 shrink-0 text-blue-600" />
                            <div>
                              <div className="font-medium">{item.title}</div>
                              {item.description && (
                                <p className="mt-1 text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </li>
                        {item.sublinks
                          ?.filter((child) => child.url)
                          .map((child) => (
                            <ListItem
                              key={child.title}
                              href={child.url ?? '/'}
                              title={child.title}
                            >
                              {child.description}
                            </ListItem>
                          ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.url ?? '/'}
                        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none data-[active]:bg-accent/50"
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <form
          action="/search"
          className="hidden w-56 shrink-0 md:block lg:w-64"
          method="get"
          role="search"
        >
          <div className="relative">
            <Input
              aria-label="Пошук на сайті"
              className="pr-10"
              name="q"
              placeholder="Пошук..."
              type="search"
            />
            <button
              aria-label="Знайти"
              className="absolute right-1 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              type="submit"
            >
              <Search className="size-4" />
            </button>
          </div>
        </form>
      </div>
    </header>
  );
};
