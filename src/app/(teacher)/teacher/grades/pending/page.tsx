"use client"

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
import { GradeEntryTable } from "@/components/grade-entry-table"
import { useState } from "react"
import { toast } from "sonner"

// Type for student grades
type StudentGrade = {
  id: string
  studentName: string
  studentId: string
  assignment: string
  grade: string | number
  maxPoints: number
  status: "pending" | "submitted" | "graded"
  comments?: string
}

// Mock data for pending grades
const pendingAssignments = [
  { id: 1, name: "Mathematics Assignment 3", class: "Mathematics 101", dueDate: "2025-09-15", studentsPending: 5 },
  { id: 2, name: "Physics Lab Report", class: "Physics 201", dueDate: "2025-09-18", studentsPending: 3 },
  { id: 3, name: "Chemistry Quiz", class: "Chemistry 301", dueDate: "2025-09-20", studentsPending: 8 },
]

// Mock data for student grades with comments
const initialStudentGrades: StudentGrade[] = [
  { id: "1", studentName: "Alice Johnson", studentId: "STU001", assignment: "Mathematics Assignment 3", grade: "", maxPoints: 30, status: "submitted", comments: "" },
  { id: "2", studentName: "Bob Smith", studentId: "STU002", assignment: "Mathematics Assignment 3", grade: "", maxPoints: 30, status: "submitted", comments: "" },
  { id: "3", studentName: "Carol Davis", studentId: "STU003", assignment: "Mathematics Assignment 3", grade: "", maxPoints: 30, status: "submitted", comments: "" },
  { id: "4", studentName: "David Wilson", studentId: "STU004", assignment: "Mathematics Assignment 3", grade: "", maxPoints: 30, status: "submitted", comments: "" },
  { id: "5", studentName: "Eva Brown", studentId: "STU005", assignment: "Mathematics Assignment 3", grade: "", maxPoints: 30, status: "submitted", comments: "" },
]

export default function TeacherPendingGradesPage() {
  const [studentGrades, setStudentGrades] = useState<StudentGrade[]>(initialStudentGrades)
  const [searchTerm, setSearchTerm] = useState("")

  const handleDataChange = (updatedData: StudentGrade[]) => {
    setStudentGrades(updatedData)
  }

  const filteredAssignments = pendingAssignments.filter(assignment => 
    assignment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.class.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
                    <div className="mb-4">
                      <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Search assignments..." 
                          className="pl-8" 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader className="bg-muted">
                          <TableRow>
                            <TableHead className="text-primary">Assignment</TableHead>
                            <TableHead className="text-primary">Class</TableHead>
                            <TableHead className="text-primary">Due Date</TableHead>
                            <TableHead className="text-primary">Pending</TableHead>
                            <TableHead className="text-primary">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredAssignments.map((assignment) => (
                            <TableRow key={assignment.id} className="hover:bg-muted/50">
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
                    </div>
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
                    <GradeEntryTable 
                      data={studentGrades} 
                      includeComments={true} 
                      onDataChange={handleDataChange}
                    />

                    <div className="flex justify-between mt-6 pt-4 border-t">
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export Ungraded
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