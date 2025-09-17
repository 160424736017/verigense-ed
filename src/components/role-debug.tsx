"use client"

import * as React from "react"

export function RoleDebug({ role }: { role?: string }) {
  const [mounted, setMounted] = React.useState(false)
  
  React.useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded text-xs z-50">
      Role: {role || 'undefined'}
    </div>
  )
}