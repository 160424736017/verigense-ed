"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import * as React from "react"
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb"
import { useRole } from "@/components/role-provider"

export function SiteHeader() {
  const { role } = useRole()

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-14">
      {/* Rounded pill-like inner wrapper */}
      <div className="flex w-full items-center rounded-xl bg-background px-4 py-2 lg:px-6 shadow-sm">
        <SidebarTrigger className="-ml-1" aria-label="Toggle sidebar" />
        <Separator orientation="vertical" className="mx-2 h-4" />
        <div className="flex flex-1 items-center">
          {role && <DynamicBreadcrumb role={role} />}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle aria-label="Toggle theme" />
        </div>
      </div>
    </header>
  )
}