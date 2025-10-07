import { BookOpen, Code } from 'lucide-react';
import Link from 'next/link';

import { ListItem } from '@/components/list-item';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { getGlobalSettings } from '@/features/homepage/db';

import { getHeaderMenu } from '../db';

export const Header = async () => {
  const [header, globalSettings] = await Promise.all([
    getHeaderMenu(),
    getGlobalSettings(),
  ]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex items-center justify-between p-2 px-4 md:px-6">
        <div className="flex items-center">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <Code className="size-6" />
            <span className="font-bold sm:inline-block">
              {globalSettings?.siteName}
            </span>
          </Link>
          <NavigationMenu className="lg:flex">
            <NavigationMenuList>
              {header?.links?.map((item) =>
                item.type === 'wrapper' ? (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              className="flex size-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href={item.url ?? ''}
                            >
                              <BookOpen className="size-6" />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                {item.title}
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                {item.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        {item.sublinks?.map((child) => (
                          <ListItem
                            key={child.title}
                            href={child.url ?? ''}
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
                    <Link href={item.url ?? ''} passHref legacyBehavior>
                      <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};
