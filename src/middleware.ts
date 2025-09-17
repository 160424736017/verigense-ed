import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Enhanced middleware with stricter role enforcement
export function middleware(request: NextRequest) {
  // For development/testing purposes, allow role switching via query parameter
  // In a real application, this would come from session/auth system
  const url = new URL(request.url)
  const roleParam = url.searchParams.get('role')
  
  // Get role from cookie if available (for persistent role during navigation)
  const roleCookie = request.cookies.get('user-role')
  
  // Determine the current role
  // Priority: query param > cookie > path-based default
  let currentUserRole = 'student'
  
  if (roleParam && ['student', 'teacher', 'admin'].includes(roleParam)) {
    currentUserRole = roleParam
  } else if (roleCookie?.value && ['student', 'teacher', 'admin'].includes(roleCookie.value)) {
    currentUserRole = roleCookie.value
  } else {
    // Determine default role based on URL path
    const { pathname } = request.nextUrl
    if (pathname.startsWith('/teacher')) {
      currentUserRole = 'teacher'
    } else if (pathname.startsWith('/admin')) {
      currentUserRole = 'admin'
    }
  }
  
  console.log("Middleware - Pathname:", request.nextUrl.pathname)
  console.log("Middleware - Current user role:", currentUserRole, "Role param:", roleParam, "Role cookie:", roleCookie?.value)
  
  // Role-based route protection
  const { pathname } = request.nextUrl
  
  // Strict role enforcement - if accessing a role-specific area, must have that role
  if (pathname.startsWith('/admin/') && currentUserRole !== 'admin') {
    console.log("Unauthorized access to admin area by", currentUserRole)
    // Clear the role cookie when accessing a section with the wrong role
    const response = NextResponse.redirect(new URL('/unauthorized', request.url))
    response.cookies.delete('user-role')
    return response
  }
  
  if (pathname.startsWith('/teacher/') && currentUserRole !== 'teacher') {
    console.log("Unauthorized access to teacher area by", currentUserRole)
    // Clear the role cookie when accessing a section with the wrong role
    const response = NextResponse.redirect(new URL('/unauthorized', request.url))
    response.cookies.delete('user-role')
    return response
  }
  
  if (pathname.startsWith('/student/') && currentUserRole !== 'student') {
    console.log("Unauthorized access to student area by", currentUserRole)
    // Clear the role cookie when accessing a section with the wrong role
    const response = NextResponse.redirect(new URL('/unauthorized', request.url))
    response.cookies.delete('user-role')
    return response
  }
  
  // Multi-role switching example
  // In a real app, this would check if the user has the required role
  if (pathname.startsWith('/parent') && currentUserRole !== 'parent' && currentUserRole !== 'teacher') {
    const response = NextResponse.redirect(new URL('/unauthorized', request.url))
    response.cookies.delete('user-role')
    return response
  }
  
  // Continue with the request and add role header
  const response = NextResponse.next()
  response.headers.set('x-user-role', currentUserRole)
  
  // Add cache control headers to prevent caching during development
  if (process.env.NODE_ENV === 'development') {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  }
  
  console.log("Setting x-user-role header to:", currentUserRole)
  
  // Set cookie to persist role during navigation (only in development)
  // But only set the cookie if a role parameter was explicitly provided and is valid
  if (roleParam && ['student', 'teacher', 'admin'].includes(roleParam)) {
    console.log("Setting user-role cookie to:", roleParam)
    response.cookies.set('user-role', roleParam, {
      maxAge: 60 * 60 * 24, // 24 hours
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  }
  
  return response
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}