import Link from "next/link"
import { Calendar, Users, Clock, Download, ExternalLink, BookOpen, Code, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import InformationalPageTemplate from "@/components/informational-page-template"

export default function IntroProgrammingPage() {
  const sidebar = (
    <>
      {/* Course Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Course Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Mon, Wed, Fri</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm">10:00 AM - 11:30 AM</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm">25 students enrolled</span>
          </div>
          <Separator />
          <div className="space-y-2">
            <h4 className="font-medium">Prerequisites</h4>
            <p className="text-sm text-gray-600">Basic computer literacy</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Duration</h4>
            <p className="text-sm text-gray-600">Full academic year</p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
            <Link href="/resources/downloads">
              <Download className="mr-2 h-4 w-4" />
              Course Materials
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
            <Link href="/resources/tutorials">
              <BookOpen className="mr-2 h-4 w-4" />
              Tutorials
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
            <Link href="/resources/projects">
              <Code className="mr-2 h-4 w-4" />
              Student Projects
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <ExternalLink className="mr-2 h-4 w-4" />
            Python.org
          </Button>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Trophy className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Regional Competition</p>
                <p className="text-xs text-gray-500">3rd place in beginner category</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Trophy className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">School Science Fair</p>
                <p className="text-xs text-gray-500">Best Programming Project</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )

  return (
    <InformationalPageTemplate
      title="Introduction to Programming"
      subtitle="Learn Python fundamentals and computational thinking"
      description="This course introduces students to the fundamental concepts of programming using Python. Students will learn to think computationally and solve problems through code."
      breadcrumb={{ label: "Courses", href: "/courses" }}
      heroImage="/placeholder.svg?height=200&width=300"
      badge="Grade 9-10"
      sidebar={sidebar}
      showBackButton={true}
      backButtonText="All Courses"
      backButtonHref="/courses"
    >
      {/* Course Overview */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Introduction to Programming is designed for students with little to no programming experience. Through
            hands-on projects and interactive exercises, students will master the fundamentals of Python programming
            while developing critical thinking and problem-solving skills.
          </p>
          <p className="text-gray-600 leading-relaxed">
            By the end of this course, students will be able to write simple programs, understand basic algorithms, and
            have a solid foundation for more advanced computer science courses.
          </p>
        </div>

        <Separator />

        {/* Learning Objectives */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Learning Objectives</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              Understand fundamental programming concepts including variables, data types, and operators
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              Master control structures: conditionals, loops, and functions
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              Work with basic data structures like lists and dictionaries
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              Develop problem-solving skills through algorithmic thinking
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              Create simple interactive programs and games
            </li>
          </ul>
        </div>

        <Separator />

        {/* Course Topics */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Course Topics</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Unit 1: Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Introduction to Python and IDLE</li>
                  <li>• Variables and data types</li>
                  <li>• Basic input and output</li>
                  <li>• Mathematical operations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Unit 2: Control Structures</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Conditional statements (if/else)</li>
                  <li>• Boolean logic and operators</li>
                  <li>• While and for loops</li>
                  <li>• Nested structures</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Unit 3: Functions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Defining and calling functions</li>
                  <li>• Parameters and return values</li>
                  <li>• Local vs global scope</li>
                  <li>• Built-in functions</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Unit 4: Data Structures</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Lists and list methods</li>
                  <li>• Dictionaries and key-value pairs</li>
                  <li>• String manipulation</li>
                  <li>• File input/output basics</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        {/* Assessment */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Assessment</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Programming Projects</h4>
                <p className="text-sm text-gray-600">Hands-on coding assignments</p>
              </div>
              <Badge variant="secondary">40%</Badge>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Quizzes & Tests</h4>
                <p className="text-sm text-gray-600">Concept understanding</p>
              </div>
              <Badge variant="secondary">30%</Badge>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Final Project</h4>
                <p className="text-sm text-gray-600">Comprehensive application</p>
              </div>
              <Badge variant="secondary">20%</Badge>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Participation</h4>
                <p className="text-sm text-gray-600">Class engagement</p>
              </div>
              <Badge variant="secondary">10%</Badge>
            </div>
          </div>
        </div>

        <Separator />

        {/* Contact */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Questions?</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about this course or need additional support, please don't hesitate to reach out.
          </p>
          <Button asChild>
            <Link href="/contact">Contact Me</Link>
          </Button>
        </div>
      </div>
    </InformationalPageTemplate>
  )
}
