"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, AlertCircle, CheckCircle, Info } from "lucide-react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"

const alerts = [
  {
    id: "ALT001",
    title: "Timetable Change",
    date: "2025-09-19",
    type: "info",
    content: "Physics class (Period 3) has been moved to Lab 301 due to equipment maintenance in the regular classroom."
  },
  {
    id: "ALT002",
    title: "Pending Grades",
    date: "2025-09-18",
    type: "warning",
    content: "Chemistry Assignment 2 grades are pending submission. Please submit by end of day tomorrow."
  },
  {
    id: "ALT003",
    title: "Substitution Approved",
    date: "2025-09-17",
    type: "success",
    content: "Your substitution request for tomorrow's Mathematics class has been approved."
  },
  {
    id: "ALT004",
    title: "Meeting Reminder",
    date: "2025-09-16",
    type: "info",
    content: "Faculty meeting scheduled for today at 3:30 PM in the conference hall. Agenda includes curriculum updates."
  },
  {
    id: "ALT005",
    title: "System Maintenance",
    date: "2025-09-15",
    type: "warning",
    content: "The student portal will be down for maintenance from 10 PM to 12 AM tonight. Plan accordingly."
  },
  {
    id: "ALT006",
    title: "New Policy Update",
    date: "2025-09-14",
    type: "info",
    content: "Updated attendance policy is now in effect. Please review the new guidelines on the staff portal."
  },
  {
    id: "ALT007",
    title: "Resource Access",
    date: "2025-09-13",
    type: "success",
    content: "Digital library resources have been updated. New educational videos are now available for all subjects."
  },
]

export function AlertsNotificationsWidget() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [openAlerts, setOpenAlerts] = useState<Record<string, boolean>>({})

  const toggleAlert = (id: string) => {
    setOpenAlerts(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'info': return <Info className="h-4 w-4 text-blue-500" />
      default: return <Bell className="h-4 w-4 text-primary" />
    }
  }

  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'success': return 'bg-green-100 text-green-800'
      case 'info': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
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
              <span className="font-medium">Alerts & Notifications</span>
            </div>
          </div>
          <Badge variant="secondary" className="ml-2 text-xs px-1.5 py-0.5">7 new</Badge>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 space-y-2">
        {alerts.map((alert) => (
          <Collapsible 
            key={alert.id} 
            open={openAlerts[alert.id] || false}
            onOpenChange={() => toggleAlert(alert.id)}
          >
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent cursor-pointer">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                  >
                    {openAlerts[alert.id] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  <div className="flex items-center gap-2">
                    {getIcon(alert.type)}
                    <div>
                      <h3 className="font-medium text-left">{alert.title}</h3>
                      <p className="text-sm text-muted-foreground text-left">{alert.date}</p>
                    </div>
                  </div>
                </div>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getTypeBadgeClass(alert.type)}`}>
                  {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                </span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="rounded-lg border border-t-0 p-3 mt-1 text-sm">
              {alert.content}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}