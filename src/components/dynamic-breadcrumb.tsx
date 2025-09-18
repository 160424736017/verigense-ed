"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getNavItems } from "@/components/app-sidebar"

interface NavItem {
  title: string
  url: string
  icon?: React.ComponentType
  items?: {
    title: string
    url: string
  }[]
}

interface BreadcrumbPath {
  title: string
  url: string
}

export function DynamicBreadcrumb({ role }: { role?: string }) {
  const pathname = usePathname()
  const [breadcrumbPaths, setBreadcrumbPaths] = React.useState<BreadcrumbPath[]>([])

  React.useEffect(() => {
    if (!pathname) return

    // Get navigation items for the current role (default to student if not provided)
    const navItems = getNavItems(role || 'student')

    // Split the pathname into segments
    const pathSegments = pathname.split('/').filter(segment => segment !== '')
    
    // Build breadcrumb paths
    const paths: BreadcrumbPath[] = []
    
    // Add home breadcrumb
    paths.push({ title: 'Home', url: '/' })
    
    // Process each segment to build breadcrumbs
    let currentPath = ''
    
    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i]
      currentPath += `/${segment}`
      
      // Skip role segment (student, teacher, admin) as it's already represented by the nav structure
      if (['student', 'teacher', 'admin'].includes(segment)) {
        continue
      }
      
      // Try to find a matching nav item
      let foundTitle = formatSegment(segment)
      
      // Search in main nav items
      const mainItem = navItems.find((item: NavItem) => item.url === currentPath)
      if (mainItem) {
        foundTitle = mainItem.title
      }
      
      // Search in sub items
      if (!mainItem) {
        for (const item of navItems) {
          if (item.items) {
            const subItem = item.items.find((sub: { title: string; url: string }) => sub.url === currentPath)
            if (subItem) {
              foundTitle = subItem.title
              break
            }
          }
        }
      }
      
      // For dynamic segments (like [studentId]), we might want to fetch the actual title
      // For now, we'll use a generic approach
      if (segment.startsWith('[') && segment.endsWith(']')) {
        foundTitle = formatSegment(segment.slice(1, -1))
      }
      
      paths.push({ title: foundTitle, url: currentPath })
    }
    
    setBreadcrumbPaths(paths)
  }, [pathname, role])

  // Format URL segments into readable titles
  const formatSegment = (segment: string): string => {
    // Handle common segments
    const segmentMap: Record<string, string> = {
      'dashboard': 'Dashboard',
      'students': 'Students',
      'teachers': 'Teachers',
      'classes': 'Classes',
      'timetables': 'Timetables',
      'exams': 'Exams',
      'fees': 'Fees',
      'notices': 'Notices',
      'reports': 'Reports',
      'audit': 'Audit',
      'grades': 'Grades',
      'payments': 'Payments',
      'study-materials': 'Study Materials',
      'assignments': 'Assignments',
      'attendance': 'Attendance',
      'analytics': 'Analytics',
      'documents': 'Documents',
      'messages': 'Messages',
      'substitutions': 'Substitutions',
      'generate': 'Generate',
      'add': 'Add',
      'today': 'Today',
      'pay': 'Pay',
      'tc': 'TC',
      'transcript': 'Transcript',
      'daily': 'Daily',
      'pending': 'Pending',
      'gradebook': 'Gradebook',
      'test-table': 'Test Table',
    }
    
    if (segmentMap[segment]) {
      return segmentMap[segment]
    }
    
    // Convert kebab-case to Title Case
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  if (breadcrumbPaths.length <= 1) {
    return null
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbPaths.map((path, index) => (
          <React.Fragment key={path.url}>
            <BreadcrumbItem>
              {index < breadcrumbPaths.length - 1 ? (
                <BreadcrumbLink asChild>
                  <Link href={path.url}>{path.title}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{path.title}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < breadcrumbPaths.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}