import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const currentUser = {
    role: 'student', // This would come from session/auth system
    id: '123'
  }
  
  const { pathname } = request.nextUrl
  
  // Role-based route protection
  if (pathname.startsWith('/admin') && currentUser.role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }
  
  if (pathname.startsWith('/teacher') && currentUser.role !== 'teacher') {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }
  
  // Multi-role switching example
  // In a real app, this would check if the user has the required role
  if (pathname.startsWith('/parent') && currentUser.role !== 'parent' && currentUser.role !== 'teacher') {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }
  
  // Continue with the request
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/admin/:path*',
    '/teacher/:path*',
    '/parent/:path*',
  ],
}