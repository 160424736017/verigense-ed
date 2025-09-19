"use client"

import * as React from "react"
import { formatDateRange } from "little-date"
import { PlusIcon, Clock, CalendarClock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

// Define types for our data
type ClassItem = {
  id: number
  name: string
  time: string
  students: number
  room: string
  date: string
  type: 'class'
}

type EventItem = {
  title: string
  from: string
  to: string
  type: 'event'
}

type ScheduleItem = ClassItem | EventItem

// Mock data for events
const events: EventItem[] = [
  {
    title: "Team Sync Meeting",
    from: "2025-06-12T09:00:00",
    to: "2025-06-12T10:00:00",
    type: "event"
  },
  {
    title: "Design Review",
    from: "2025-06-12T11:30:00",
    to: "2025-06-12T12:30:00",
    type: "event"
  },
  {
    title: "Client Presentation",
    from: "2025-06-12T14:00:00",
    to: "2025-06-12T15:00:00",
    type: "event"
  },
]

// Mock data for classes - in a real app, this would come from an API
const classData: ClassItem[] = [
  { id: 1, name: "Mathematics 101", time: "9:00 AM - 10:30 AM", students: 24, room: "Room 201", date: "2025-06-12", type: "class" },
  { id: 2, name: "Physics 201", time: "11:00 AM - 12:30 PM", students: 18, room: "Lab 301", date: "2025-06-12", type: "class" },
  { id: 3, name: "Chemistry 301", time: "2:00 PM - 3:30 PM", students: 22, room: "Lab 202", date: "2025-06-12", type: "class" },
  { id: 4, name: "Biology 101", time: "10:00 AM - 11:30 AM", students: 20, room: "Lab 101", date: "2025-06-13", type: "class" },
  { id: 5, name: "English Literature", time: "1:00 PM - 2:30 PM", students: 25, room: "Room 305", date: "2025-06-13", type: "class" },
]

export default function Calendar31() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 5, 12)
  )

  // Filter classes for the selected date
  const getClassesForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return []
    
    // Format the selected date to match our data format (YYYY-MM-DD)
    const formattedDate = selectedDate.toISOString().split('T')[0]
    
    // Filter classes for the selected date
    return classData.filter(classItem => classItem.date === formattedDate)
  }

  // Get items for the selected date (both classes and events)
  const getItemsForDate = (selectedDate: Date | undefined) => {
    const classes = getClassesForDate(selectedDate)
    const currentDateEvents = events.filter(event => {
      const eventDate = new Date(event.from).toISOString().split('T')[0]
      const selectedDateStr = selectedDate?.toISOString().split('T')[0]
      return eventDate === selectedDateStr
    })
    
    // Combine and sort by time
    const allItems: ScheduleItem[] = [...classes, ...currentDateEvents]
    
    // Sort by time (simplified sorting based on time string)
    return allItems.sort((a, b) => {
      let timeA: string
      let timeB: string
      
      if (a.type === 'class') {
        timeA = (a as ClassItem).time
      } else {
        timeA = new Date((a as EventItem).from).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      
      if (b.type === 'class') {
        timeB = (b as ClassItem).time
      } else {
        timeB = new Date((b as EventItem).from).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      
      return timeA.localeCompare(timeB)
    })
  }

  const todaysItems = getItemsForDate(date)
  console.log("Today's items:", todaysItems)

  // Helper function to get display properties for each item
  const getItemDisplayProps = (item: ScheduleItem) => {
    if (item.type === 'class') {
      const classItem = item as ClassItem
      return {
        title: classItem.name,
        time: classItem.time,
        location: classItem.room,
        icon: <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
        badge: <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-700">{classItem.students} students</Badge>,
        containerClass: "border border-blue-200 bg-blue-50 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/20 dark:hover:bg-blue-900/30"
      }
    } else {
      const eventItem = item as EventItem
      return {
        title: eventItem.title,
        time: formatDateRange(new Date(eventItem.from), new Date(eventItem.to)),
        location: "General",
        icon: <CalendarClock className="h-4 w-4 text-green-600 dark:text-green-400" />,
        badge: null,
        containerClass: "border border-green-200 bg-green-50 hover:bg-green-100 dark:border-green-800 dark:bg-green-950/20 dark:hover:bg-green-900/30"
      }
    }
  }

  return (
    <Card className="w-full py-4">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="px-4 md:w-5/12">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="bg-transparent p-0 w-full"
              required
            />
          </div>
          <div className="flex flex-col items-start border-t md:border-t-0 md:border-l md:pl-4 pt-4 md:pt-0 px-4 md:w-7/12">
            <div className="flex w-full items-center justify-between px-1">
              <div className="text-sm font-medium">
                {date?.toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-6"
                title="Add Event"
              >
                <PlusIcon />
                <span className="sr-only">Add Event</span>
              </Button>
            </div>
            
            {/* Combined Schedule for Selected Date */}
            <div className="w-full mt-3 flex flex-col flex-1">
              <h3 className="text-sm font-medium mb-2">Schedule</h3>
              <div className="flex-1 w-full">
                <ScrollArea className="h-[300px] w-full">
                  {todaysItems.length > 0 ? (
                    <div className="space-y-2 pr-4">
                      {todaysItems.map((item, index) => {
                        const displayProps = getItemDisplayProps(item)
                        return (
                          <div 
                            key={index} 
                            className={`flex items-center justify-between p-3 border rounded-lg ${displayProps.containerClass}`}
                          >
                            <div className="flex items-center gap-3">
                              {displayProps.icon}
                              <div>
                                <h4 className="font-medium text-sm">{displayProps.title}</h4>
                                <p className="text-xs text-muted-foreground">
                                  {displayProps.time} • {displayProps.location}
                                </p>
                              </div>
                            </div>
                            {displayProps.badge}
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="px-1 py-2">
                      <p className="text-sm text-muted-foreground">No schedule for this date.</p>
                    </div>
                  )}
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}