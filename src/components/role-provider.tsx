"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// Create a context to track if we're already inside a RoleProvider
const RoleContext = React.createContext<{ hasSidebar: boolean }>({ hasSidebar: false })

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
  
  console.log("RoleProvider rendered with role prop:", role, "using userRole:", userRole, "showSidebar:", showSidebar)
  
  // Force the role to be one of the expected values
  let validatedRole: 'student' | 'teacher' | 'admin' = 'student'
  if (userRole === 'teacher' || userRole === 'admin' || userRole === 'student') {
    validatedRole = userRole as 'student' | 'teacher' | 'admin'
  }
  
  // Check if we're already inside a RoleProvider
  const context = React.useContext(RoleContext)
  
  // If we don't want to show the sidebar, just render children
  if (!showSidebar) {
    console.log("Not showing sidebar, rendering children only")
    return <>{children}</>
  }
  
  console.log("RoleProvider using validated role:", validatedRole)
  
  // If we're already inside a RoleProvider, just render children
  if (context.hasSidebar) {
    console.log("Already inside RoleProvider, rendering children only")
    return <>{children}</>
  }
  
  console.log("Rendering full RoleProvider with AppSidebar using role:", validatedRole)
  
  return (
    <RoleContext.Provider value={{ hasSidebar: true }}>
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