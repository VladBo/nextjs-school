import Link from 'next/link';

export function Footer() {
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t p-4 sm:flex-row md:px-6">
      <div className="container mx-auto flex flex-col items-center justify-between sm:flex-row">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Janna Bondarchuk. All rights reserved.
        </p>
        <nav className="mt-2 flex gap-4 sm:mt-0 sm:gap-6">
          <Link
            className="text-xs underline-offset-4 hover:underline"
            href="/contact"
          >
            Contact
          </Link>
          <Link
            className="text-xs underline-offset-4 hover:underline"
            href="/resources"
          >
            Resources
          </Link>
        </nav>
      </div>
    </footer>
  );
}
