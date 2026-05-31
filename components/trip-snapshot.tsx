"use client"

import { ClipboardCheck } from "lucide-react"
import type { TripContext } from "@/lib/types"
import { useLocale } from "@/components/locale-provider"

function formatDates(ctx: TripContext) {
  if (!ctx.dates.from || !ctx.dates.to) return "-"
  return `${ctx.dates.from} → ${ctx.dates.to} (${ctx.dates.nights} nights)`
}

function vibe(notes?: string) {
  if (!notes) return "-"
  return notes.split(/[,，.]/).map((item) => item.trim()).filter(Boolean).slice(0, 2).join(", ")
}

export function TripSnapshot({ trip }: Readonly<{ trip: TripContext }>) {
  const { messages } = useLocale()
  const complete = !!trip.origin && !!trip.dates.from && !!trip.dates.to && trip.budget.amount > 0 && trip.travelers.count > 0
  const rows = [
    [messages.snapshot.origin, trip.origin || "-"],
    [messages.snapshot.dates, formatDates(trip)],
    [messages.snapshot.budget, `≈ ${trip.budget.currency} ${trip.budget.amount.toLocaleString()}`],
    [messages.snapshot.travelers, `${trip.travelers.count} ${trip.travelers.type}`],
    [messages.snapshot.vibe, vibe(trip.notes)],
    [messages.snapshot.avoid, trip.avoid || "-"],
  ]

  return (
    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5 lg:sticky lg:top-24">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ClipboardCheck className="h-4 w-4" aria-hidden />
          </span>
          <h2 className="text-base font-extrabold">{messages.snapshot.title}</h2>
        </div>
        {complete ? (
          <span className="rounded-full bg-emerald-500/12 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
            {messages.snapshot.looksGood}
          </span>
        ) : null}
      </div>
      <dl className="space-y-2">
        {rows.map(([label, val]) => (
          <div key={label} className="grid grid-cols-[6rem_1fr] gap-3 text-sm">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="text-right font-semibold text-foreground">{val}</dd>
          </div>
        ))}
      </dl>
      {!complete ? <p className="mt-4 rounded-xl bg-muted p-3 text-xs leading-relaxed text-muted-foreground">{messages.snapshot.missing}</p> : null}
    </section>
  )
}
