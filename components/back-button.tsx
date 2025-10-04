import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

import { Button } from './ui/button';

type BackButtonProps = {
  href: string;
  title: string;
};

export const BackButton: FC<BackButtonProps> = ({ href, title }) => {
  return (
    <div className="w-full py-4">
      <div className="container mx-auto px-4 md:px-6">
        <Button variant="ghost" asChild>
          <Link href={href}>
            <ArrowLeft className="mr-2 size-4" />
            {title}
          </Link>
        </Button>
      </div>
    </div>
  );
};
