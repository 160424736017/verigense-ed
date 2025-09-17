"use client"

import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Users, 
  TrendingUp,
  FileText,
  CalendarClock,
  MessageSquare,
  BarChart3,
  Bell,
  AlertCircle
} from "lucide-react"

// Define types for our class data
interface Class {
  id: string
  name: string
  code: string
  time: string
  room: string
  students: number
  schedule: string
  description: string
}

interface ClassActivity {
  id: string
  activity: string
  date: string
  status: "completed" | "pending" | "upcoming"
}

interface Student {
  id: string
  name: string
  studentId: string
  rollNumber: string
  attendance: number
  grade: string
}

// Mock data for classes
const mockClasses: Class[] = [
  { 
    id: "1", 
    name: "Mathematics 101", 
    code: "MATH101", 
    time: "9:00 AM - 10:30 AM", 
    room: "Room 201", 
    students: 24,
    schedule: "Mon, Wed, Fri",
    description: "Introduction to calculus and algebra fundamentals"
  },
  { 
    id: "2", 
    name: "Physics 201", 
    code: "PHYS201", 
    time: "11:00 AM - 12:30 PM", 
    room: "Lab 301", 
    students: 18,
    schedule: "Tue, Thu",
    description: "Mechanics and thermodynamics principles"
  },
  { 
    id: "3", 
    name: "Chemistry 301", 
    code: "CHEM301", 
    time: "2:00 PM - 3:30 PM", 
    room: "Lab 202", 
    students: 22,
    schedule: "Mon, Wed, Fri",
    description: "Organic and inorganic chemistry concepts"
  },
]

// Mock data for recent activities
const recentActivities: ClassActivity[] = [
  { id: "1", activity: "Assignment 3 grades submitted", date: "2 hours ago", status: "completed" },
  { id: "2", activity: "Attendance marked for today", date: "1 day ago", status: "completed" },
  { id: "3", activity: "Lab materials uploaded", date: "2 days ago", status: "completed" },
  { id: "4", activity: "Midterm exam scheduled", date: "3 days ago", status: "upcoming" },
]

// Mock data for students
const mockStudents: Student[] = [
  { id: "1", name: "Alice Johnson", studentId: "STU001", rollNumber: "01", attendance: 95, grade: "A" },
  { id: "2", name: "Bob Smith", studentId: "STU002", rollNumber: "02", attendance: 87, grade: "B+" },
  { id: "3", name: "Carol Davis", studentId: "STU003", rollNumber: "03", attendance: 92, grade: "A-" },
  { id: "4", name: "David Wilson", studentId: "STU004", rollNumber: "04", attendance: 78, grade: "B" },
  { id: "5", name: "Eva Brown", studentId: "STU005", rollNumber: "05", attendance: 88, grade: "B+" },
]

export default function TeacherClassDetailPage({
  params,
}: {
  params: { classId: string }
}) {
  // Find the class based on the ID
  const classItem = mockClasses.find(cls => cls.id === params.classId) || mockClasses[0]

  // Get students for this class (in a real app, this would be filtered by class)
  const classStudents = mockStudents

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="grid grid-cols-1 gap-6 px-4 lg:px-6">
              <div className="flex flex-col gap-6">
                {/* Class Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold">{classItem.name}</h1>
                    <p className="text-muted-foreground">{classItem.code} • {classItem.description}</p>
                  </div>
                  <Badge variant="secondary" className="w-fit">
                    {classItem.students} students enrolled
                  </Badge>
                </div>

                {/* Class Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Time</p>
                          <p className="font-medium">{classItem.time}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Schedule</p>
                          <p className="font-medium">{classItem.schedule}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Location</p>
                          <p className="font-medium">{classItem.room}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Students</p>
                          <p className="font-medium">{classItem.students}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Class Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Class Management</CardTitle>
                    <CardDescription>Quick access to class-related tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
                        <a href={`/teacher/classes/${params.classId}/attendance`}>
                          <CalendarClock className="h-5 w-5" />
                          <span>Attendance</span>
                        </a>
                      </Button>
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
                        <a href={`/teacher/classes/${params.classId}/grades`}>
                          <TrendingUp className="h-5 w-5" />
                          <span>Grades</span>
                        </a>
                      </Button>
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
                        <a href={`/teacher/classes/${params.classId}/materials`}>
                          <FileText className="h-5 w-5" />
                          <span>Materials</span>
                        </a>
                      </Button>
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
                        <a href={`/teacher/classes/${params.classId}/students`}>
                          <Users className="h-5 w-5" />
                          <span>Students</span>
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Class Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Student Performance Summary */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Student Performance
                      </CardTitle>
                      <CardDescription>Overview of student grades and attendance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Average Grade</span>
                          <span className="font-medium">B+</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average Attendance</span>
                          <span className="font-medium">88%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Students at Risk</span>
                          <span className="font-medium">2</span>
                        </div>
                      </div>
                      
                      <div className="mt-6 h-[200px] flex items-center justify-center bg-muted/50 rounded-lg">
                        <p className="text-muted-foreground">Performance chart will be implemented here</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activities */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Recent Activities
                      </CardTitle>
                      <CardDescription>Latest updates for this class</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.map((activity) => (
                          <div key={activity.id} className="flex items-start gap-3">
                            <div className="mt-1">
                              {activity.status === "completed" && <div className="h-2 w-2 rounded-full bg-green-500"></div>}
                              {activity.status === "pending" && <div className="h-2 w-2 rounded-full bg-yellow-500"></div>}
                              {activity.status === "upcoming" && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{activity.activity}</p>
                              <p className="text-xs text-muted-foreground">{activity.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Top Students */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Top Performing Students
                    </CardTitle>
                    <CardDescription>Students with highest grades in this class</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {classStudents
                        .sort((a, b) => b.attendance - a.attendance)
                        .slice(0, 5)
                        .map((student, index) => (
                          <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                <span className="text-sm font-medium">{index + 1}</span>
                              </div>
                              <div>
                                <p className="font-medium">{student.name}</p>
                                <p className="text-sm text-muted-foreground">Roll #{student.rollNumber}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-center">
                                <p className="text-sm text-muted-foreground">Attendance</p>
                                <p className="font-medium">{student.attendance}%</p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm text-muted-foreground">Grade</p>
                                <p className="font-medium">{student.grade}</p>
                              </div>
                            </div>
                          </div>
                        ))}
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