
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookOpen, Video, FileText, CheckCircle } from 'lucide-react'
const Chapter = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Chapter: Introduction to React</h1>
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
          <CardDescription>Track your progress through this chapter</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={33} className="w-full" />
          <p className="mt-2 text-sm text-muted-foreground">2 of 6 lessons completed</p>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lesson 1: React Basics</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Video className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Video Lecture</span>
            </div>
            <Button className="mt-4 w-full">Review Lesson</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lesson 2: Components</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Reading Material</span>
            </div>
            <Button className="mt-4 w-full">Review Lesson</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lesson 3: State and Props</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Video className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Video Lecture</span>
            </div>
            <Button className="mt-4 w-full">Start Lesson</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lesson 4: Hooks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Reading Material</span>
            </div>
            <Button className="mt-4 w-full" disabled>Locked</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lesson 5: Routing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Video className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Video Lecture</span>
            </div>
            <Button className="mt-4 w-full" disabled>Locked</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lesson 6: Final Project</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Project Assignment</span>
            </div>
            <Button className="mt-4 w-full" disabled>Locked</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Chapter