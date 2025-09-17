"use client"

import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Calendar, 
  Clock, 
  Search, 
  PlusCircle, 
  Edit, 
  Trash2, 
  CheckCircle,
  AlertCircle,
  User,
  BookOpen
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

// Define types for our substitution data
interface Substitution {
  id: string
  date: string
  originalTeacher: string
  substituteTeacher: string
  class: string
  subject: string
  timeSlot: string
  status: "pending" | "approved" | "rejected"
  reason: string
}

interface Teacher {
  id: string
  name: string
}

interface Class {
  id: string
  name: string
}

// Mock data for substitutions
const mockSubstitutions: Substitution[] = [
  {
    id: "1",
    date: "2025-09-20",
    originalTeacher: "Mr. Johnson",
    substituteTeacher: "Ms. Davis",
    class: "Mathematics 101",
    subject: "Algebra",
    timeSlot: "9:00 AM - 10:30 AM",
    status: "approved",
    reason: "Conference attendance"
  },
  {
    id: "2",
    date: "2025-09-22",
    originalTeacher: "Mr. Johnson",
    substituteTeacher: "Mr. Wilson",
    class: "Physics 201",
    subject: "Mechanics",
    timeSlot: "11:00 AM - 12:30 PM",
    status: "pending",
    reason: "Medical appointment"
  },
  {
    id: "3",
    date: "2025-09-25",
    originalTeacher: "Mr. Johnson",
    substituteTeacher: "",
    class: "Chemistry 301",
    subject: "Organic Chemistry",
    timeSlot: "2:00 PM - 3:30 PM",
    status: "pending",
    reason: "Personal leave"
  },
  {
    id: "4",
    date: "2025-09-18",
    originalTeacher: "Mr. Johnson",
    substituteTeacher: "Ms. Brown",
    class: "Mathematics 101",
    subject: "Calculus",
    timeSlot: "9:00 AM - 10:30 AM",
    status: "approved",
    reason: "Workshop"
  }
]

// Mock data for teachers
const mockTeachers: Teacher[] = [
  { id: "1", name: "Ms. Davis" },
  { id: "2", name: "Mr. Wilson" },
  { id: "3", name: "Ms. Brown" },
  { id: "4", name: "Dr. Smith" },
  { id: "5", name: "Mr. Taylor" }
]

// Mock data for classes
const mockClasses: Class[] = [
  { id: "1", name: "Mathematics 101" },
  { id: "2", name: "Physics 201" },
  { id: "3", name: "Chemistry 301" },
  { id: "4", name: "Biology 101" }
]

export default function TeacherSubstitutionsPage() {
  const [substitutions, setSubstitutions] = useState<Substitution[]>(mockSubstitutions)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter substitutions based on search term and filters
  const filteredSubstitutions = substitutions.filter(sub => {
    const matchesSearch = 
      sub.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.substituteTeacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.reason.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDate = dateFilter === "all" || sub.date.includes(dateFilter)
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter
    
    return matchesSearch && matchesDate && matchesStatus
  })

  // Handle request substitution
  const handleRequestSubstitution = () => {
    toast.info("Substitution request form would open here")
    // In a real implementation, this would open a modal or navigate to a form
  }

  // Handle edit substitution
  const handleEditSubstitution = (id: string) => {
    toast.info(`Edit substitution ${id}`)
    // In a real implementation, this would open an edit form
  }

  // Handle delete substitution
  const handleDeleteSubstitution = (id: string) => {
    setSubstitutions(prev => prev.filter(sub => sub.id !== id))
    toast.success("Substitution request deleted")
  }

  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "approved": return "default"
      case "pending": return "secondary"
      case "rejected": return "destructive"
      default: return "default"
    }
  }

  // Get status text
  const getStatusText = (status: string) => {
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
                  <h1 className="text-2xl font-bold">Substitutions</h1>
                  <p className="text-muted-foreground">Manage class substitution requests</p>
                </div>

                {/* Request Substitution Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PlusCircle className="h-5 w-5" />
                      Request Substitution
                    </CardTitle>
                    <CardDescription>Submit a new substitution request</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
                        <div>
                          <Label htmlFor="date">Date</Label>
                          <Input id="date" type="date" />
                        </div>
                        <div>
                          <Label htmlFor="class">Class</Label>
                          <Select>
                            <SelectTrigger id="class">
                              <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                            <SelectContent>
                              {mockClasses.map(classItem => (
                                <SelectItem key={classItem.id} value={classItem.id}>
                                  {classItem.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="time">Time Slot</Label>
                          <Select>
                            <SelectTrigger id="time">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="9:00 AM - 10:30 AM">9:00 AM - 10:30 AM</SelectItem>
                              <SelectItem value="11:00 AM - 12:30 PM">11:00 AM - 12:30 PM</SelectItem>
                              <SelectItem value="2:00 PM - 3:30 PM">2:00 PM - 3:30 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="reason">Reason</Label>
                          <Select>
                            <SelectTrigger id="reason">
                              <SelectValue placeholder="Select reason" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="medical">Medical Appointment</SelectItem>
                              <SelectItem value="conference">Conference/Workshop</SelectItem>
                              <SelectItem value="personal">Personal Leave</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex items-end">
                        <Button onClick={handleRequestSubstitution} className="w-full sm:w-auto">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Request Substitution
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Filters and Search */}
                <Card>
                  <CardHeader>
                    <CardTitle>Substitution Requests</CardTitle>
                    <CardDescription>View and manage your substitution requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="relative w-full sm:w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search substitutions..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 flex-1">
                        <Select value={dateFilter} onValueChange={setDateFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Filter by date" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Dates</SelectItem>
                            <SelectItem value="2025-09">September 2025</SelectItem>
                            <SelectItem value="2025-10">October 2025</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Substitutions Table */}
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader className="bg-muted">
                          <TableRow>
                            <TableHead className="text-primary">Date</TableHead>
                            <TableHead className="text-primary">Class</TableHead>
                            <TableHead className="text-primary">Subject</TableHead>
                            <TableHead className="text-primary">Time Slot</TableHead>
                            <TableHead className="text-primary">Substitute</TableHead>
                            <TableHead className="text-primary">Reason</TableHead>
                            <TableHead className="text-primary">Status</TableHead>
                            <TableHead className="text-primary">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredSubstitutions.map((substitution) => (
                            <TableRow key={substitution.id} className="hover:bg-muted/50">
                              <TableCell className="font-medium">{substitution.date}</TableCell>
                              <TableCell>{substitution.class}</TableCell>
                              <TableCell>{substitution.subject}</TableCell>
                              <TableCell>{substitution.timeSlot}</TableCell>
                              <TableCell>
                                {substitution.substituteTeacher || (
                                  <span className="text-muted-foreground">Not assigned</span>
                                )}
                              </TableCell>
                              <TableCell>{substitution.reason}</TableCell>
                              <TableCell>
                                <Badge variant={getStatusVariant(substitution.status)}>
                                  {getStatusText(substitution.status)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => handleEditSubstitution(substitution.id)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => handleDeleteSubstitution(substitution.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {filteredSubstitutions.length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No substitutions found matching your criteria</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Upcoming Substitutions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Upcoming Substitutions
                    </CardTitle>
                    <CardDescription>Approved substitutions in the next week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {substitutions
                        .filter(sub => sub.status === "approved" && new Date(sub.date) > new Date())
                        .slice(0, 3)
                        .map((substitution) => (
                          <div key={substitution.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="rounded-full bg-primary/10 p-2">
                                <Calendar className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">{substitution.class} - {substitution.subject}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {substitution.date} • {substitution.timeSlot}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-sm font-medium">{substitution.substituteTeacher}</p>
                                <p className="text-xs text-muted-foreground">Substitute Teacher</p>
                              </div>
                              <Badge variant="default">Approved</Badge>
                            </div>
                          </div>
                        ))}
                      
                      {substitutions.filter(sub => sub.status === "approved" && new Date(sub.date) > new Date()).length === 0 && (
                        <div className="text-center py-4">
                          <p className="text-muted-foreground">No upcoming substitutions</p>
                        </div>
                      )}
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