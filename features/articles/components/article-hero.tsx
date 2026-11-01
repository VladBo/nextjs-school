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
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
              {title}
            </h1>
            {description && (
              <p className="text-xl leading-relaxed text-gray-600">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
