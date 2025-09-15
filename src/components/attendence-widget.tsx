"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { PieChart, Pie, Label, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type AttendanceStatus = "present" | "absent" | "excused"

type AttendanceSlice = {
  status: AttendanceStatus
  count: number
  fill?: string
  label?: string
}

interface AttendanceWidgetProps {
  /**
   * If not supplied, widget uses a sensible demo dataset.
   * Production: pass canonical counts for the student (or group) for the period.
   */
  data?: AttendanceSlice[]
  /** Treat excused as present when computing overall attendance % (default: true) */
  treatExcusedAsPresent?: boolean
  /** Human-readable last sync time (e.g. "5 minutes ago" or ISO string) */
  lastSynced?: string
  /** Period description shown in subtitle (e.g. "This semester") */
  periodLabel?: string
}

const DEFAULT_DATA: AttendanceSlice[] = [
  { status: "present", label: "Present", count: 42, fill: "var(--chart-1)" },
  { status: "absent", label: "Absent", count: 5, fill: "var(--chart-2)" },
  { status: "excused", label: "Excused", count: 2, fill: "var(--chart-4)" },
]

const chartConfig = {
  visitors: { label: "Attendance" },
  present: { label: "Present", color: "var(--chart-1)" },
  absent: { label: "Absent", color: "var(--chart-2)" },
  excused: { label: "Excused", color: "var(--chart-4)" },
} satisfies ChartConfig

export function AttendanceWidget({
  data = DEFAULT_DATA,
  treatExcusedAsPresent = true,
  lastSynced,
  periodLabel = "This semester",
}: AttendanceWidgetProps) {
  const totals = React.useMemo(() => {
    const map: Record<AttendanceStatus, number> = {
      present: 0,
      absent: 0,
      excused: 0,
    }
    for (const d of data) {
      map[d.status] = (map[d.status] || 0) + (Number(d.count) || 0)
    }
    const total = map.present + map.absent + map.excused
    const effectivePresent = map.present + (treatExcusedAsPresent ? map.excused : 0)
    const percent = total === 0 ? 0 : Math.round((effectivePresent / total) * 10000) / 100
    return { map, total, effectivePresent, percent }
  }, [data, treatExcusedAsPresent])

  const totalCount = totals.total

  // Rechart Pie data expects objects with name/key and value
  const chartData = React.useMemo(
    () =>
      data.map((d) => ({
        name: d.label || d.status,
        value: d.count,
        fill: d.fill,
        status: d.status,
      })),
    [data]
  )

  return (
    <Card className="flex flex-col">
      {/* Header Section */}
      <CardHeader className="items-center pb-0">
        <CardTitle>Attendance</CardTitle>
        <CardDescription>{periodLabel}</CardDescription>
      </CardHeader>

      {/* Chart and Legend Section */}
      <CardContent className="flex-1 pb-0">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Chart Section */}
          <div className="flex-1">
            <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[260px]">
              <PieChart role="img" aria-label={`Attendance donut chart. ${totals.percent}% overall`}>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={64}
                  outerRadius={90}
                  paddingAngle={4}
                  strokeWidth={6}
                  aria-label="Attendance breakdown"
                >
                  {chartData.map((entry, idx) => (
                    <Cell key={entry.name + idx} fill={entry.fill || `var(--chart-${idx + 1})`} />
                  ))}
                  <Label
                    content={({ viewBox }) => {
                      if (!viewBox) return null;
                      
                      // Type guard to check if viewBox has cx and cy properties
                      const isPieViewBox = (viewBox: any): viewBox is { cx: number; cy: number } => {
                        return (
                          typeof viewBox.cx === "number" &&
                          typeof viewBox.cy === "number"
                        );
                      };
                      
                      if (!isPieViewBox(viewBox)) return null;
                      
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          aria-hidden
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalCount === 0 ? "—" : `${totals.percent.toFixed(0)}%`}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy + 26}
                            className="fill-muted-foreground text-xs"
                          >
                            Overall attendance
                          </tspan>
                        </text>
                      )
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
          
          {/* Legend Section */}
          <div className="flex-1 w-full">
            <div className="space-y-3">
              {(["present", "absent", "excused"] as AttendanceStatus[]).map((status, i) => {
                const count = totals.map[status] ?? 0
                const percent = totals.total === 0 ? 0 : Math.round((count / totals.total) * 10000) / 100
                const color =
                  data.find((d) => d.status === status)?.fill || `var(--chart-${i + 1})`
                const label =
                  data.find((d) => d.status === status)?.label ||
                  (status.charAt(0).toUpperCase() + status.slice(1))
                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block h-3 w-3 rounded-sm"
                        style={{ backgroundColor: color }}
                        aria-hidden
                      />
                      <span className="font-medium">{label}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {count}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {percent}%
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </CardContent>

      {/* Footer Section */}
      <CardFooter className="flex-col gap-3 text-sm">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 leading-none">
            <span className="text-muted-foreground text-xs">
              {lastSynced ? `Last synced: ${lastSynced}` : "Last synced: just now"}
            </span>
          </div>

          <div className="text-muted-foreground text-xs flex items-center gap-2">
            <span>Showing attendance for the selected period</span>
            <TrendingUp className="h-4 w-4" />
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}