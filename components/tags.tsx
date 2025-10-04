import { Tag } from 'lucide-react';

import { Badge } from './ui/badge';

type TagsProps = {
  tags: string[];
};

export const Tags = ({ tags }: TagsProps) => {
  return (
    <div className="mt-8 border-t pt-6">
      <div className="flex flex-wrap items-center gap-2">
        <Tag className="size-4 text-gray-500" />
        <span className="text-sm text-gray-500">Tags:</span>
        {tags.map((tag, index) => (
          <Badge key={index} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};
