"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

type BreadcrumbItem = {
  title: string
  url: string
}

type BreadcrumbContextType = {
  breadcrumbs: BreadcrumbItem[]
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void
}

const BreadcrumbContext = React.createContext<BreadcrumbContextType | undefined>(undefined)

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const [breadcrumbs, setBreadcrumbs] = React.useState<BreadcrumbItem[]>([])
  const pathname = usePathname()

  // Reset breadcrumbs when pathname changes
  React.useEffect(() => {
    setBreadcrumbs([])
  }, [pathname])

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

export function useBreadcrumbs() {
  const context = React.useContext(BreadcrumbContext)
  if (context === undefined) {
    throw new Error("useBreadcrumbs must be used within a BreadcrumbProvider")
  }
  return context
}