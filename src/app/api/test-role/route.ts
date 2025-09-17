import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function GET() {
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
  
  return NextResponse.json({
    role,
    roleCookie: userRoleCookie,
    allCookies: cookieHeader,
    timestamp: new Date().toISOString()
  })
}