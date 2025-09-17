import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TeacherStudyMaterialsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Study Materials</CardTitle>
          <CardDescription>Upload and manage study materials for your classes</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Study materials management features for teachers will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}