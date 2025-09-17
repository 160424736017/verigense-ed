"use client"

import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GradeEntryTable } from "@/components/grade-entry-table"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// Type for student grades
type StudentGrade = {
  id: string
  studentName: string
  studentId: string
  assignment: string
  grade: string | number
  maxPoints: number
  status: "pending" | "submitted" | "graded"
  comments?: string
}

// Mock data for student grades
const mockStudentGrades: StudentGrade[] = [
  { id: "1", studentName: "Alice Johnson", studentId: "STU001", assignment: "Mathematics Assignment 3", grade: "", maxPoints: 30, status: "submitted" },
  { id: "2", studentName: "Bob Smith", studentId: "STU002", assignment: "Mathematics Assignment 3", grade: "", maxPoints: 30, status: "submitted" },
  { id: "3", studentName: "Carol Davis", studentId: "STU003", assignment: "Mathematics Assignment 3", grade: "", maxPoints: 30, status: "submitted" },
]

export default function TestGradeEntryTableFix() {
  const [studentGrades, setStudentGrades] = useState<StudentGrade[]>(mockStudentGrades)
  
  const handleDataChange = (updatedData: StudentGrade[]) => {
    console.log("Data changed:", updatedData)
    setStudentGrades(updatedData)
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
                  <h1 className="text-2xl font-bold">Grade Entry Table Fix Test</h1>
                  <p className="text-muted-foreground">Testing the fix for the Maximum update depth exceeded error</p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Test with Data</CardTitle>
                    <CardDescription>GradeEntryTable with proper data prop</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <GradeEntryTable 
                      data={studentGrades} 
                      onDataChange={handleDataChange}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Test without Data</CardTitle>
                    <CardDescription>GradeEntryTable without data prop (should not cause infinite loop)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <GradeEntryTable />
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