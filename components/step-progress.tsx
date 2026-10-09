"use client"

import { ArrowRight, CalendarCheck, ClipboardList, Route } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import { cn } from "@/lib/utils"

export function StepProgress({ active = 1 }: Readonly<{ active?: 1 | 2 | 3 }>) {
  const { messages } = useLocale()
  const steps = [
    { label: messages.steps.context, icon: ClipboardList },
    { label: messages.steps.compare, icon: Route },
    { label: messages.steps.plan, icon: CalendarCheck },
  ]

  return (
    <div className="mx-auto mb-4 flex max-w-2xl items-center justify-center rounded-md border border-border bg-card/80 p-1 shadow-sm sm:mb-6">
      {steps.map((step, index) => {
        const n = (index + 1) as 1 | 2 | 3
        const Icon = step.icon
        const isActive = active === n
        return (
          <div key={step.label} className="flex min-w-0 flex-1 items-center justify-center">
            <span
              className={cn(
                "flex h-11 min-h-11 min-w-0 max-w-full items-center justify-center gap-1.5 rounded-md px-2 text-xs font-bold transition sm:h-8 sm:min-h-0 sm:px-3",
                isActive
                  ? "bg-primary/10 text-primary"
                  : active > n
                    ? "text-primary/70"
                    : "text-muted-foreground"
              )}
              title={step.label}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {/* Mobile: label only on the active step; others icon-only so short names never ellipsize to Trip… */}
              <span className={cn("truncate", isActive ? "inline" : "hidden sm:inline")}>{step.label}</span>
            </span>
            {index < steps.length - 1 ? (
              <ArrowRight className="mx-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground sm:mx-1" aria-hidden />
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
