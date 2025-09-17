import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TeacherPaymentsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payments</CardTitle>
          <CardDescription>Manage and track payment information</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Payment tracking features for teachers will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}