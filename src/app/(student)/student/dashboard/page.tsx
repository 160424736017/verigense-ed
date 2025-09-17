import { SiteHeader } from "@/components/site-header"
// import { ChartAreaInteractive } from "@/components/chart-area-interactive"
// import { DataTable } from "@/components/data-table"
// import { SectionCards } from "@/components/section-cards"
import Calendar31 from "@/components/calendar-31"
import { AttendanceWidget } from "@/components/attendence-widget"
import { AnnouncementsWidget } from "@/components/announcements-widget"
import { Suspense } from "react"
import { Loading } from "@/components/loading"

// import data from "./data.json"

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 lg:px-6">
              <div className="flex">
                <div className="w-full">
                  <Suspense fallback={<div className="h-80 flex items-center justify-center"><Loading /></div>}>
                    <Calendar31 />
                  </Suspense>
                </div>
              </div>
              <div className="flex">
                <div className="w-full">
                  <Suspense fallback={<div className="h-80 flex items-center justify-center"><Loading /></div>}>
                    <AttendanceWidget />
                  </Suspense>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 px-4 lg:px-6">
              <div className="flex">
                <div className="w-full">
                  <Suspense fallback={<div className="h-64 flex items-center justify-center"><Loading /></div>}>
                    <AnnouncementsWidget />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}