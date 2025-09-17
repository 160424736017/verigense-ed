"use client"

import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Search, 
  Users, 
  TrendingUp,
  FileText,
  CalendarClock,
  MessageSquare
} from "lucide-react"
import { useState } from "react"

// Define types for our class data
interface Class {
  id: string
  name: string
  code: string
  time: string
  room: string
  students: number
  schedule: string
}

interface ClassActivity {
  id: string
  className: string
  activity: string
  date: string
  status: "completed" | "pending" | "upcoming"
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
    schedule: "Mon, Wed, Fri"
  },
  { 
    id: "2", 
    name: "Physics 201", 
    code: "PHYS201", 
    time: "11:00 AM - 12:30 PM", 
    room: "Lab 301", 
    students: 18,
    schedule: "Tue, Thu"
  },
  { 
    id: "3", 
    name: "Chemistry 301", 
    code: "CHEM301", 
    time: "2:00 PM - 3:30 PM", 
    room: "Lab 202", 
    students: 22,
    schedule: "Mon, Wed, Fri"
  },
  { 
    id: "4", 
    name: "Biology 101", 
    code: "BIOL101", 
    time: "10:00 AM - 11:30 AM", 
    room: "Lab 101", 
    students: 20,
    schedule: "Tue, Thu"
  },
  { 
    id: "5", 
    name: "Computer Science 201", 
    code: "CS201", 
    time: "3:00 PM - 4:30 PM", 
    room: "Computer Lab", 
    students: 15,
    schedule: "Mon, Wed, Fri"
  },
]

// Mock data for recent activities
const recentActivities: ClassActivity[] = [
  { id: "1", className: "Mathematics 101", activity: "Assignment 3 grades submitted", date: "2 hours ago", status: "completed" },
  { id: "2", className: "Physics 201", activity: "Attendance marked for today", date: "1 day ago", status: "completed" },
  { id: "3", className: "Chemistry 301", activity: "Lab materials uploaded", date: "2 days ago", status: "completed" },
  { id: "4", className: "Biology 101", activity: "Midterm exam scheduled", date: "3 days ago", status: "upcoming" },
]

export default function TeacherClassesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter classes based on search term
  const filteredClasses = mockClasses.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.room.toLowerCase().includes(searchTerm.toLowerCase())
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
                  <h1 className="text-2xl font-bold">My Classes</h1>
                  <p className="text-muted-foreground">View and manage all your classes</p>
                </div>

                {/* Search and Filter */}
                <Card>
                  <CardHeader>
                    <CardTitle>Class Management</CardTitle>
                    <CardDescription>Search and filter your classes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative w-full sm:w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search classes..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      <Button variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        Filter by Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Classes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredClasses.map((classItem) => (
                    <Card key={classItem.id} className="hover:bg-accent transition-colors">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{classItem.name}</CardTitle>
                            <CardDescription>{classItem.code}</CardDescription>
                          </div>
                          <Badge variant="secondary">{classItem.students} students</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center text-sm">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{classItem.time}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{classItem.schedule}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{classItem.room}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" className="text-xs" asChild>
                            <a href={`/teacher/classes/${classItem.id}/attendance`}>
                              <CalendarClock className="mr-1 h-3 w-3" />
                              Attendance
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs" asChild>
                            <a href={`/teacher/classes/${classItem.id}/grades`}>
                              <TrendingUp className="mr-1 h-3 w-3" />
                              Grades
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs" asChild>
                            <a href={`/teacher/classes/${classItem.id}/materials`}>
                              <FileText className="mr-1 h-3 w-3" />
                              Materials
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recent Activities and Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activities */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Recent Activities
                      </CardTitle>
                      <CardDescription>Latest updates from your classes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.map((activity) => (
                          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border">
                            <div className="mt-1 rounded-full bg-primary/10 p-2">
                              {activity.status === "completed" && <TrendingUp className="h-4 w-4 text-green-500" />}
                              {activity.status === "pending" && <Clock className="h-4 w-4 text-yellow-500" />}
                              {activity.status === "upcoming" && <Calendar className="h-4 w-4 text-blue-500" />}
                            </div>
                            <div>
                              <p className="font-medium">{activity.activity}</p>
                              <p className="text-sm text-muted-foreground">{activity.className}</p>
                              <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Quick Actions
                      </CardTitle>
                      <CardDescription>Common tasks for your classes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
                          <a href="/teacher/attendance/today">
                            <CalendarClock className="h-5 w-5" />
                            <span>Mark Attendance</span>
                            <span className="text-xs text-muted-foreground">Quick entry for today</span>
                          </a>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
                          <a href="/teacher/grades/pending">
                            <TrendingUp className="h-5 w-5" />
                            <span>Grade Assignments</span>
                            <span className="text-xs text-muted-foreground">Pending submissions</span>
                          </a>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
                          <a href="/teacher/study-materials">
                            <FileText className="h-5 w-5" />
                            <span>Upload Materials</span>
                            <span className="text-xs text-muted-foreground">Share resources</span>
                          </a>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
                          <a href="/teacher/messages">
                            <MessageSquare className="h-5 w-5" />
                            <span>Send Message</span>
                            <span className="text-xs text-muted-foreground">To students</span>
                          </a>
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
    </div>
  )
}