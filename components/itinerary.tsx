"use client"

import { Bed, CalendarDays, Plane, Ticket } from "lucide-react"
import { useState } from "react"
import { useLocale } from "@/components/locale-provider"
import type { BookItem, PlanResult } from "@/lib/types"
import { cn } from "@/lib/utils"

function BookIcon({ type }: Readonly<{ type: BookItem["type"] }>) {
  if (type === "flight") return <Plane className="h-4 w-4" aria-hidden />
  if (type === "hotel") return <Bed className="h-4 w-4" aria-hidden />
  return <Ticket className="h-4 w-4" aria-hidden />
}

export function Itinerary({ plan }: Readonly<{ plan: PlanResult }>) {
  const { messages } = useLocale()
  const [detail, setDetail] = useState(false)

  return (
    <section id="full-plan" className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <CalendarDays className="h-5 w-5 text-primary" aria-hidden />
        <h2 className="text-base font-extrabold">{messages.result.bookFirst}</h2>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {plan.bookFirst.map((item, index) => (
          <div key={item.label} className="rounded-xl border border-border bg-background p-3">
            <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BookIcon type={item.type} />
            </span>
            <p className="text-sm font-extrabold">{index + 1}. {item.label}</p>
            {item.note ? <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.note}</p> : null}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <h3 className="text-base font-extrabold">{messages.result.itinerary}</h3>
        <div className="grid grid-cols-2 rounded-xl border border-border bg-background p-1 text-xs font-bold">
          <button type="button" className={cn("rounded-lg px-3 py-1.5", !detail && "bg-primary text-primary-foreground")} onClick={() => setDetail(false)}>
            {messages.result.simple}
          </button>
          <button type="button" className={cn("rounded-lg px-3 py-1.5", detail && "bg-primary text-primary-foreground")} onClick={() => setDetail(true)}>
            {messages.result.detailed}
          </button>
        </div>
      </div>
      <div className="mt-3 divide-y divide-border rounded-xl border border-border bg-background">
        {plan.itinerary.map((day) => (
          <div key={day.day} className="p-4">
            <p className="text-sm font-extrabold">Day {day.day} · {day.title}</p>
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
