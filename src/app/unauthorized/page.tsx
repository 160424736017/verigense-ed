import { Button } from "@/components/ui/button"
import Link from "next/link"
import { headers } from 'next/headers'

export default async function UnauthorizedPage() {
  const headersList = await headers()
  const role = headersList.get('x-user-role') || 'student'
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Access Denied</h1>
        <p className="text-lg text-muted-foreground mb-4">
          You don&apos;t have permission to access this page.
        </p>
        <p className="text-sm text-muted-foreground mb-2">
          Current role: <span className="font-mono bg-muted px-1 rounded">{role}</span>
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          During development, you can switch roles using the ?role= parameter in the URL.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/student/dashboard?role=student">Go to Student Dashboard</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/teacher/dashboard?role=teacher">Go to Teacher Dashboard</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/?role=student">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}