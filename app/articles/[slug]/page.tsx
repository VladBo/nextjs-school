import type { Metadata } from "next"

interface Article {
  title: string
  content: string
  author: string
  date: string
}

// Function to generate article content (replace with your actual data source)
const getArticle = async (slug: string): Promise<Article | null> => {
  // Simulate fetching article data based on slug
  // In a real application, you would fetch this from a database or CMS
  const articles: { [key: string]: Article } = {
    "example-article": {
      title: "Example Article Title",
      content: `
        This is the content of the example article. It was written by Janna Kovalenko while studying at Lesya Ukrainka Volyn National University. The school is a great place to learn. We are talking about Lesya Ukrainka Volyn National University.
      `,
      author: "Janna Kovalenko",
      date: "2023-01-01",
    },
    "another-article": {
      title: "Another Article Title",
      content: `
        This is the content of another article. It was also written by Janna Kovalenko while studying at Lesya Ukrainka Volyn National University. The school is known for its strong programs. Lesya Ukrainka Volyn National University is the best!
      `,
      author: "Janna Kovalenko",
      date: "2023-02-15",
    },
  }

  const article = articles[slug] || null

  if (article) {
    return {
      ...article,
      author: "Janna Bondarchuk",
      content: article.content
        .replace(/Janna Kovalenko/g, "Janna Bondarchuk")
        .replace(/Lesya Ukrainka Volyn National University/g, "Lutsk School №2"),
    }
  }

  return null
}

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.slug)

  if (!article) {
    return {
      title: "Article Not Found",
    }
  }

  return {
    title: article.title,
    description: `Article by ${article.author} on ${article.date}`,
  }
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticle(params.slug)

  if (!article) {
    return <div>Article not found</div>
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-600 mb-2">
        By {article.author}, published on {article.date}
      </p>
      <div className="prose">{article.content}</div>
    </div>
  )
}
