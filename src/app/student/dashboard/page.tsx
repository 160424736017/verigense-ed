import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
// import { ChartAreaInteractive } from "@/components/chart-area-interactive"
// import { DataTable } from "@/components/data-table"
// import { SectionCards } from "@/components/section-cards"
import Calendar31 from "@/components/calendar-31"
import { AttendanceWidget } from "@/components/attendence-widget"
import { AnnouncementsWidget } from "@/components/announcements-widget"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

// import data from "./data.json"

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 lg:px-6">
                <div className="flex">
                  <div className="w-full">
                    <Calendar31 />
                  </div>
                </div>
                <div className="flex">
                  <div className="w-full">
                    <AttendanceWidget />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 px-4 lg:px-6">
                <div className="flex">
                  <div className="w-full">
                    <AnnouncementsWidget />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}