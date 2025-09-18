"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// Create a context to track if we're already inside a RoleProvider
const RoleContext = React.createContext<{ 
  hasSidebar: boolean,
  role?: string
}>({ hasSidebar: false, role: undefined })

export function useRole() {
  const context = React.useContext(RoleContext)
  return { role: context.role }
}

export function RoleProvider({ 
  children,
  role,
  showSidebar = true
}: { 
  children: React.ReactNode,
  role?: string,
  showSidebar?: boolean
}) {
  // In a real application, you would get the role from context or props
  // For now, we'll use the role prop passed from the server
  const userRole = role || 'student'
  
  // Force the role to be one of the expected values
  let validatedRole: 'student' | 'teacher' | 'admin' = 'student'
  if (userRole === 'teacher' || userRole === 'admin' || userRole === 'student') {
    validatedRole = userRole as 'student' | 'teacher' | 'admin'
  }
  
  // Check if we're already inside a RoleProvider
  const context = React.useContext(RoleContext)
  
  // If we don't want to show the sidebar, just render children
  if (!showSidebar) {
    return <>{children}</>
  }
  
  // If we're already inside a RoleProvider, just render children
  if (context.hasSidebar) {
    return <>{children}</>
  }
  
  return (
    <RoleContext.Provider value={{ hasSidebar: true, role: validatedRole }}>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
          } as React.CSSProperties
        }
      >
        <AppSidebar role={validatedRole} variant="inset" />
        <SidebarInset>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </RoleContext.Provider>
  )
}