import Link from 'next/link';
import { FC } from 'react';

import { getFooterMenu } from '../db';

export const Footer: FC = async () => {
  const footer = await getFooterMenu();

  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t p-4 sm:flex-row md:px-6">
      <div className="container mx-auto flex flex-col items-center justify-between sm:flex-row">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} {footer?.text}
        </p>
        <nav className="mt-2 flex gap-4 sm:mt-0 sm:gap-6">
          {footer?.links?.map((link) => (
            <Link
              key={link.id}
              className="text-xs underline-offset-4 hover:underline"
              href={link.url || '/'}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};
