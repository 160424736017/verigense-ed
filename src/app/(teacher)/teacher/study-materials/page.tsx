"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { FileText, Upload } from "lucide-react"

export default function TeacherStudyMaterialsPage() {
  const [file, setFile] = useState<File | null>(null)
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert("Material uploaded successfully!")
    // Reset form
    setFile(null)
    const form = e.target as HTMLFormElement
    form.reset()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Study Materials</CardTitle>
          <CardDescription>Upload and manage study materials for your classes</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Material Title</Label>
                <Input id="title" placeholder="Enter material title" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select required>
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
                <Textarea id="description" placeholder="Enter material description" />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="file">File</Label>
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
                    Selected: {file.name}
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
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Algebra Basics Notes</h3>
                <p className="text-sm text-muted-foreground">Mathematics 101 • Uploaded 2 days ago</p>
              </div>
              <Button variant="outline">View</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Physics Lab Manual</h3>
                <p className="text-sm text-muted-foreground">Physics 201 • Uploaded 1 week ago</p>
              </div>
              <Button variant="outline">View</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}