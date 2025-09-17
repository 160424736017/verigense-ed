import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  Download, 
  Filter, 
  PlusCircle, 
  Search, 
  Upload 
} from "lucide-react"

// Mock data for gradebook
const assignments = [
  { id: 1, name: "Assignment 1", type: "Homework", date: "2025-09-01", maxPoints: 30 },
  { id: 2, name: "Quiz 1", type: "Quiz", date: "2025-09-05", maxPoints: 20 },
  { id: 3, name: "Midterm Exam", type: "Exam", date: "2025-09-15", maxPoints: 100 },
  { id: 4, name: "Assignment 2", type: "Homework", date: "2025-09-20", maxPoints: 30 },
]

const students = [
  { id: 1, name: "Alice Johnson", studentId: "STU001" },
  { id: 2, name: "Bob Smith", studentId: "STU002" },
  { id: 3, name: "Carol Davis", studentId: "STU003" },
  { id: 4, name: "David Wilson", studentId: "STU004" },
  { id: 5, name: "Eva Brown", studentId: "STU005" },
]

// Mock grades data
const grades: Record<string, Record<string, number>> = {
  "STU001": { "1": 28, "2": 18, "3": 92, "4": 29 },
  "STU002": { "1": 25, "2": 16, "3": 85, "4": 27 },
  "STU003": { "1": 30, "2": 20, "3": 95, "4": 30 },
  "STU004": { "1": 22, "2": 14, "3": 78, "4": 25 },
  "STU005": { "1": 27, "2": 19, "3": 88, "4": 28 },
}

export default function TeacherGradebookPage() {
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
                    <h1 className="text-2xl font-bold">Gradebook</h1>
                    <p className="text-muted-foreground">Comprehensive view of all student grades</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      New Assignment
                    </Button>
                  </div>
                </div>

                {/* Class and Assignment Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Class: Mathematics 101</CardTitle>
                    <CardDescription>Select assignments to view in the gradebook</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {assignments.map((assignment) => (
                        <Badge key={assignment.id} variant="default" className="py-2 px-3">
                          <div className="flex flex-col">
                            <span className="font-medium">{assignment.name}</span>
                            <span className="text-xs opacity-80">{assignment.date} • {assignment.maxPoints} pts</span>
                          </div>
                        </Badge>
                      ))}
                      <Button variant="outline" size="sm">
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Gradebook Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Student Grades</CardTitle>
                    <CardDescription>Detailed gradebook with all assignments and student scores</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search students..." className="pl-8" />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">
                          <Upload className="mr-2 h-4 w-4" />
                          Import Grades
                        </Button>
                        <Button>
                          <Download className="mr-2 h-4 w-4" />
                          Export Gradebook
                        </Button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-64">Student</TableHead>
                            {assignments.map((assignment) => (
                              <TableHead key={assignment.id} className="text-center">
                                <div className="flex flex-col">
                                  <span>{assignment.name}</span>
                                  <span className="text-xs font-normal text-muted-foreground">
                                    {assignment.maxPoints} pts
                                  </span>
                                </div>
                              </TableHead>
                            ))}
                            <TableHead className="text-center">Total</TableHead>
                            <TableHead className="text-center">Average</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {students.map((student) => {
                            const studentGrades = grades[student.studentId] || {};
                            const totalPoints = assignments.reduce((sum, assignment) => {
                              return sum + (studentGrades[assignment.id.toString()] || 0);
                            }, 0);
                            const maxPoints = assignments.reduce((sum, assignment) => sum + assignment.maxPoints, 0);
                            const average = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;

                            return (
                              <TableRow key={student.id}>
                                <TableCell>
                                  <div>
                                    <div className="font-medium">{student.name}</div>
                                    <div className="text-sm text-muted-foreground">{student.studentId}</div>
                                  </div>
                                </TableCell>
                                {assignments.map((assignment) => (
                                  <TableCell key={assignment.id} className="text-center">
                                    <Input
                                      type="number"
                                      min="0"
                                      max={assignment.maxPoints}
                                      defaultValue={studentGrades[assignment.id.toString()] || ''}
                                      className="w-20 text-center"
                                    />
                                  </TableCell>
                                ))}
                                <TableCell className="text-center font-medium">
                                  {totalPoints}/{maxPoints}
                                </TableCell>
                                <TableCell className="text-center">
                                  <Badge variant={average >= 90 ? "default" : average >= 80 ? "secondary" : "destructive"}>
                                    {average}%
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="flex justify-end mt-4">
                      <Button>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Save All Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Grade Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Grade Statistics</CardTitle>
                    <CardDescription>Summary statistics for the current gradebook</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold">28.5</div>
                          <div className="text-sm text-muted-foreground">Class Average</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold">30</div>
                          <div className="text-sm text-muted-foreground">Highest Score</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold">14</div>
                          <div className="text-sm text-muted-foreground">Lowest Score</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold">95%</div>
                          <div className="text-sm text-muted-foreground">Assignment Completion</div>
                        </CardContent>
                      </Card>
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