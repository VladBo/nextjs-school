import { QuizCard, QuizFilters } from '@/features/h5p/components';
import { getQuizzes } from '@/features/h5p/db';

export default async function QuizzesPage({
  searchParams,
}: {
  searchParams: { grade?: string; subject?: string };
}) {
  const quizzes = await getQuizzes({
    grade: searchParams.grade,
    subject: searchParams.subject,
  });

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          Interactive Quizzes
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Test your knowledge with our interactive H5P quizzes
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <QuizFilters />
        </aside>

        <main>
          {!quizzes || !quizzes.data || quizzes.data.length === 0 ? (
            <div className="rounded-lg border bg-card p-12 text-center">
              <h3 className="mb-2 text-lg font-semibold">No quizzes found</h3>
              <p className="text-sm text-muted-foreground">
                {searchParams.grade || searchParams.subject
                  ? 'Try adjusting your filters'
                  : 'Quizzes will appear here once they are created in Strapi'}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {quizzes.data.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
