import { notFound } from "next/navigation"
import ArticlePageTemplate from "@/components/article-page-template"

// This would typically come from a CMS or database
const articles = {
  "programming-competition-success": {
    title: "Our Students Win Regional Programming Competition",
    excerpt:
      "Celebrating an outstanding achievement as our computer science students take first place in the regional programming olympiad, demonstrating exceptional problem-solving skills and teamwork.",
    publishedAt: "December 15, 2024",
    category: "Achievement",
    readingTime: "4 min read",
    featuredImage: "/placeholder.svg?height=400&width=800",
    tags: ["Competition", "Achievement", "Programming", "Students", "Olympiad"],
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed">
          I'm thrilled to announce that our computer science students have achieved an incredible milestone by winning
          first place in the regional programming olympiad! This outstanding achievement showcases the dedication, hard
          work, and exceptional problem-solving skills of our talented students.
        </p>

        <h2 className="text-2xl font-bold">The Competition</h2>
        <p>
          The regional programming olympiad brought together over 150 students from 25 schools across the region.
          Participants faced challenging algorithmic problems that tested their programming knowledge, logical thinking,
          and ability to work under pressure.
        </p>

        <p>
          Our team consisted of three exceptional students from our Advanced Programming course: Alex Petrov (Grade 12),
          Maria Ivanova (Grade 11), and David Kim (Grade 12). Together, they solved complex problems involving data
          structures, algorithms, and mathematical computations.
        </p>

        <h2 className="text-2xl font-bold">The Winning Solutions</h2>
        <p>
          What set our team apart was their innovative approach to problem-solving and their excellent teamwork. Here
          are some highlights from their winning performance:
        </p>

        <ul className="space-y-2 ml-6">
          <li className="list-disc">
            <strong>Graph Theory Problem:</strong> The team implemented an efficient shortest path algorithm that
            outperformed most other solutions in both time and space complexity.
          </li>
          <li className="list-disc">
            <strong>Dynamic Programming Challenge:</strong> They developed an elegant recursive solution with
            memoization that solved the optimization problem in record time.
          </li>
          <li className="list-disc">
            <strong>String Manipulation Task:</strong> Using advanced string algorithms, they created a solution that
            was both efficient and easy to understand.
          </li>
        </ul>

        <h2 className="text-2xl font-bold">Preparation and Training</h2>
        <p>
          This victory didn't happen overnight. Our students have been preparing for months through our Computer Science
          Olympiad program, which meets every Friday after school. The training includes:
        </p>

        <ul className="space-y-2 ml-6">
          <li className="list-disc">Weekly practice sessions with past competition problems</li>
          <li className="list-disc">Algorithm design and analysis workshops</li>
          <li className="list-disc">Mock competitions to simulate real contest conditions</li>
          <li className="list-disc">Peer collaboration and code review sessions</li>
        </ul>

        <h2 className="text-2xl font-bold">Looking Ahead</h2>
        <p>
          With this regional victory, our team has qualified for the national programming olympiad, which will take
          place in March 2025. We're incredibly excited about this opportunity and are already beginning preparation for
          the next level of competition.
        </p>

        <p>
          This achievement also highlights the strength of our computer science program and the importance of providing
          students with opportunities to apply their knowledge in competitive settings. Programming competitions not
          only test technical skills but also develop critical thinking, time management, and teamwork abilities that
          are valuable in any career path.
        </p>

        <h2 className="text-2xl font-bold">Congratulations to Our Champions</h2>
        <p>
          I couldn't be prouder of Alex, Maria, and David for their outstanding performance. Their success is a
          testament to their hard work, dedication, and passion for computer science. They serve as an inspiration to
          all our students and demonstrate what's possible when talent meets opportunity and preparation.
        </p>

        <p>
          If you're interested in joining our Computer Science Olympiad program or learning more about our advanced
          programming courses, please don't hesitate to reach out. We're always looking for motivated students who want
          to challenge themselves and explore the exciting world of competitive programming!
        </p>
      </div>
    ),
  },
  "new-web-development-module": {
    title: "New Web Development Module Added to Curriculum",
    excerpt:
      "We've expanded our web development course to include React and modern JavaScript frameworks, preparing students for the latest industry trends.",
    publishedAt: "November 15, 2024",
    category: "Course Update",
    readingTime: "3 min read",
    featuredImage: "/placeholder.svg?height=400&width=800",
    tags: ["Web Development", "React", "JavaScript", "Curriculum", "Technology"],
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed">
          I'm excited to announce a major update to our Web Development course! Starting this semester, we've added a
          comprehensive module covering React and modern JavaScript frameworks, ensuring our students stay current with
          industry trends and technologies.
        </p>

        <h2 className="text-2xl font-bold">What's New in the Curriculum</h2>
        <p>The updated curriculum now includes hands-on experience with some of the most in-demand web technologies:</p>

        <ul className="space-y-2 ml-6">
          <li className="list-disc">
            <strong>React Fundamentals:</strong> Component-based architecture, JSX, and state management
          </li>
          <li className="list-disc">
            <strong>Modern JavaScript (ES6+):</strong> Arrow functions, destructuring, async/await, and modules
          </li>
          <li className="list-disc">
            <strong>Build Tools:</strong> Introduction to Vite and modern development workflows
          </li>
          <li className="list-disc">
            <strong>API Integration:</strong> Fetching data and working with REST APIs
          </li>
          <li className="list-disc">
            <strong>Responsive Design:</strong> CSS Grid, Flexbox, and mobile-first development
          </li>
        </ul>

        <h2 className="text-2xl font-bold">Real-World Projects</h2>
        <p>Students will work on practical projects that mirror real industry scenarios:</p>

        <ul className="space-y-2 ml-6">
          <li className="list-disc">Building a personal portfolio website</li>
          <li className="list-disc">Creating a weather app with API integration</li>
          <li className="list-disc">Developing a task management application</li>
          <li className="list-disc">Building a simple e-commerce product catalog</li>
        </ul>

        <h2 className="text-2xl font-bold">Industry Relevance</h2>
        <p>
          This update ensures our students graduate with skills that are immediately applicable in the job market. React
          is used by major companies like Facebook, Netflix, and Airbnb, making it one of the most valuable skills for
          aspiring web developers.
        </p>

        <p>
          We've also partnered with local tech companies to provide guest lectures and mentorship opportunities, giving
          students direct insight into professional development practices.
        </p>
      </div>
    ),
  },
  "tech-industry-guest-speaker": {
    title: "Tech Industry Guest Speaker Visits Our School",
    excerpt:
      "A senior software engineer from a leading tech company shared insights about career paths in computer science and the future of technology.",
    publishedAt: "October 22, 2024",
    category: "Event",
    readingTime: "5 min read",
    featuredImage: "/placeholder.svg?height=400&width=800",
    tags: ["Guest Speaker", "Career", "Technology", "Industry", "Students"],
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed">
          Last week, we had the privilege of hosting Sarah Chen, a Senior Software Engineer from TechCorp, one of the
          leading technology companies in our region. Her visit provided our students with invaluable insights into the
          tech industry and career opportunities in computer science.
        </p>

        <h2 className="text-2xl font-bold">About Our Speaker</h2>
        <p>
          Sarah Chen has over 8 years of experience in software development, specializing in full-stack web development
          and cloud architecture. She's worked on products used by millions of users and has led teams of developers on
          major projects. Her journey from computer science student to senior engineer provided an inspiring example for
          our students.
        </p>

        <h2 className="text-2xl font-bold">Key Takeaways from the Presentation</h2>
        <p>Sarah's presentation covered several important topics that resonated strongly with our students:</p>

        <h3 className="text-xl font-semibold">Career Paths in Tech</h3>
        <ul className="space-y-2 ml-6">
          <li className="list-disc">Frontend, Backend, and Full-stack Development</li>
          <li className="list-disc">DevOps and Cloud Engineering</li>
          <li className="list-disc">Data Science and Machine Learning</li>
          <li className="list-disc">Cybersecurity and Information Security</li>
          <li className="list-disc">Product Management and Technical Leadership</li>
        </ul>

        <h3 className="text-xl font-semibold">Skills That Matter</h3>
        <p>Sarah emphasized that while technical skills are important, soft skills are equally valuable:</p>
        <ul className="space-y-2 ml-6">
          <li className="list-disc">Problem-solving and critical thinking</li>
          <li className="list-disc">Communication and teamwork</li>
          <li className="list-disc">Continuous learning and adaptability</li>
          <li className="list-disc">Project management and time organization</li>
        </ul>

        <h2 className="text-2xl font-bold">Student Q&A Session</h2>
        <p>
          The highlight of the visit was the interactive Q&A session where students asked thoughtful questions about:
        </p>

        <ul className="space-y-2 ml-6">
          <li className="list-disc">Day-to-day responsibilities of a software engineer</li>
          <li className="list-disc">How to prepare for technical interviews</li>
          <li className="list-disc">The importance of building a portfolio</li>
          <li className="list-disc">Work-life balance in the tech industry</li>
          <li className="list-disc">Opportunities for remote work and freelancing</li>
        </ul>

        <h2 className="text-2xl font-bold">Inspiring the Next Generation</h2>
        <p>
          Sarah's visit had a profound impact on our students. Many expressed renewed enthusiasm for their computer
          science studies and clearer vision of their future career paths. Several students have already started working
          on personal projects inspired by her recommendations.
        </p>

        <p>
          We're grateful to Sarah and TechCorp for taking the time to invest in our students' futures. These industry
          connections are invaluable for helping students understand the real-world applications of their studies and
          the exciting opportunities that await them.
        </p>

        <h2 className="text-2xl font-bold">Looking Forward</h2>
        <p>
          We're planning to make guest speaker visits a regular part of our program, with upcoming presentations from
          professionals in cybersecurity, game development, and artificial intelligence. If you're a tech professional
          interested in sharing your experience with our students, please reach out!
        </p>
      </div>
    ),
  },
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = articles[slug as keyof typeof articles]

  if (!article) {
    notFound()
  }

  const relatedArticles = Object.entries(articles)
    .filter(([articleSlug]) => articleSlug !== slug)
    .slice(0, 3)
    .map(([articleSlug, articleData]) => ({
      title: articleData.title,
      excerpt: articleData.excerpt,
      href: `/articles/${articleSlug}`,
      category: articleData.category,
      publishedAt: articleData.publishedAt,
      image: articleData.featuredImage,
    }))

  const articleSlugs = Object.keys(articles)
  const currentIndex = articleSlugs.indexOf(slug)

  const previousArticle =
    currentIndex > 0
      ? {
          title: articles[articleSlugs[currentIndex - 1] as keyof typeof articles].title,
          href: `/articles/${articleSlugs[currentIndex - 1]}`,
        }
      : undefined

  const nextArticle =
    currentIndex < articleSlugs.length - 1
      ? {
          title: articles[articleSlugs[currentIndex + 1] as keyof typeof articles].title,
          href: `/articles/${articleSlugs[currentIndex + 1]}`,
        }
      : undefined

  return (
    <ArticlePageTemplate
      title={article.title}
      excerpt={article.excerpt}
      publishedAt={article.publishedAt}
      category={article.category}
      readingTime={article.readingTime}
      featuredImage={article.featuredImage}
      tags={article.tags}
      relatedArticles={relatedArticles}
      previousArticle={previousArticle}
      nextArticle={nextArticle}
    >
      {article.content}
    </ArticlePageTemplate>
  )
}

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({
    slug,
  }))
}
