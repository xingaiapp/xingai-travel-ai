"use client"

import { Moon, Sun } from "lucide-react"
import { useSyncExternalStore } from "react"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

// useSyncExternalStore is the React-idiomatic hydration guard — no setState in effect needed
const subscribe = () => () => {}
function useIsMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false)
}

export function ThemeToggle({ className }: Readonly<{ className?: string }>) {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useIsMounted()
  const dark = mounted && resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-foreground shadow-sm transition hover:border-primary/40",
        className
      )}
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      {dark ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
    </button>
  )
}
