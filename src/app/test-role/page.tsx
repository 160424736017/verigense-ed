import { headers } from 'next/headers'
import Link from 'next/link'

export default async function TestRolePage() {
  const headersList = await headers()
  const role = headersList.get('x-user-role') || 'student'
  
  // Get cookies
  const cookieHeader = headersList.get('cookie') || ''
  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split('=')
    acc[name] = value
    return acc
  }, {} as Record<string, string>)
  
  const userRoleCookie = cookies['user-role'] || 'not set'
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4">Role Test Page</h1>
        <div className="bg-muted p-4 rounded-lg mb-6 text-left">
          <p className="mb-2">
            <span className="font-semibold">Current role from headers:</span> 
            <span className="font-mono bg-background p-1 rounded ml-2">{role}</span>
          </p>
          <p className="mb-2">
            <span className="font-semibold">Role cookie value:</span> 
            <span className="font-mono bg-background p-1 rounded ml-2">{userRoleCookie}</span>
          </p>
          <p>
            <span className="font-semibold">All cookies:</span> 
            <span className="font-mono bg-background p-1 rounded ml-2 block mt-1">{cookieHeader || 'none'}</span>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/student/dashboard?role=student" className="text-blue-500 hover:underline">
            Switch to Student Role
          </Link>
          <Link href="/teacher/dashboard?role=teacher" className="text-blue-500 hover:underline">
            Switch to Teacher Role
          </Link>
          <Link href="/admin/dashboard?role=admin" className="text-blue-500 hover:underline">
            Switch to Admin Role
          </Link>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Direct Access Tests</h2>
          <div className="flex flex-col gap-2">
            <Link href="/student/dashboard" className="text-green-500 hover:underline">
              Student Dashboard (no role param)
            </Link>
            <Link href="/teacher/dashboard" className="text-green-500 hover:underline">
              Teacher Dashboard (no role param)
            </Link>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Debug Information</h2>
          <div className="bg-muted p-4 rounded-lg text-left text-sm">
            <p className="mb-2">
              <span className="font-semibold">Pathname:</span> 
              <span className="font-mono bg-background p-1 rounded ml-2">{headersList.get('x-invoke-path') || 'unknown'}</span>
            </p>
            <p>
              <span className="font-semibold">User Agent:</span> 
              <span className="font-mono bg-background p-1 rounded ml-2 block mt-1">{headersList.get('user-agent') || 'unknown'}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}