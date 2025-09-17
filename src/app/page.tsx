import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-4xl font-bold tracking-tight mb-6">Verigense Education Platform</h1>
        <p className="text-lg text-muted-foreground mb-8">
          A comprehensive education platform for students, teachers, and administrators.
        </p>
        
        <div className="bg-muted/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Development Mode</h2>
          <p className="text-muted-foreground mb-4">
            During development, you can switch between roles using the role parameter in the URL:
          </p>
          <ul className="text-left space-y-2 mb-4">
            <li>• Student: Add <code className="bg-muted px-1 rounded">?role=student</code> to URLs</li>
            <li>• Teacher: Add <code className="bg-muted px-1 rounded">?role=teacher</code> to URLs</li>
            <li>• Admin: Add <code className="bg-muted px-1 rounded">?role=admin</code> to URLs</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            Once you access a page with a role parameter, that role will be remembered for subsequent navigation.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/student/dashboard?role=student">Access as Student</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/teacher/dashboard?role=teacher">Access as Teacher</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/admin/dashboard?role=admin">Access as Admin</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}