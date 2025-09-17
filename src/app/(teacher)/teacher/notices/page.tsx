"use client"

import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { 
  Search, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Bell,
  Calendar,
  Eye
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

// Define types for our notice data
interface Notice {
  id: string
  title: string
  content: string
  date: string
  priority: "low" | "medium" | "high"
  status: "draft" | "published" | "archived"
  audience: "all" | "specific-class" | "specific-students"
  classId?: string
  author: string
  views: number
}

interface Class {
  id: string
  name: string
}

// Mock data for notices
const mockNotices: Notice[] = [
  {
    id: "1",
    title: "Mid-term Examination Schedule",
    content: "Please note that the mid-term examinations will be held from October 15th to October 20th. Students are advised to check their individual schedules.",
    date: "2025-09-15",
    priority: "high",
    status: "published",
    audience: "all",
    author: "Mr. Johnson",
    views: 124
  },
  {
    id: "2",
    title: "Science Fair Participation",
    content: "We are inviting students from grades 9-12 to participate in the annual Science Fair. Registration closes on September 30th.",
    date: "2025-09-10",
    priority: "medium",
    status: "published",
    audience: "specific-class",
    classId: "2",
    author: "Mr. Johnson",
    views: 87
  },
  {
    id: "3",
    title: "Parent-Teacher Meeting",
    content: "The quarterly parent-teacher meeting is scheduled for October 5th from 3:00 PM to 6:00 PM in the main auditorium.",
    date: "2025-09-05",
    priority: "high",
    status: "published",
    audience: "all",
    author: "Mr. Johnson",
    views: 156
  },
  {
    id: "4",
    title: "New Assignment Guidelines",
    content: "Please review the updated assignment submission guidelines that were distributed last week. All future submissions must follow these guidelines.",
    date: "2025-09-01",
    priority: "low",
    status: "published",
    audience: "specific-class",
    classId: "1",
    author: "Mr. Johnson",
    views: 63
  },
  {
    id: "5",
    title: "Library Closure Notice",
    content: "The school library will be closed for maintenance from September 20th to September 25th. Digital resources will remain accessible.",
    date: "2025-08-28",
    priority: "medium",
    status: "archived",
    audience: "all",
    author: "Mr. Johnson",
    views: 201
  }
]

// Mock data for classes
const mockClasses: Class[] = [
  { id: "1", name: "Mathematics 101" },
  { id: "2", name: "Physics 201" },
  { id: "3", name: "Chemistry 301" },
  { id: "4", name: "Biology 101" }
]

export default function TeacherNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>(mockNotices)
  const [searchTerm, setSearchTerm] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null)

  // Form state
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
  const [audience, setAudience] = useState<"all" | "specific-class" | "specific-students">("all")
  const [classId, setClassId] = useState("")

  // Filter notices based on search term and filters
  const filteredNotices = notices.filter(notice => {
    const matchesSearch = 
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.author.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesPriority = priorityFilter === "all" || notice.priority === priorityFilter
    const matchesStatus = statusFilter === "all" || notice.status === statusFilter
    
    return matchesSearch && matchesPriority && matchesStatus
  })

  // Reset form
  const resetForm = () => {
    setTitle("")
    setContent("")
    setPriority("medium")
    setAudience("all")
    setClassId("")
    setEditingNotice(null)
    setShowCreateForm(false)
  }

  // Handle create notice
  const handleCreateNotice = () => {
    if (!title || !content) {
      toast.error("Please fill in all required fields")
      return
    }

    const newNotice: Notice = {
      id: (notices.length + 1).toString(),
      title,
      content,
      date: new Date().toISOString().split('T')[0],
      priority,
      status: "published",
      audience,
      classId: audience === "specific-class" ? classId : undefined,
      author: "Mr. Johnson",
      views: 0
    }

    setNotices([newNotice, ...notices])
    toast.success("Notice created successfully")
    resetForm()
  }

  // Handle edit notice
  const handleEditNotice = (notice: Notice) => {
    setTitle(notice.title)
    setContent(notice.content)
    setPriority(notice.priority)
    setAudience(notice.audience)
    setClassId(notice.classId || "")
    setEditingNotice(notice)
    setShowCreateForm(true)
  }

  // Handle update notice
  const handleUpdateNotice = () => {
    if (!title || !content || !editingNotice) {
      toast.error("Please fill in all required fields")
      return
    }

    setNotices(notices.map(notice => 
      notice.id === editingNotice.id ? {
        ...notice,
        title,
        content,
        priority,
        audience,
        classId: audience === "specific-class" ? classId : undefined
      } : notice
    ))

    toast.success("Notice updated successfully")
    resetForm()
  }

  // Handle delete notice
  const handleDeleteNotice = (id: string) => {
    setNotices(prev => prev.filter(notice => notice.id !== id))
    toast.success("Notice deleted successfully")
  }

  // Handle archive notice
  const handleArchiveNotice = (id: string) => {
    setNotices(prev => prev.map(notice => 
      notice.id === id ? { ...notice, status: "archived" } : notice
    ))
    toast.success("Notice archived successfully")
  }

  // Get priority badge variant
  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "high": return "destructive"
      case "medium": return "default"
      case "low": return "secondary"
      default: return "default"
    }
  }

  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "published": return "default"
      case "draft": return "secondary"
      case "archived": return "outline"
      default: return "default"
    }
  }

  // Get priority text
  const getPriorityText = (priority: string) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1)
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
                  <h1 className="text-2xl font-bold">Notices</h1>
                  <p className="text-muted-foreground">Manage class notices and announcements</p>
                </div>

                {/* Create/Edit Notice Form */}
                {showCreateForm && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        {editingNotice ? "Edit Notice" : "Create New Notice"}
                      </CardTitle>
                      <CardDescription>
                        {editingNotice ? "Edit your notice details" : "Create a new notice for your students"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Title *</Label>
                          <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter notice title"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="content">Content *</Label>
                          <Textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter notice content"
                            rows={4}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="priority">Priority</Label>
                            <Select value={priority} onValueChange={(value: "low" | "medium" | "high") => setPriority(value)}>
                              <SelectTrigger id="priority">
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="audience">Audience</Label>
                            <Select value={audience} onValueChange={(value: "all" | "specific-class") => setAudience(value)}>
                              <SelectTrigger id="audience">
                                <SelectValue placeholder="Select audience" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Students</SelectItem>
                                <SelectItem value="specific-class">Specific Class</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          {audience === "specific-class" && (
                            <div>
                              <Label htmlFor="class">Class</Label>
                              <Select value={classId} onValueChange={setClassId}>
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
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          {editingNotice ? (
                            <Button onClick={handleUpdateNotice}>
                              Update Notice
                            </Button>
                          ) : (
                            <Button onClick={handleCreateNotice}>
                              <PlusCircle className="mr-2 h-4 w-4" />
                              Create Notice
                            </Button>
                          )}
                          <Button variant="outline" onClick={resetForm}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Action Buttons */}
                {!showCreateForm && (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={() => setShowCreateForm(true)} className="w-full sm:w-auto">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New Notice
                    </Button>
                  </div>
                )}

                {/* Filters and Search */}
                <Card>
                  <CardHeader>
                    <CardTitle>Notice Management</CardTitle>
                    <CardDescription>View and manage your notices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="relative w-full sm:w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search notices..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 flex-1">
                        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Filter by priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Priorities</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Notices Table */}
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader className="bg-muted">
                          <TableRow>
                            <TableHead className="text-primary">Title</TableHead>
                            <TableHead className="text-primary">Date</TableHead>
                            <TableHead className="text-primary">Priority</TableHead>
                            <TableHead className="text-primary">Status</TableHead>
                            <TableHead className="text-primary">Audience</TableHead>
                            <TableHead className="text-primary">Views</TableHead>
                            <TableHead className="text-primary">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredNotices.map((notice) => (
                            <TableRow key={notice.id} className="hover:bg-muted/50">
                              <TableCell className="font-medium max-w-xs">
                                <div className="flex flex-col">
                                  <span className="truncate">{notice.title}</span>
                                  <span className="text-xs text-muted-foreground truncate">
                                    {notice.content.substring(0, 50)}{notice.content.length > 50 ? "..." : ""}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>{notice.date}</TableCell>
                              <TableCell>
                                <Badge variant={getPriorityVariant(notice.priority)}>
                                  {getPriorityText(notice.priority)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant={getStatusVariant(notice.status)}>
                                  {getStatusText(notice.status)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {notice.audience === "all" ? "All Students" : 
                                 notice.audience === "specific-class" && notice.classId ? 
                                 mockClasses.find(c => c.id === notice.classId)?.name || "Unknown Class" : 
                                 "Specific Students"}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Eye className="h-4 w-4 text-muted-foreground" />
                                  <span>{notice.views}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => handleEditNotice(notice)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => handleArchiveNotice(notice.id)}
                                    disabled={notice.status === "archived"}
                                  >
                                    <Bell className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => handleDeleteNotice(notice.id)}
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

                    {filteredNotices.length === 0 && (
                      <div className="text-center py-8">
                        <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 font-medium">No notices found</h3>
                        <p className="text-muted-foreground">
                          {searchTerm || priorityFilter !== "all" || statusFilter !== "all" 
                            ? "No notices match your search criteria" 
                            : "You haven't created any notices yet"}
                        </p>
                        {!searchTerm && priorityFilter === "all" && statusFilter === "all" && (
                          <Button 
                            className="mt-4" 
                            onClick={() => setShowCreateForm(true)}
                          >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create Your First Notice
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Notices Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Recent Published Notices
                    </CardTitle>
                    <CardDescription>Latest notices sent to students</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {notices
                        .filter(notice => notice.status === "published")
                        .slice(0, 3)
                        .map((notice) => (
                          <div key={notice.id} className="flex items-start gap-4 p-4 border rounded-lg">
                            <div className="rounded-full bg-primary/10 p-2 mt-1">
                              <Bell className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <h3 className="font-medium">{notice.title}</h3>
                                <Badge variant={getPriorityVariant(notice.priority)}>
                                  {getPriorityText(notice.priority)}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notice.content.substring(0, 100)}{notice.content.length > 100 ? "..." : ""}
                              </p>
                              <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  <span>{notice.date}</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Eye className="h-3 w-3" />
                                  <span>{notice.views} views</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      
                      {notices.filter(notice => notice.status === "published").length === 0 && (
                        <div className="text-center py-4">
                          <p className="text-muted-foreground">No published notices yet</p>
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