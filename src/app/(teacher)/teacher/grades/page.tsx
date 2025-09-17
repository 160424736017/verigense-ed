import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Download, 
  FileText, 
  PlusCircle, 
  Search, 
  TrendingUp, 
  Upload, 
  Users, 
  XCircle 
} from "lucide-react"

// Mock data for teacher grades page
const classData = [
  { id: 1, name: "Mathematics 101", code: "MATH101", students: 24 },
  { id: 2, name: "Physics 201", code: "PHYS201", students: 18 },
  { id: 3, name: "Chemistry 301", code: "CHEM301", students: 22 },
]

const pendingAssignments = [
  { id: 1, name: "Mathematics Assignment 3", class: "Mathematics 101", dueDate: "2025-09-15", studentsPending: 5 },
  { id: 2, name: "Physics Lab Report", class: "Physics 201", dueDate: "2025-09-18", studentsPending: 3 },
  { id: 3, name: "Chemistry Quiz", class: "Chemistry 301", dueDate: "2025-09-20", studentsPending: 8 },
]

const recentGrading = [
  { id: 1, assignment: "Mathematics Assignment 2", class: "Mathematics 101", graded: 24, total: 24, date: "2025-09-16" },
  { id: 2, assignment: "Physics Midterm", class: "Physics 201", graded: 15, total: 18, date: "2025-09-15" },
  { id: 3, assignment: "Chemistry Lab Report", class: "Chemistry 301", graded: 18, total: 22, date: "2025-09-14" },
]

const studentGrades = [
  { id: 1, name: "Alice Johnson", studentId: "STU001", assignment: "Mathematics Assignment 3", grade: "", status: "pending" },
  { id: 2, name: "Bob Smith", studentId: "STU002", assignment: "Mathematics Assignment 3", grade: "", status: "pending" },
  { id: 3, name: "Carol Davis", studentId: "STU003", assignment: "Mathematics Assignment 3", grade: "", status: "pending" },
  { id: 4, name: "David Wilson", studentId: "STU004", assignment: "Mathematics Assignment 3", grade: "", status: "pending" },
  { id: 5, name: "Eva Brown", studentId: "STU005", assignment: "Mathematics Assignment 3", grade: "", status: "pending" },
]

export default function TeacherGradesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="grid grid-cols-1 gap-6 px-4 lg:px-6">
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-2xl font-bold">Grades Management</h1>
                  <p className="text-muted-foreground">Manage and track student grades across your classes</p>
                </div>

                {/* Class Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Class Selection</CardTitle>
                    <CardDescription>Select a class to manage grades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {classData.map((classItem) => (
                        <Card key={classItem.id} className="hover:bg-accent transition-colors cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{classItem.name}</h3>
                                <p className="text-sm text-muted-foreground">{classItem.code}</p>
                              </div>
                              <Badge variant="secondary">{classItem.students} students</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Pending Assignments and Recent Grading */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Pending Assignments */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Pending Assignments
                      </CardTitle>
                      <CardDescription>Assignments requiring grade entry</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Assignment</TableHead>
                            <TableHead>Class</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Pending</TableHead>
                            <TableHead>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pendingAssignments.map((assignment) => (
                            <TableRow key={assignment.id}>
                              <TableCell className="font-medium">{assignment.name}</TableCell>
                              <TableCell>{assignment.class}</TableCell>
                              <TableCell>{assignment.dueDate}</TableCell>
                              <TableCell>
                                <Badge variant="destructive">{assignment.studentsPending}</Badge>
                              </TableCell>
                              <TableCell>
                                <Button size="sm" variant="outline">
                                  Grade Now
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  {/* Recent Grading */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        Recent Grading
                      </CardTitle>
                      <CardDescription>Recently completed grading tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Assignment</TableHead>
                            <TableHead>Class</TableHead>
                            <TableHead>Graded</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentGrading.map((grading) => (
                            <TableRow key={grading.id}>
                              <TableCell className="font-medium">{grading.assignment}</TableCell>
                              <TableCell>{grading.class}</TableCell>
                              <TableCell>{grading.graded}/{grading.total}</TableCell>
                              <TableCell>{grading.date}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>

                {/* Grade Entry Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Grade Entry
                    </CardTitle>
                    <CardDescription>Enter grades for pending assignments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <div>
                        <Label htmlFor="class">Class</Label>
                        <Select>
                          <SelectTrigger id="class">
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            {classData.map((classItem) => (
                              <SelectItem key={classItem.id} value={classItem.code}>
                                {classItem.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="assignment">Assignment</Label>
                        <Select>
                          <SelectTrigger id="assignment">
                            <SelectValue placeholder="Select assignment" />
                          </SelectTrigger>
                          <SelectContent>
                            {pendingAssignments.map((assignment) => (
                              <SelectItem key={assignment.id} value={assignment.name}>
                                {assignment.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="search">Search Student</Label>
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input id="search" placeholder="Search by name or ID" className="pl-8" />
                        </div>
                      </div>
                      <div className="flex items-end">
                        <Button className="w-full">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          New Assignment
                        </Button>
                      </div>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student Name</TableHead>
                          <TableHead>Student ID</TableHead>
                          <TableHead>Assignment</TableHead>
                          <TableHead>Grade</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {studentGrades.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell>{student.studentId}</TableCell>
                            <TableCell>{student.assignment}</TableCell>
                            <TableCell>
                              <Input 
                                placeholder="Enter grade" 
                                className="w-24" 
                                defaultValue={student.grade}
                              />
                            </TableCell>
                            <TableCell>
                              <Badge variant={student.status === "pending" ? "destructive" : "default"}>
                                {student.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button size="sm">Save</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="flex justify-end mt-4">
                      <Button>
                        <Upload className="mr-2 h-4 w-4" />
                        Submit All Grades
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Analytics and Reports */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Grade Distribution
                      </CardTitle>
                      <CardDescription>Visual representation of grade distribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] flex items-center justify-center bg-muted/50 rounded-lg">
                        <p className="text-muted-foreground">Grade distribution chart will be implemented here</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Class Performance
                      </CardTitle>
                      <CardDescription>Overall class performance metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Average Grade</span>
                            <span>B+</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Pass Rate</span>
                            <span>92%</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Improvement Trend</span>
                            <span>+5%</span>
                          </div>
                        </div>
                        <div className="pt-4">
                          <Button className="w-full">
                            <Download className="mr-2 h-4 w-4" />
                            Export Report
                          </Button>
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
    </div>
  )
}