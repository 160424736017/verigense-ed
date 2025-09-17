import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Download, 
  FileText, 
  Search, 
  Upload 
} from "lucide-react"

// Mock data for pending grades
const pendingAssignments = [
  { id: 1, name: "Mathematics Assignment 3", class: "Mathematics 101", dueDate: "2025-09-15", studentsPending: 5 },
  { id: 2, name: "Physics Lab Report", class: "Physics 201", dueDate: "2025-09-18", studentsPending: 3 },
  { id: 3, name: "Chemistry Quiz", class: "Chemistry 301", dueDate: "2025-09-20", studentsPending: 8 },
]

const studentGrades = [
  { id: 1, name: "Alice Johnson", studentId: "STU001", assignment: "Mathematics Assignment 3", grade: "", status: "pending" },
  { id: 2, name: "Bob Smith", studentId: "STU002", assignment: "Mathematics Assignment 3", grade: "", status: "pending" },
  { id: 3, name: "Carol Davis", studentId: "STU003", assignment: "Mathematics Assignment 3", grade: "", status: "pending" },
  { id: 4, name: "David Wilson", studentId: "STU004", assignment: "Mathematics Assignment 3", grade: "", status: "pending" },
  { id: 5, name: "Eva Brown", studentId: "STU005", assignment: "Mathematics Assignment 3", grade: "", status: "pending" },
]

export default function TeacherPendingGradesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="grid grid-cols-1 gap-6 px-4 lg:px-6">
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-2xl font-bold">Pending Grades</h1>
                  <p className="text-muted-foreground">Grade assignments that are pending evaluation</p>
                </div>

                {/* Pending Assignments Overview */}
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
                              <Button size="sm">Grade Now</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Grade Entry Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Grade Entry: Mathematics Assignment 3
                    </CardTitle>
                    <CardDescription>Enter grades for pending assignments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search students..." className="pl-8" />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          Download Template
                        </Button>
                        <Button>
                          <Upload className="mr-2 h-4 w-4" />
                          Import Grades
                        </Button>
                      </div>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student Name</TableHead>
                          <TableHead>Student ID</TableHead>
                          <TableHead>Submission Status</TableHead>
                          <TableHead>Grade</TableHead>
                          <TableHead>Comments</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {studentGrades.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell>{student.studentId}</TableCell>
                            <TableCell>
                              <Badge variant="default">Submitted</Badge>
                            </TableCell>
                            <TableCell>
                              <Input 
                                placeholder="Enter grade" 
                                className="w-24" 
                                defaultValue={student.grade}
                              />
                            </TableCell>
                            <TableCell>
                              <Input placeholder="Add comments" className="w-32" />
                            </TableCell>
                            <TableCell>
                              <Button size="sm">Save</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="flex justify-between mt-4">
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export Ungraded
                      </Button>
                      <Button>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Submit All Grades
                      </Button>
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