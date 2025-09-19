"use client";

import { SiteHeader } from "@/components/site-header"
import Calendar31 from "@/components/calendar-31"
import { AnnouncementsWidget } from "@/components/announcements-widget"
import { AlertsNotificationsWidget } from "@/components/alerts-notifications-widget"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  CalendarClock,
  FileText,
  MessageSquare,
  TrendingUp,
  Bell,
  CheckCircle,
  Clock
} from "lucide-react"
import { Suspense, useState } from "react"
import { Loading } from "@/components/loading"
import AnimatedContent from "@/components/animated-content"
import ClickSpark from "@/components/ClickSpark"

// Mock data for teacher-specific information
const classData = [
  { id: 1, name: "Mathematics 101", time: "9:00 AM - 10:30 AM", students: 24, room: "Room 201" },
  { id: 2, name: "Physics 201", time: "11:00 AM - 12:30 PM", students: 18, room: "Lab 301" },
  { id: 3, name: "Chemistry 301", time: "2:00 PM - 3:30 PM", students: 22, room: "Lab 202" },
]

const recentActivities = [
  { id: 1, action: "Grades submitted", subject: "Mathematics Assignment 3", time: "2 hours ago", type: "success" },
  { id: 2, action: "Attendance marked", subject: "Physics class", time: "1 day ago", type: "info" },
  { id: 3, action: "New message", subject: "Parent meeting request", time: "1 day ago", type: "message" },
  { id: 4, action: "Materials uploaded", subject: "Chemistry lab notes", time: "2 days ago", type: "upload" },
]

const quickActions = [
  { title: "Mark Attendance", icon: <CalendarClock className="h-4 w-4" />, href: "/teacher/attendance/today", description: "Quick attendance entry" },
  { title: "Grade Assignments", icon: <TrendingUp className="h-4 w-4" />, href: "/teacher/grades/pending", description: "Enter student grades" },
  { title: "Upload Materials", icon: <FileText className="h-4 w-4" />, href: "/teacher/study-materials", description: "Share learning resources" },
  { title: "Send Message", icon: <MessageSquare className="h-4 w-4" />, href: "/teacher/messages", description: "Communicate with students" },
]

export default function TeacherDashboardPage() {

  return (
    <ClickSpark
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="flex flex-1 flex-col">
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Welcome Section */}
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
                <div className="px-4 lg:px-6">
                  <h1 className="text-2xl font-bold">Good Morning, Mr. Johnson</h1>
                  <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your classes today.</p>
                </div>
              </AnimatedContent>
              
              {/* Announcements and Alerts Section */}
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
                <div className="grid grid-cols-1 gap-6 px-4 lg:px-6">
                  {/* Announcements */}
                  <div className="flex">
                    <div className="w-full">
                      <AnnouncementsWidget />
                    </div>
                  </div>
                  
                  {/* Alerts & Notifications */}
                  <div className="flex">
                    <div className="w-full">
                      <AlertsNotificationsWidget />
                    </div>
                  </div>
                </div>
              </AnimatedContent>
              
              {/* Quick Actions */}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-6">
                  {quickActions.map((action, index) => (
                    <Card key={index} className="hover:bg-accent transition-colors">
                      <CardContent className="p-4">
                        <Button variant="ghost" className="w-full h-auto flex flex-col items-center justify-center gap-2 p-4" asChild>
                          <a href={action.href}>
                            {action.icon}
                            <span className="text-sm font-medium">{action.title}</span>
                            <span className="text-xs text-muted-foreground text-center">{action.description}</span>
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AnimatedContent>
              
              {/* Classes and Calendar */}
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 lg:px-6">
                  {/* Today&apos;s Classes */}
                  <div className="flex">
                    <div className="w-full">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Today&apos;s Classes
                          </CardTitle>
                          <CardDescription>Your schedule for today</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {classData.map((classItem) => (
                              <div key={classItem.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent">
                                <div>
                                  <h3 className="font-medium">{classItem.name}</h3>
                                  <p className="text-sm text-muted-foreground">{classItem.time} • {classItem.room}</p>
                                </div>
                                <Badge variant="secondary">{classItem.students} students</Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  {/* Calendar */}
                  <div className="flex">
                    <div className="w-full">
                      <Suspense fallback={<div className="h-80 flex items-center justify-center"><Loading /></div>}>
                        <Calendar31 />
                      </Suspense>
                    </div>
                  </div>
                </div>
              </AnimatedContent>
              
              {/* Recent Activities */}
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 lg:px-6">
                  {/* Recent Activities */}
                  <div className="flex">
                    <div className="w-full">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            Recent Activities
                          </CardTitle>
                          <CardDescription>Your latest actions</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {recentActivities.map((activity) => (
                              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border">
                                <div className="mt-1 rounded-full bg-primary/10 p-2">
                                  {activity.type === "success" && <CheckCircle className="h-4 w-4 text-green-500" />}
                                  {activity.type === "info" && <Bell className="h-4 w-4 text-blue-500" />}
                                  {activity.type === "message" && <MessageSquare className="h-4 w-4 text-purple-500" />}
                                  {activity.type === "upload" && <FileText className="h-4 w-4 text-orange-500" />}
                                </div>
                                <div>
                                  <p className="font-medium">{activity.action}</p>
                                  <p className="text-sm text-muted-foreground">{activity.subject}</p>
                                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </AnimatedContent>
            </div>
          </div>
        </div>
      </div>
    </ClickSpark>
  )
}