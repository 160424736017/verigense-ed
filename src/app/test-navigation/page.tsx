import { headers } from 'next/headers'
import Link from 'next/link'

export default async function TestNavigationPage() {
  const headersList = await headers()
  const role = headersList.get('x-user-role') || 'student'
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4">Navigation Test</h1>
        <p className="mb-6">Current role: <span className="font-bold">{role}</span></p>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-muted p-4 rounded-lg">
            <h2 className="font-semibold mb-2">Student Links</h2>
            <div className="flex flex-col gap-2">
              <Link href="/student/dashboard?role=student" className="text-blue-500 hover:underline">
                Student Dashboard (with role param)
              </Link>
              <Link href="/student/dashboard" className="text-blue-500 hover:underline">
                Student Dashboard (no param)
              </Link>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h2 className="font-semibold mb-2">Teacher Links</h2>
            <div className="flex flex-col gap-2">
              <Link href="/teacher/dashboard?role=teacher" className="text-blue-500 hover:underline">
                Teacher Dashboard (with role param)
              </Link>
              <Link href="/teacher/dashboard" className="text-blue-500 hover:underline">
                Teacher Dashboard (no param)
              </Link>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h2 className="font-semibold mb-2">Role Switching</h2>
            <div className="flex flex-col gap-2">
              <Link href="/?role=student" className="text-green-500 hover:underline">
                Switch to Student
              </Link>
              <Link href="/?role=teacher" className="text-green-500 hover:underline">
                Switch to Teacher
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}