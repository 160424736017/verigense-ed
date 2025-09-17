"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const announcements = [
  {
    id: "ANN001",
    title: "School Holiday Notice",
    date: "2025-09-15",
    status: "New",
  },
  {
    id: "ANN002",
    title: "Parent-Teacher Meeting",
    date: "2025-09-20",
    status: "Upcoming",
  },
  {
    id: "ANN003",
    title: "Exam Schedule Published",
    date: "2025-09-10",
    status: "Published",
  },
  {
    id: "ANN004",
    title: "Sports Day Event",
    date: "2025-10-05",
    status: "Upcoming",
  },
  {
    id: "ANN005",
    title: "Library Closure",
    date: "2025-09-18",
    status: "Reminder",
  },
  {
    id: "ANN006",
    title: "New Uniform Policy",
    date: "2025-09-01",
    status: "Published",
  },
  {
    id: "ANN007",
    title: "Science Fair Registration",
    date: "2025-09-25",
    status: "Open",
  },
]

export function AnnouncementsWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Announcements</CardTitle>
        <CardDescription>Latest school announcements and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <Table>
            <TableCaption>A list of recent announcements.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {announcements.map((announcement) => (
                <TableRow key={announcement.id}>
                  <TableCell className="font-medium">{announcement.id}</TableCell>
                  <TableCell>{announcement.title}</TableCell>
                  <TableCell>{announcement.date}</TableCell>
                  <TableCell className="text-right">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${announcement.status === 'New' ? 'bg-blue-100 text-blue-800' : 
                        announcement.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-800' : 
                        announcement.status === 'Published' ? 'bg-green-100 text-green-800' : 
                        announcement.status === 'Reminder' ? 'bg-purple-100 text-purple-800' : 
                        'bg-gray-100 text-gray-800'}`}
                    >
                      {announcement.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total Announcements</TableCell>
                <TableCell className="text-right">{announcements.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}