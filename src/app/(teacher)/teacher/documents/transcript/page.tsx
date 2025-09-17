import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TeacherTranscriptPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Transcripts</CardTitle>
          <CardDescription>Generate and manage student transcripts</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Transcript generation features for teachers will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}