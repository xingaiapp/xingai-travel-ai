"use client"

import { CalendarDays } from "lucide-react"
import { useState } from "react"
import { useLocale } from "@/components/locale-provider"
import type { PlanResult } from "@/lib/types"
import { cn } from "@/lib/utils"

export function Itinerary({ plan }: Readonly<{ plan: PlanResult }>) {
  const { messages } = useLocale()
  const [detail, setDetail] = useState(false)

  return (
    <section className="card-hover rounded-md border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" aria-hidden />
          <h2 className="text-base font-extrabold">{messages.result.itinerary}</h2>
        </div>
        <div className="grid grid-cols-2 rounded-md border border-border bg-background p-1 text-xs font-bold">
          <button type="button" className={cn("rounded-md px-3 py-1.5", !detail && "bg-primary text-primary-foreground")} onClick={() => setDetail(false)}>
            {messages.result.simple}
          </button>
          <button type="button" className={cn("rounded-md px-3 py-1.5", detail && "bg-primary text-primary-foreground")} onClick={() => setDetail(true)}>
            {messages.result.detailed}
          </button>
        </div>
      </div>
      <div className="mt-3 divide-y divide-border rounded-md border border-border bg-background">
        {plan.itinerary.map((day) => (
          <div key={day.day} className="p-4">
            <p className="text-sm font-extrabold">{messages.result.dayLabel} {day.day} · {day.title}</p>
            {detail ? (
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {day.detailed.map((step) => (
                  <li key={step}>• {step}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{day.simple}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
