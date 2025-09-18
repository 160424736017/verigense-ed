"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconChartBar,
  IconDashboard,
  IconHelp,
  IconInnerShadowTop,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconSchool,
  IconCreditCard,
  IconBell,
  IconBook,
  IconClipboardList,
  IconUser,
  IconUsersGroup,
  IconCalendar,
  IconFileAnalytics,
  IconMessage,
  IconSubtask,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"

// Define navigation items for each role
const getNavItems = (role: string) => {
  console.log("getNavItems called with role:", role)
  
  switch (role) {
    case 'teacher':
      return [
        {
          title: "Dashboard",
          url: "/teacher/dashboard",
          icon: IconDashboard,
        },
        {
          title: "Classes",
          url: "/teacher/classes",
          icon: IconUsersGroup,
        },
        {
          title: "Attendance",
          url: "/teacher/attendance/today",
          icon: IconCalendar,
        },
        {
          title: "Grades",
          url: "/teacher/grades",
          icon: IconSchool,
          items: [
            {
              title: "Overview",
              url: "/teacher/grades",
            },
            {
              title: "Pending",
              url: "/teacher/grades/pending",
            },
            {
              title: "Gradebook",
              url: "/teacher/grades/gradebook",
            },
            {
              title: "Analytics",
              url: "/teacher/grades/analytics",
            },
            {
              title: "Reports",
              url: "/teacher/grades/reports",
            },
            {
              title: "Test Table",
              url: "/teacher/grades/test-table",
            },
          ]
        },
        {
          title: "Substitutions",
          url: "/teacher/substitutions",
          icon: IconSubtask,
        },
        {
          title: "Notices",
          url: "/teacher/notices",
          icon: IconBell,
        },
        {
          title: "Messages",
          url: "/teacher/messages",
          icon: IconMessage,
        },
        {
          title: "Analytics",
          url: "/teacher/analytics",
          icon: IconChartBar,
        },
        {
          title: "Study Materials",
          url: "/teacher/study-materials",
          icon: IconBook,
        },
        {
          title: "Documents",
          url: "/teacher/documents",
          icon: IconFileAnalytics,
        },
        {
          title: "Fees",
          url: "/teacher/fees",
          icon: IconCreditCard,
        },
      ]
    case 'admin':
      return [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          icon: IconDashboard,
        },
        {
          title: "Students",
          url: "/admin/students",
          icon: IconUsers,
        },
        {
          title: "Teachers",
          url: "/admin/teachers",
          icon: IconUser,
        },
        {
          title: "Classes",
          url: "/admin/classes",
          icon: IconUsersGroup,
        },
        {
          title: "Timetables",
          url: "/admin/timetables",
          icon: IconCalendar,
        },
        {
          title: "Exams",
          url: "/admin/exams",
          icon: IconFileAnalytics,
        },
        {
          title: "Fees",
          url: "/admin/fees",
          icon: IconCreditCard,
        },
        {
          title: "Notices",
          url: "/admin/notices",
          icon: IconBell,
        },
        {
          title: "Reports",
          url: "/admin/reports",
          icon: IconReport,
        },
        {
          title: "Audit",
          url: "/admin/audit",
          icon: IconFileAnalytics,
        },
      ]
    case 'student':
    default:
      console.log("Returning student nav items")
      return [
        {
          title: "Dashboard",
          url: "/student/dashboard",
          icon: IconDashboard,
        },
        {
          title: "Grades",
          url: "/student/grades",
          icon: IconSchool,
        },
        {
          title: "Payments",
          url: "/student/payments",
          icon: IconCreditCard,
        },
        {
          title: "Notices",
          url: "/student/notices",
          icon: IconBell,
        },
        {
          title: "Study Materials",
          url: "/student/study-materials",
          icon: IconBook,
        },
        {
          title: "Assignments",
          url: "/student/assignments",
          icon: IconClipboardList,
        },
      ]
  }
}

const data = {
  user: {
    name: "Murtaza",
    email: "160424736017@mjcollege.ac.in",
    avatar: "/avatars/shadcn.jpg",
  },
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/help",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "/search",
      icon: IconSearch,
    },
  ],
}

export function AppSidebar({ 
  role = 'student',
  ...props 
}: React.ComponentProps<typeof Sidebar> & { role?: string }) {
  console.log("AppSidebar component rendered with role:", role)
  
  // Ensure we always get fresh nav items - no useMemo to prevent caching issues
  const navMain = getNavItems(role)
  
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Verigense Edu</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full">
          <NavMain items={navMain} />
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}