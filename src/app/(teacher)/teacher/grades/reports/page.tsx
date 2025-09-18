"use client"

import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DateRangePicker } from "@/components/date-range-picker"
import { DateRange } from "react-day-picker"
import { useState } from "react"
import { 
  Download, 
  FileText, 
  Printer, 
  Share2, 
  Calendar,
  Filter
} from "lucide-react"

// Mock data for reports
const reportTemplates = [
  { id: 1, name: "Class Grade Summary", description: "Summary of grades for entire class", lastGenerated: "2025-09-15" },
  { id: 2, name: "Individual Student Reports", description: "Detailed reports for each student", lastGenerated: "2025-09-10" },
  { id: 3, name: "Assignment Analysis", description: "Performance analysis by assignment", lastGenerated: "2025-09-12" },
  { id: 4, name: "Grade Distribution Report", description: "Statistical breakdown of grade distribution", lastGenerated: "2025-09-08" },
]

const generatedReports = [
  { id: 1, name: "Mathematics 101 - Midterm Grades", date: "2025-09-15", format: "PDF", status: "generated" },
  { id: 2, name: "Physics 201 - Assignment 3 Results", date: "2025-09-14", format: "Excel", status: "generated" },
  { id: 3, name: "Chemistry 301 - Class Performance", date: "2025-09-12", format: "PDF", status: "generated" },
]

export default function TeacherGradesReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  })
  
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="grid grid-cols-1 gap-6 px-4 lg:px-6">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold">Grades Reports</h1>
                    <p className="text-muted-foreground">Generate and manage grade reports</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Button>
                      <FileText className="mr-2 h-4 w-4" />
                      New Report
                    </Button>
                  </div>
                </div>

                {/* Report Templates */}
                <Card>
                  <CardHeader>
                    <CardTitle>Report Templates</CardTitle>
                    <CardDescription>Predefined templates for common reporting needs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {reportTemplates.map((template) => (
                        <Card key={template.id} className="hover:bg-accent transition-colors">
                          <CardContent className="p-4">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium">{template.name}</h3>
                                <p className="text-sm text-muted-foreground">{template.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">Last generated: {template.lastGenerated}</p>
                              </div>
                              <Button size="sm">Generate</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Generated Reports */}
                <Card>
                  <CardHeader>
                    <CardTitle>Generated Reports</CardTitle>
                    <CardDescription>Recently generated reports and their status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {generatedReports.map((report) => (
                        <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-medium">{report.name}</h3>
                            <p className="text-sm text-muted-foreground">Generated on {report.date} • {report.format}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="default">{report.status}</Badge>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Printer className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Custom Report Builder */}
                <Card>
                  <CardHeader>
                    <CardTitle>Custom Report Builder</CardTitle>
                    <CardDescription>Create a custom report with specific parameters</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-4">Report Parameters</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Class</label>
                            <select className="w-full p-2 border rounded mt-1">
                              <option>Select a class</option>
                              <option>Mathematics 101</option>
                              <option>Physics 201</option>
                              <option>Chemistry 301</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Date Range</label>
                            <div className="mt-1">
                              <DateRangePicker 
                                dateRange={dateRange} 
                                onDateRangeChange={setDateRange} 
                                placeholder="Select date range" 
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Report Type</label>
                            <select className="w-full p-2 border rounded mt-1">
                              <option>Grade Summary</option>
                              <option>Detailed Grades</option>
                              <option>Performance Analysis</option>
                              <option>Grade Distribution</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Include</label>
                            <div className="mt-1 space-y-2">
                              <div className="flex items-center">
                                <input type="checkbox" id="grades" className="mr-2" defaultChecked />
                                <label htmlFor="grades">Student Grades</label>
                              </div>
                              <div className="flex items-center">
                                <input type="checkbox" id="attendance" className="mr-2" />
                                <label htmlFor="attendance">Attendance Data</label>
                              </div>
                              <div className="flex items-center">
                                <input type="checkbox" id="comments" className="mr-2" defaultChecked />
                                <label htmlFor="comments">Teacher Comments</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-4">Preview & Export</h3>
                        <div className="bg-muted/50 rounded-lg p-4 h-full flex flex-col">
                          <div className="flex-grow">
                            <p className="text-muted-foreground text-center mb-4">Report preview will appear here</p>
                            <div className="space-y-2">
                              <div className="h-3 bg-muted rounded w-3/4"></div>
                              <div className="h-3 bg-muted rounded w-1/2"></div>
                              <div className="h-3 bg-muted rounded w-5/6"></div>
                              <div className="h-3 bg-muted rounded w-2/3"></div>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button className="flex-grow">Generate Report</Button>
                            <Button variant="outline">Save Template</Button>
                          </div>
                        </div>
                      </div>
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