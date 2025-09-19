import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Share2, FileText, AlertTriangle, TrendingUp, BarChart3, CheckCircle, XCircle, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import AnimatedContent from "@/components/animated-content"

// Define types for our data
interface SemesterData {
  cumulativeGPA: number
  cumulativePercentage: number
  currentSemesterGPA: number
  currentSemesterCGPA: number
  creditsEarned: number
  creditsRequired: number
  graduationPercentage: number
  badges: Array<{
    id: number
    text: string
    variant: "default" | "destructive"
  }>
}

interface SemesterTab {
  id: string
  label: string
}

interface Grade {
  id: number
  subject: string
  internal: string
  external: string
  finalGrade: string
  credits: number
  status: string
}

interface GradesData {
  sem1: Grade[]
  sem2: Grade[]
}

interface BacklogData {
  id: number
  subject: string
  semester: string
  credits: number
  nextOpportunity: string
}

interface CreditsData {
  completed: number
  remaining: number
  coreSubjects: number
  electives: number
  labs: number
}

interface ForecastingData {
  id: number
  message: string
}

// Mock data for the grades page
const semesterData = {
  cumulativeGPA: 3.75,
  cumulativePercentage: 85.2,
  currentSemesterGPA: 3.8,
  currentSemesterCGPA: 3.75,
  creditsEarned: 92,
  creditsRequired: 120,
  graduationPercentage: 76.7,
  badges: [
    { id: 1, text: "Distinction Level", variant: "default" },
    { id: 2, text: "At Risk in Physics", variant: "destructive" }
  ]
}

const semesterTabs = [
  { id: "sem1", label: "Semester 1" },
  { id: "sem2", label: "Semester 2" },
  { id: "sem3", label: "Semester 3" },
  { id: "sem4", label: "Semester 4" }
]

const gradesData: GradesData = {
  sem1: [
    { id: 1, subject: "Mathematics", internal: "26/30", external: "62/70", finalGrade: "A", credits: 4, status: "passed" },
    { id: 2, subject: "Physics", internal: "22/30", external: "45/70", finalGrade: "B", credits: 3, status: "passed" },
    { id: 3, subject: "Chemistry", internal: "28/30", external: "65/70", finalGrade: "A", credits: 4, status: "passed" },
    { id: 4, subject: "Biology", internal: "24/30", external: "58/70", finalGrade: "B", credits: 3, status: "passed" }
  ],
  sem2: [
    { id: 1, subject: "Mathematics II", internal: "27/30", external: "64/70", finalGrade: "A", credits: 4, status: "passed" },
    { id: 2, subject: "Physics II", internal: "18/30", external: "42/70", finalGrade: "C", credits: 3, status: "backlog" },
    { id: 3, subject: "Computer Science", internal: "29/30", external: "67/70", finalGrade: "A", credits: 4, status: "passed" }
  ]
}

// Mock data for backlogs
const backlogsData = [
  { id: 1, subject: "Physics II", semester: "Semester 2", credits: 3, nextOpportunity: "Supplementary Exam - Dec 2025" }
]

// Mock data for credits tracker
const creditsData = {
  completed: 92,
  remaining: 28,
  coreSubjects: 60,
  electives: 20,
  labs: 12
}

// Mock data for forecasting
const forecastingData = [
  { id: 1, message: "At current pace, graduation on time is possible if 1 backlog cleared in next semester." },
  { id: 2, message: "You must earn 8 more credits from electives." }
]

export default function GradesPage() {
  // Calculate active backlogs count
  const activeBacklogsCount = backlogsData.length;
  
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="grid grid-cols-1 gap-6 px-4 lg:px-6">
              <div className="flex flex-col gap-6">
                {/* Page Header */}
                <AnimatedContent
                  distance={40}
                  direction="vertical"
                  reverse={false}
                  duration={0.6}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity
                  scale={1}
                  threshold={0.15}
                  delay={0.05}
                >
                  <div>
                    <h1 className="text-2xl font-bold">Grades</h1>
                    <p className="text-muted-foreground">View your academic grades and performance.</p>
                  </div>
                </AnimatedContent>

                {/* Snapshot / Overview Section */}
                <AnimatedContent
                  distance={40}
                  direction="vertical"
                  reverse={false}
                  duration={0.6}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity
                  scale={1}
                  threshold={0.15}
                  delay={0.1}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Student Progress Snapshot</CardTitle>
                      <CardDescription>Your overall academic performance at a glance</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card className="bg-muted/50">
                        <CardHeader className="pb-2">
                          <CardDescription>CGPA / SGPA</CardDescription>
                          <CardTitle className="text-3xl">{semesterData.cumulativeGPA} / {semesterData.currentSemesterGPA}</CardTitle>
                        </CardHeader>
                      </Card>
                      <Card className="bg-muted/50">
                        <CardHeader className="pb-2">
                          <CardDescription>Credits Earned / Required</CardDescription>
                          <CardTitle className="text-3xl">{semesterData.creditsEarned} / {semesterData.creditsRequired}</CardTitle>
                        </CardHeader>
                      </Card>
                      <Card className="bg-muted/50">
                        <CardHeader className="pb-2">
                          <CardDescription>Active Backlogs</CardDescription>
                          <CardTitle className="text-3xl">{activeBacklogsCount}</CardTitle>
                        </CardHeader>
                      </Card>
                      <Card className="bg-muted/50">
                        <CardHeader className="pb-2">
                          <CardDescription>Graduation Readiness</CardDescription>
                          <CardTitle className="text-3xl">{semesterData.graduationPercentage}%</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <Progress value={semesterData.graduationPercentage} className="h-2" />
                        </CardContent>
                      </Card>
                      
                      {/* Badges Section */}
                      <div className="md:col-span-2 lg:col-span-4 flex flex-wrap gap-2">
                        {semesterData.badges.map((badge) => (
                          <Badge key={badge.id} variant={badge.variant as "default" | "destructive"}>
                            {badge.text}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedContent>

                {/* Semester Tabs */}
                <AnimatedContent
                  distance={40}
                  direction="vertical"
                  reverse={false}
                  duration={0.6}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity
                  scale={1}
                  threshold={0.15}
                  delay={0.15}
                >
                  <Tabs defaultValue="sem1" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      {semesterTabs.map((tab) => (
                        <TabsTrigger key={tab.id} value={tab.id}>
                          {tab.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {semesterTabs.map((tab) => (
                      <TabsContent key={tab.id} value={tab.id}>
                        <Card>
                          <CardHeader>
                            <CardTitle>{tab.label} Grades</CardTitle>
                            <CardDescription>Detailed breakdown of your performance</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Course</TableHead>
                                  <TableHead>Credits</TableHead>
                                  <TableHead>Internal Marks</TableHead>
                                  <TableHead>External Marks</TableHead>
                                  <TableHead>Grade</TableHead>
                                  <TableHead>Status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {gradesData[tab.id as keyof GradesData]?.map((grade: Grade) => (
                                  <TableRow key={grade.id}>
                                    <TableCell className="font-medium">{grade.subject}</TableCell>
                                    <TableCell>{grade.credits}</TableCell>
                                    <TableCell>{grade.internal}</TableCell>
                                    <TableCell>{grade.external}</TableCell>
                                    <TableCell>{grade.finalGrade}</TableCell>
                                    <TableCell>
                                      {grade.status === "passed" ? (
                                        <div className="flex items-center gap-1 text-green-600">
                                          <CheckCircle className="h-4 w-4" />
                                          <span>Passed</span>
                                        </div>
                                      ) : grade.status === "backlog" ? (
                                        <div className="flex items-center gap-1 text-red-600">
                                          <XCircle className="h-4 w-4" />
                                          <span>Backlog</span>
                                        </div>
                                      ) : (
                                        <div className="flex items-center gap-1 text-yellow-600">
                                          <Clock className="h-4 w-4" />
                                          <span>Awaiting Result</span>
                                        </div>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    ))}
                  </Tabs>
                </AnimatedContent>

                {/* Backlogs Section */}
                <AnimatedContent
                  distance={40}
                  direction="vertical"
                  reverse={false}
                  duration={0.6}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity
                  scale={1}
                  threshold={0.15}
                  delay={0.2}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Backlogs</CardTitle>
                      <CardDescription>Track your pending courses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Subject</TableHead>
                            <TableHead>Semester</TableHead>
                            <TableHead>Credits</TableHead>
                            <TableHead>Next Opportunity</TableHead>
                            <TableHead>Impact</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {backlogsData.map((backlog) => (
                            <TableRow key={backlog.id}>
                              <TableCell className="font-medium">{backlog.subject}</TableCell>
                              <TableCell>{backlog.semester}</TableCell>
                              <TableCell>{backlog.credits}</TableCell>
                              <TableCell>{backlog.nextOpportunity}</TableCell>
                              <TableCell>Clearing {backlog.subject} will raise credits from {semesterData.creditsEarned} → {semesterData.creditsEarned + backlog.credits}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </AnimatedContent>

                {/* Credits Tracker */}
                <AnimatedContent
                  distance={40}
                  direction="vertical"
                  reverse={false}
                  duration={0.6}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity
                  scale={1}
                  threshold={0.15}
                  delay={0.25}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Credits Tracker</CardTitle>
                      <CardDescription>Visual representation of your credit progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          {/* Chart visualization area - to be implemented later */}
                          <div className="h-[200px] flex items-center justify-center bg-muted/50 rounded-lg">
                            <p className="text-muted-foreground">Credits chart visualization will be implemented here</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Core Subjects</span>
                              <span>{creditsData.coreSubjects}/70</span>
                            </div>
                            <Progress value={(creditsData.coreSubjects / 70) * 100} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Electives</span>
                              <span>{creditsData.electives}/15</span>
                            </div>
                            <Progress value={(creditsData.electives / 15) * 100} className="h-2" />
                            <p className="text-sm text-yellow-600 mt-1">Elective credits short by {15 - creditsData.electives}</p>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Labs/Projects</span>
                              <span>{creditsData.labs}/15</span>
                            </div>
                            <Progress value={(creditsData.labs / 15) * 100} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedContent>

                {/* Forecasting & Alerts */}
                <AnimatedContent
                  distance={40}
                  direction="vertical"
                  reverse={false}
                  duration={0.6}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity
                  scale={1}
                  threshold={0.15}
                  delay={0.3}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Forecasting & Alerts</CardTitle>
                      <CardDescription>AI-powered predictions for your academic journey</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {forecastingData.map((forecast) => (
                        <div key={forecast.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <p className="text-sm">{forecast.message}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </AnimatedContent>

                {/* Certificates & Downloads */}
                <AnimatedContent
                  distance={40}
                  direction="vertical"
                  reverse={false}
                  duration={0.6}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity
                  scale={1}
                  threshold={0.15}
                  delay={0.35}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Certificates & Downloads</CardTitle>
                      <CardDescription>Manage your academic documents</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4">
                      <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Download Transcript
                      </Button>
                      <Button variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        Apply for Re-evaluation
                      </Button>
                      <Button variant="outline">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share Secure Link
                      </Button>
                      <Button variant="outline">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Export to Excel
                      </Button>
                    </CardContent>
                  </Card>
                </AnimatedContent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}