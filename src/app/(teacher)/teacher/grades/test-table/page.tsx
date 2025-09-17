import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GradeEntryTable } from "@/components/grade-entry-table"
import { Button } from "@/components/ui/button"
import { BookOpen, PlusCircle } from "lucide-react"

export default function TestGradeTablePage() {
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
                    <h1 className="text-2xl font-bold">Grade Entry Test</h1>
                    <p className="text-muted-foreground">Testing the TanStack Table implementation</p>
                  </div>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Assignment
                  </Button>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Grade Entry Table
                    </CardTitle>
                    <CardDescription>Interactive grade entry table with TanStack Table</CardDescription>
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