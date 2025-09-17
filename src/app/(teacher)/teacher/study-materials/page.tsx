"use client"

import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { FileText, Upload, Download, Eye, Trash2, Search } from "lucide-react"
import { toast } from "sonner"

// Define the type for study materials
interface StudyMaterial {
  id: string
  title: string
  class: string
  description: string
  fileName: string
  fileSize: string
  uploadDate: string
  status: "published" | "draft" | "archived"
}

// Generate a unique ID
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export default function TeacherStudyMaterialsPage() {
  const [file, setFile] = useState<File | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  
  // Mock data for study materials with unique IDs
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>([
    {
      id: "mat_" + generateUniqueId(),
      title: "Algebra Basics Notes",
      class: "Mathematics 101",
      description: "Introduction to algebraic expressions and equations",
      fileName: "algebra-basics.pdf",
      fileSize: "2.4 MB",
      uploadDate: "2025-09-16",
      status: "published"
    },
    {
      id: "mat_" + generateUniqueId(),
      title: "Physics Lab Manual",
      class: "Physics 201",
      description: "Complete guide for physics laboratory experiments",
      fileName: "physics-lab-manual.pdf",
      fileSize: "5.1 MB",
      uploadDate: "2025-09-10",
      status: "published"
    },
    {
      id: "mat_" + generateUniqueId(),
      title: "Chemistry Periodic Table",
      class: "Chemistry 301",
      description: "Detailed periodic table with element properties",
      fileName: "periodic-table.pdf",
      fileSize: "1.8 MB",
      uploadDate: "2025-09-05",
      status: "published"
    }
  ])
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Form validation
    const form = e.target as HTMLFormElement
    const title = (form.elements.namedItem("title") as HTMLInputElement).value
    const classValue = (form.elements.namedItem("class") as HTMLSelectElement).value
    const description = (form.elements.namedItem("description") as HTMLTextAreaElement).value
    
    if (!title || !classValue || !file) {
      toast.error("Please fill in all required fields")
      return
    }
    
    // Create new study material with unique ID
    const newMaterial: StudyMaterial = {
      id: "mat_" + generateUniqueId(),
      title,
      class: getClassLabel(classValue),
      description,
      fileName: file.name,
      fileSize: formatFileSize(file.size),
      uploadDate: new Date().toISOString().split('T')[0],
      status: "published"
    }
    
    // Add to the list at the beginning
    setStudyMaterials([newMaterial, ...studyMaterials])
    
    // Show success message
    toast.success("Material uploaded successfully!")
    
    // Reset form
    setFile(null)
    form.reset()
  }
  
  const handleDelete = (id: string) => {
    setStudyMaterials(studyMaterials.filter(material => material.id !== id))
    toast.success("Material deleted successfully!")
  }
  
  const getClassLabel = (classValue: string) => {
    switch (classValue) {
      case "math": return "Mathematics 101"
      case "physics": return "Physics 201"
      case "chemistry": return "Chemistry 301"
      default: return classValue
    }
  }
  
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
  
  // Filter materials based on search term
  const filteredMaterials = studyMaterials.filter(material => 
    material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
              <h1 className="text-2xl font-bold">Study Materials</h1>
              <p className="text-muted-foreground">Upload and manage study materials for your classes</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 px-4 lg:px-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload New Material</CardTitle>
                  <CardDescription>Share educational resources with your students</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Material Title *</Label>
                        <Input id="title" name="title" placeholder="Enter material title" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="class">Class *</Label>
                        <Select name="class" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="math">Mathematics 101</SelectItem>
                            <SelectItem value="physics">Physics 201</SelectItem>
                            <SelectItem value="chemistry">Chemistry 301</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" placeholder="Enter material description" />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="file">File *</Label>
                        <div className="flex items-center gap-2">
                          <Input 
                            id="file" 
                            type="file" 
                            onChange={handleFileChange}
                            required
                            className="flex-1"
                          />
                          <Button type="button" variant="outline" size="icon">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                        {file && (
                          <p className="text-sm text-muted-foreground">
                            Selected: {file.name} ({formatFileSize(file.size)})
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">
                        <FileText className="mr-2 h-4 w-4" />
                        Upload Material
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Uploaded Materials</CardTitle>
                  <CardDescription>Manage your previously uploaded materials</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between py-4">
                    <div className="relative w-64">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search materials..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Showing {filteredMaterials.length} of {studyMaterials.length} materials
                    </div>
                  </div>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader className="bg-muted">
                        <TableRow>
                          <TableHead className="text-primary px-4 py-1.5">Title</TableHead>
                          <TableHead className="text-primary px-4 py-1.5">Class</TableHead>
                          <TableHead className="text-primary px-4 py-1.5">File</TableHead>
                          <TableHead className="text-primary px-4 py-1.5">Date</TableHead>
                          <TableHead className="text-primary px-4 py-1.5">Status</TableHead>
                          <TableHead className="text-primary text-right px-4 py-1.5">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredMaterials.length > 0 ? (
                          filteredMaterials.map((material) => (
                            <TableRow key={material.id} className="hover:bg-muted/50">
                              <TableCell className="px-4 py-1.5 font-medium">
                                <div>{material.title}</div>
                                <div className="text-sm text-muted-foreground mt-1">
                                  {material.description}
                                </div>
                              </TableCell>
                              <TableCell className="px-4 py-1.5">{material.class}</TableCell>
                              <TableCell className="px-4 py-1.5">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <div className="text-sm">{material.fileName}</div>
                                    <div className="text-xs text-muted-foreground">{material.fileSize}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="px-4 py-1.5">{material.uploadDate}</TableCell>
                              <TableCell className="px-4 py-1.5">
                                <Badge variant={material.status === "published" ? "default" : material.status === "draft" ? "secondary" : "outline"}>
                                  {material.status.charAt(0).toUpperCase() + material.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell className="px-4 py-1.5 text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleDelete(material.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                              No materials found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}