import { Calendar, Clock, Share2, User } from 'lucide-react';

import { Button } from '@/components/ui/button';

type ArticleMetaProps = {
  authorName: string;
  publishedAt: string;
};

export const ArticleMeta = ({ authorName, publishedAt }: ArticleMetaProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
      <div className="flex items-center gap-1">
        <User className="size-4" />
        <span>{authorName}</span>
      </div>
      <div className="flex items-center gap-1">
        <Calendar className="size-4" />
        <span>{publishedAt}</span>
      </div>
      <div className="flex items-center gap-1">
        <Clock className="size-4" />
        <span>5 min read</span>
      </div>
      <Button variant="ghost" size="sm">
        <Share2 className="mr-1 size-4" />
        Share
      </Button>
    </div>
  );
};
