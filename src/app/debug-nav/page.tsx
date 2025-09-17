import { headers } from 'next/headers'

// Define navigation items for each role
const getNavItems = (role: string) => {
  switch (role) {
    case 'teacher':
      return [
        { title: "Dashboard", url: "/teacher/dashboard" },
        { title: "Classes", url: "/teacher/classes" },
        { title: "Attendance", url: "/teacher/attendance/today" },
        { title: "Grades", url: "/teacher/grades" },
        { title: "Substitutions", url: "/teacher/substitutions" },
        { title: "Notices", url: "/teacher/notices" },
        { title: "Messages", url: "/teacher/messages" },
        { title: "Analytics", url: "/teacher/analytics" },
        { title: "Payments", url: "/teacher/payments" },
        { title: "Study Materials", url: "/teacher/study-materials" },
        { title: "Documents", url: "/teacher/documents" },
        { title: "Fees", url: "/teacher/fees" },
      ]
    case 'admin':
      return [
        { title: "Dashboard", url: "/admin/dashboard" },
        { title: "Students", url: "/admin/students" },
        { title: "Teachers", url: "/admin/teachers" },
        { title: "Classes", url: "/admin/classes" },
        { title: "Timetables", url: "/admin/timetables" },
        { title: "Exams", url: "/admin/exams" },
        { title: "Fees", url: "/admin/fees" },
        { title: "Notices", url: "/admin/notices" },
        { title: "Reports", url: "/admin/reports" },
        { title: "Audit", url: "/admin/audit" },
      ]
    case 'student':
    default:
      return [
        { title: "Dashboard", url: "/student/dashboard" },
        { title: "Grades", url: "/student/grades" },
        { title: "Payments", url: "/student/payments" },
        { title: "Notices", url: "/student/notices" },
        { title: "Study Materials", url: "/student/study-materials" },
        { title: "Assignments", url: "/student/assignments" },
      ]
  }
}

export default async function DebugNavPage() {
  const headersList = await headers()
  const role = headersList.get('x-user-role') || 'student'
  
  const navItems = getNavItems(role)
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Navigation Debug Page</h1>
        <p className="text-muted-foreground mb-6">
          Current role: <span className="font-mono bg-muted p-1 rounded">{role}</span>
        </p>
        
        <div className="bg-muted p-6 rounded-lg text-left">
          <h2 className="text-lg font-semibold mb-4">Navigation Items for {role} role:</h2>
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">•</span>
                <span>{item.title}</span>
                <span className="font-mono text-sm text-muted-foreground ml-2">({item.url})</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-8 flex flex-col gap-2">
          <a href="/student/dashboard?role=student" className="text-blue-500 hover:underline">
            Switch to Student Role
          </a>
          <a href="/teacher/dashboard?role=teacher" className="text-blue-500 hover:underline">
            Switch to Teacher Role
          </a>
          <a href="/admin/dashboard?role=admin" className="text-blue-500 hover:underline">
            Switch to Admin Role
          </a>
        </div>
      </div>
    </div>
  )
}