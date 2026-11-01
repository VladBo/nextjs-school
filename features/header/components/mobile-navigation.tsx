'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import type { components } from '@/types/strapi';

type MenuLink = components['schemas']['SharedLinksComponent'];

type MobileNavigationProps = {
  className?: string;
  links: MenuLink[];
};

export const MobileNavigation = ({
  className,
  links,
}: MobileNavigationProps) => (
  <Sheet>
    <SheetTrigger
      aria-label="Відкрити меню"
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
    >
      <Menu aria-hidden="true" className="size-5" />
    </SheetTrigger>
    <SheetContent
      aria-describedby="mobile-navigation-description"
      className="w-[min(88vw,24rem)] overflow-y-auto"
      side="right"
    >
      <SheetHeader className="mb-6 text-left">
        <SheetTitle>Меню сайту</SheetTitle>
        <SheetDescription id="mobile-navigation-description">
          Перейдіть до потрібного розділу сайту.
        </SheetDescription>
      </SheetHeader>
      <nav aria-label="Основна навігація">
        <ul className="space-y-1">
          {links.map((item) =>
            item.type === 'wrapper' ? (
              <li key={item.id ?? item.title}>
                <details className="group rounded-md">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between rounded-md px-3 py-2 text-base font-medium hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                    {item.title}
                    <span aria-hidden="true" className="text-muted-foreground">
                      +
                    </span>
                  </summary>
                  {item.description && (
                    <p className="px-3 pb-2 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                  <ul className="ml-3 border-l pl-3">
                    {item.sublinks
                      ?.filter((child) => child.url)
                      .map((child) => (
                        <li key={child.id ?? child.title}>
                          <SheetClose asChild>
                            <Link
                              className="block rounded-md px-3 py-2.5 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              href={child.url ?? '/'}
                            >
                              <span className="block text-sm font-medium">
                                {child.title}
                              </span>
                              {child.description && (
                                <span className="mt-1 block text-sm text-muted-foreground">
                                  {child.description}
                                </span>
                              )}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                  </ul>
                </details>
              </li>
            ) : (
              <li key={item.id ?? item.title}>
                <SheetClose asChild>
                  <Link
                    className="flex min-h-11 items-center rounded-md px-3 py-2 text-base font-medium hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    href={item.url ?? '/'}
                  >
                    {item.title}
                  </Link>
                </SheetClose>
              </li>
            )
          )}
        </ul>
      </nav>
    </SheetContent>
  </Sheet>
);
