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
    <div className="mx-auto mb-6 flex max-w-2xl items-center justify-center rounded-md border border-border bg-card/80 p-1 shadow-sm">
      {steps.map((step, index) => {
        const n = (index + 1) as 1 | 2 | 3
        const Icon = step.icon
        return (
          <div key={step.label} className="flex min-w-0 items-center">
            <span
              className={cn(
                "flex h-8 min-w-0 items-center gap-1.5 rounded-md px-2.5 text-xs font-bold transition sm:px-4",
                active === n
                  ? "bg-primary/10 text-primary"
                  : active > n
                    ? "text-primary/70"
                    : "text-muted-foreground"
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="truncate">{step.label}</span>
            </span>
            {index < steps.length - 1 ? <ArrowRight className="mx-1 h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden /> : null}
          </div>
        )
      })}
    </div>
  )
}
