"use client"

import { usePathname } from "next/navigation"
import { RoleProvider } from "@/components/role-provider"
import { Toaster } from "@/components/ui/sonner"

export function LayoutWrapper({ 
  children,
  role
}: { 
  children: React.ReactNode,
  role?: string
}) {
  const pathname = usePathname()
  
  // Don't show sidebar on the home page
  const showSidebar = pathname !== '/'
  
  return (
    <RoleProvider role={role} showSidebar={showSidebar}>
      {children}
      <Toaster />
    </RoleProvider>
  )
}