import { Calendar, Clock, User } from 'lucide-react';

type ArticleMetaProps = {
  authorName: string;
  publishedAt: string;
};

export const ArticleMeta = ({ authorName, publishedAt }: ArticleMetaProps) => {
  const formattedDate = publishedAt
    ? new Intl.DateTimeFormat('uk-UA', { dateStyle: 'long' }).format(
        new Date(publishedAt)
      )
    : '';

  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
      <div className="flex items-center gap-1">
        <User className="size-4" />
        <span>{authorName}</span>
      </div>
      <div className="flex items-center gap-1">
        <Calendar className="size-4" />
        <span>{formattedDate}</span>
      </div>
      <div className="flex items-center gap-1">
        <Clock className="size-4" />
        <span>5 хв читання</span>
      </div>
    </div>
  );
};
