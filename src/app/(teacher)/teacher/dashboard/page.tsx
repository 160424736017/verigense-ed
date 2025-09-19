"use client";

import { SiteHeader } from "@/components/site-header"
import Calendar31 from "@/components/calendar-31"
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
import { AnnouncementsWidget } from "@/components/announcements-widget"
import { AlertsNotificationsWidget } from "@/components/alerts-notifications-widget"

// Mock data for teacher-specific information
const classData = [
  { id: 1, name: "Mathematics 101", time: "9:00 AM - 10:30 AM", students: 24, room: "Room 201" },
  { id: 2, name: "Physics 201", time: "11:00 AM - 12:30 PM", students: 18, room: "Lab 301" },
  { id: 3, name: "Chemistry 301", time: "2:00 PM - 3:30 PM", students: 22, room: "Lab 202" },
]

export default function TeacherDashboardPage() {
  const [activeCollapsible, setActiveCollapsible] = useState<string | null>(null)

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
                      <AnnouncementsWidget 
                        activeCollapsible={activeCollapsible} 
                        setActiveCollapsible={setActiveCollapsible} 
                        id="announcements" 
                      />
                    </div>
                  </div>
                  
                  {/* Alerts & Notifications */}
                  <div className="flex">
                    <div className="w-full">
                      <AlertsNotificationsWidget 
                        activeCollapsible={activeCollapsible} 
                        setActiveCollapsible={setActiveCollapsible} 
                        id="alerts" 
                      />
                    </div>
                  </div>
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
                <div className="grid grid-cols-1 gap-6 px-4 lg:px-6">
                  {/* Calendar with integrated class schedule */}
                  <div className="flex">
                    <div className="w-full">
                      <Suspense fallback={<div className="h-80 flex items-center justify-center"><Loading /></div>}>
                        <Calendar31 />
                      </Suspense>
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