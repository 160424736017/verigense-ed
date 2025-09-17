import { SiteHeader } from "@/components/site-header"

export default function PaymentsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="grid grid-cols-1 gap-6 px-4 lg:px-6">
              <div className="flex">
                <div className="w-full">
                  <h1 className="text-2xl font-bold">Payments</h1>
                  <p className="text-muted-foreground">Manage your fee payments and view payment history.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}