import { ArticleImage } from './article-image';

export const ArticleHero = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <section className="w-full py-6 md:py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-4">
            <Badge variant="secondary">{article.category}</Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
              {article.title}
            </h1>
            {article.description && (
              <p className="text-xl leading-relaxed text-gray-600">
                {article.description}
              </p>
            )}

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User className="size-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                <span>{article.publishedAt}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="size-4" />
                <span>{article.readingTime}</span>
              </div>
              <Button variant="ghost" size="sm">
                <Share2 className="mr-1 size-4" />
                Share
              </Button>
            </div>

            {/* Featured Image */}
            {article.featuredImage && (
              <ArticleImage src={article.featuredImage} alt={article.title} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
