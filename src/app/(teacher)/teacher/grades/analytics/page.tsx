import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart, 
  Download, 
  Filter, 
  TrendingUp, 
  Users, 
  Calendar,
  BookOpen
} from "lucide-react"

// Mock data for analytics
const classPerformance = [
  { id: 1, class: "Mathematics 101", averageGrade: "B+", passRate: "92%", improvement: "+5%" },
  { id: 2, class: "Physics 201", averageGrade: "B", passRate: "85%", improvement: "+2%" },
  { id: 3, class: "Chemistry 301", averageGrade: "B+", passRate: "88%", improvement: "+7%" },
]

const gradeDistribution = [
  { grade: "A", count: 15, percentage: 25 },
  { grade: "B", count: 25, percentage: 42 },
  { grade: "C", count: 12, percentage: 20 },
  { grade: "D", count: 5, percentage: 8 },
  { grade: "F", count: 3, percentage: 5 },
]

export default function TeacherGradesAnalyticsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="grid grid-cols-1 gap-6 px-4 lg:px-6">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold">Grades Analytics</h1>
                    <p className="text-muted-foreground">Detailed insights into student performance</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Button>
                      <Download className="mr-2 h-4 w-4" />
                      Export Report
                    </Button>
                  </div>
                </div>

                {/* Performance Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Overall Pass Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">88%</div>
                      <p className="text-sm text-muted-foreground">+3% from last semester</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Average Grade
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">B+</div>
                      <p className="text-sm text-muted-foreground">Improved from B</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Assignments Graded
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">42/45</div>
                      <p className="text-sm text-muted-foreground">93% completion</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Class Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle>Class Performance Comparison</CardTitle>
                    <CardDescription>Performance metrics across your classes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {classPerformance.map((classItem) => (
                        <div key={classItem.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-medium">{classItem.class}</h3>
                          </div>
                          <div className="flex gap-6">
                            <div>
                              <p className="text-sm text-muted-foreground">Average Grade</p>
                              <p className="font-medium">{classItem.averageGrade}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Pass Rate</p>
                              <p className="font-medium">{classItem.passRate}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Improvement</p>
                              <p className="font-medium text-green-600">{classItem.improvement}</p>
                            </div>
                            <div>
                              <Button variant="outline" size="sm">View Details</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Grade Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart className="h-5 w-5" />
                        Grade Distribution
                      </CardTitle>
                      <CardDescription>Spread of grades across all assignments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-lg">
                        <p className="text-muted-foreground">Interactive grade distribution chart will be implemented here</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Grade Distribution Details</CardTitle>
                      <CardDescription>Numerical breakdown of grades</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {gradeDistribution.map((gradeItem) => (
                          <div key={gradeItem.grade}>
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">Grade {gradeItem.grade}</span>
                              <span>{gradeItem.count} students ({gradeItem.percentage}%)</span>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${gradeItem.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Student Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle>Student Insights</CardTitle>
                    <CardDescription>Notable student performance patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-2">Top Performers</h3>
                        <p className="text-sm text-muted-foreground">5 students with consistent A grades</p>
                        <Badge className="mt-2">View List</Badge>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-2">At-Risk Students</h3>
                        <p className="text-sm text-muted-foreground">3 students with multiple D/F grades</p>
                        <Badge variant="destructive" className="mt-2">Intervene</Badge>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-2">Improving Students</h3>
                        <p className="text-sm text-muted-foreground">8 students showing significant improvement</p>
                        <Badge variant="default" className="mt-2">Encourage</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}