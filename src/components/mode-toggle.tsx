"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Toggle } from "@/components/ui/toggle"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [isToggled, setIsToggled] = React.useState(false)
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsToggled(theme === "dark")
    setIsClient(true)
  }, [theme])

  const handleToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    setIsToggled(!isToggled)
  }

  // Render nothing on the server, and only render the toggle on the client
  if (!isClient) {
    return (
      <Toggle 
        aria-label="Toggle theme"
        pressed={isToggled}
        onPressedChange={handleToggle}
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Toggle>
    )
  }

  return (
    <Toggle 
      aria-label="Toggle theme"
      pressed={isToggled}
      onPressedChange={handleToggle}
    >
      {theme === "dark" ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Toggle>
  )
}