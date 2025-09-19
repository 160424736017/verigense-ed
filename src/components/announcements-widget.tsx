"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell } from "lucide-react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"

const announcements = [
  {
    id: "ANN001",
    title: "School Holiday Notice",
    date: "2025-09-15",
    status: "New",
    content: "The school will be closed on October 2nd for the annual staff training and development program. All classes are suspended for the day. Please make arrangements accordingly for any scheduled activities or exams."
  },
  {
    id: "ANN002",
    title: "Parent-Teacher Meeting",
    date: "2025-09-20",
    status: "Upcoming",
    content: "The quarterly parent-teacher meeting is scheduled for September 25th from 2:00 PM to 5:00 PM in the main auditorium. All teachers are requested to be present with relevant student progress reports and assessment data."
  },
  {
    id: "ANN003",
    title: "Exam Schedule Published",
    date: "2025-09-10",
    status: "Published",
    content: "The mid-term examination schedule has been published on the student portal. Please review the dates and ensure your students are aware of the schedule. Any conflicts should be reported to the examination department immediately."
  },
  {
    id: "ANN004",
    title: "Sports Day Event",
    date: "2025-10-05",
    status: "Upcoming",
    content: "Our annual Sports Day is scheduled for October 15th. Students are encouraged to participate in various events. Registration forms are available in the sports department. Last date for registration is October 10th."
  },
  {
    id: "ANN005",
    title: "Library Closure",
    date: "2025-09-18",
    status: "Reminder",
    content: "The school library will be closed for maintenance from September 20th to September 22nd. All borrowed books must be returned by September 19th. Digital resources will remain accessible during this period."
  },
  {
    id: "ANN006",
    title: "New Uniform Policy",
    date: "2025-09-01",
    status: "Published",
    content: "A new uniform policy has been implemented starting this academic year. Please review the updated guidelines on the school website. Students are expected to comply with the new dress code from September 15th onwards."
  },
  {
    id: "ANN007",
    title: "Science Fair Registration",
    date: "2025-09-25",
    status: "Open",
    content: "Registration for the annual Science Fair is now open. Students from grades 6-12 can participate. Project submissions are due by November 1st. Registration forms and guidelines are available on the school portal."
  },
]

export function AnnouncementsWidget() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [openAnnouncements, setOpenAnnouncements] = useState<Record<string, boolean>>({})

  const toggleAnnouncement = (id: string) => {
    setOpenAnnouncements(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent cursor-pointer">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" />
              <span className="font-medium">Announcements</span>
            </div>
          </div>
          <Badge variant="secondary" className="ml-2 text-xs px-1.5 py-0.5">7 new</Badge>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 space-y-2">
        {announcements.map((announcement) => (
          <Collapsible 
            key={announcement.id} 
            open={openAnnouncements[announcement.id] || false}
            onOpenChange={() => toggleAnnouncement(announcement.id)}
          >
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent cursor-pointer">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                  >
                    {openAnnouncements[announcement.id] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  <div>
                    <h3 className="font-medium text-left">{announcement.title}</h3>
                    <p className="text-sm text-muted-foreground text-left">{announcement.date}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                  ${announcement.status === 'New' ? 'bg-blue-100 text-blue-800' : 
                    announcement.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-800' : 
                    announcement.status === 'Published' ? 'bg-green-100 text-green-800' : 
                    announcement.status === 'Reminder' ? 'bg-purple-100 text-purple-800' : 
                    'bg-gray-100 text-gray-800'}`}
                >
                  {announcement.status}
                </span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="rounded-lg border border-t-0 p-3 mt-1 text-sm">
              {announcement.content}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}