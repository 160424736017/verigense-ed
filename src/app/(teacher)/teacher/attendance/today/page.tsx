"use client"

import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  Search, 
  User, 
  Users, 
  AlertCircle,
  Save,
  Filter
} from "lucide-react"
import { toast } from "sonner"

// Define types for our attendance data
type AttendanceStatus = "present" | "absent" | "late" | "excused"

interface Student {
  id: string
  name: string
  studentId: string
  rollNumber: string
}

interface AttendanceRecord {
  studentId: string
  status: AttendanceStatus
  remarks?: string
}

interface Class {
  id: string
  name: string
  time: string
  room: string
  students: number
}

// Mock data for classes
const mockClasses: Class[] = [
  { id: "1", name: "Mathematics 101", time: "9:00 AM - 10:30 AM", room: "Room 201", students: 24 },
  { id: "2", name: "Physics 201", time: "11:00 AM - 12:30 PM", room: "Lab 301", students: 18 },
  { id: "3", name: "Chemistry 301", time: "2:00 PM - 3:30 PM", room: "Lab 202", students: 22 },
]

// Mock data for students
const mockStudents: Student[] = [
  { id: "1", name: "Alice Johnson", studentId: "STU001", rollNumber: "01" },
  { id: "2", name: "Bob Smith", studentId: "STU002", rollNumber: "02" },
  { id: "3", name: "Carol Davis", studentId: "STU003", rollNumber: "03" },
  { id: "4", name: "David Wilson", studentId: "STU004", rollNumber: "04" },
  { id: "5", name: "Eva Brown", studentId: "STU005", rollNumber: "05" },
  { id: "6", name: "Frank Miller", studentId: "STU006", rollNumber: "06" },
  { id: "7", name: "Grace Lee", studentId: "STU007", rollNumber: "07" },
  { id: "8", name: "Henry Taylor", studentId: "STU008", rollNumber: "08" },
  { id: "9", name: "Ivy Chen", studentId: "STU009", rollNumber: "09" },
  { id: "10", name: "Jack Anderson", studentId: "STU010", rollNumber: "10" },
]

export default function TeacherTodayAttendancePage() {
  const [selectedClass, setSelectedClass] = useState<string>("1")
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, AttendanceStatus>>({})
  const [remarks, setRemarks] = useState<Record<string, string>>({})
  const [searchTerm, setSearchTerm] = useState("")

  // Get the currently selected class
  const currentClass = mockClasses.find(cls => cls.id === selectedClass) || mockClasses[0]

  // Filter students based on search term
  const filteredStudents = mockStudents.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.includes(searchTerm)
  )

  // Handle attendance status change
  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [studentId]: status
    }))
  }

  // Handle remarks change
  const handleRemarksChange = (studentId: string, remark: string) => {
    setRemarks(prev => ({
      ...prev,
      [studentId]: remark
    }))
  }

  // Save attendance
  const saveAttendance = () => {
    toast.success(`Attendance saved for ${currentClass.name} successfully!`)
    console.log("Attendance records:", attendanceRecords)
    console.log("Remarks:", remarks)
  }

  // Mark all as present
  const markAllPresent = () => {
    const newRecords: Record<string, AttendanceStatus> = {}
    mockStudents.forEach(student => {
      newRecords[student.id] = "present"
    })
    setAttendanceRecords(newRecords)
    toast.info("All students marked as present")
  }

  // Mark all as absent
  const markAllAbsent = () => {
    const newRecords: Record<string, AttendanceStatus> = {}
    mockStudents.forEach(student => {
      newRecords[student.id] = "absent"
    })
    setAttendanceRecords(newRecords)
    toast.info("All students marked as absent")
  }

  // Get status badge variant
  const getStatusVariant = (status: AttendanceStatus) => {
    switch (status) {
      case "present": return "default"
      case "absent": return "destructive"
      case "late": return "secondary"
      case "excused": return "outline"
      default: return "default"
    }
  }

  // Get status text
  const getStatusText = (status: AttendanceStatus) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="grid grid-cols-1 gap-6 px-4 lg:px-6">
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-2xl font-bold">Today&apos;s Attendance</h1>
                  <p className="text-muted-foreground">Manage attendance for your classes today</p>
                </div>

                {/* Class Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Select Class
                    </CardTitle>
                    <CardDescription>Choose a class to mark attendance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {mockClasses.map((classItem) => (
                        <Card 
                          key={classItem.id} 
                          className={`hover:bg-accent transition-colors cursor-pointer ${selectedClass === classItem.id ? 'border-primary' : ''}`}
                          onClick={() => setSelectedClass(classItem.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{classItem.name}</h3>
                                <p className="text-sm text-muted-foreground">{classItem.time} • {classItem.room}</p>
                              </div>
                              <Badge variant="secondary">{classItem.students} students</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Attendance Management */}
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          {currentClass.name} Attendance
                        </CardTitle>
                        <CardDescription>
                          Mark attendance for students in {currentClass.name} • {currentClass.time}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={markAllPresent}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Mark All Present
                        </Button>
                        <Button variant="outline" size="sm" onClick={markAllAbsent}>
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Mark All Absent
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Search and Filter */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="relative w-full sm:w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search students..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-1" />
                          Filter
                        </Button>
                      </div>
                    </div>

                    {/* Attendance Table */}
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader className="bg-muted">
                          <TableRow>
                            <TableHead className="text-primary w-16">Roll No</TableHead>
                            <TableHead className="text-primary">Student Name</TableHead>
                            <TableHead className="text-primary">Student ID</TableHead>
                            <TableHead className="text-primary">Status</TableHead>
                            <TableHead className="text-primary">Remarks</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredStudents.map((student) => (
                            <TableRow key={student.id} className="hover:bg-muted/50">
                              <TableCell className="font-medium">{student.rollNumber}</TableCell>
                              <TableCell className="font-medium">{student.name}</TableCell>
                              <TableCell>{student.studentId}</TableCell>
                              <TableCell>
                                <Select
                                  value={attendanceRecords[student.id] || "present"}
                                  onValueChange={(value: AttendanceStatus) => handleStatusChange(student.id, value)}
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="present">
                                      <div className="flex items-center">
                                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                        Present
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="absent">
                                      <div className="flex items-center">
                                        <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                                        Absent
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="late">
                                      <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                                        Late
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="excused">
                                      <div className="flex items-center">
                                        <User className="h-4 w-4 mr-2 text-blue-500" />
                                        Excused
                                      </div>
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input
                                  placeholder="Add remarks..."
                                  value={remarks[student.id] || ""}
                                  onChange={(e) => handleRemarksChange(student.id, e.target.value)}
                                  className="w-40"
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Summary */}
                    <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="default" className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Present: {Object.values(attendanceRecords).filter(s => s === "present").length || 0}
                          </Badge>
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Absent: {Object.values(attendanceRecords).filter(s => s === "absent").length || 0}
                          </Badge>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Late: {Object.values(attendanceRecords).filter(s => s === "late").length || 0}
                          </Badge>
                        </div>
                      </div>
                      <Button onClick={saveAttendance} className="w-full sm:w-auto">
                        <Save className="h-4 w-4 mr-2" />
                        Save Attendance
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