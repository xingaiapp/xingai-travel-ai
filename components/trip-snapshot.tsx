"use client"

import { ClipboardCheck } from "lucide-react"
import type { TripContext, TripRegion } from "@/lib/types"
import type { Messages } from "@/lib/i18n/types"
import { useLocale } from "@/components/locale-provider"

function formatDates(ctx: TripContext, nightsLabel: string) {
  if (!ctx.dates.from || !ctx.dates.to) return "-"
  const nights = nightsLabel.replace("{n}", String(ctx.dates.nights))
  return `${ctx.dates.from} → ${ctx.dates.to} (${nights})`
}

function excerpt(notes?: string) {
  if (!notes) return "-"
  const parts = notes.split(/[,，.]/).map((item) => item.trim()).filter(Boolean).slice(0, 3).join(", ")
  return parts.length > 42 ? parts.slice(0, 40) + "…" : parts
}

const regionLabelKeys: Record<TripRegion, keyof Messages["form"]["regions"]> = {
  anywhere: "anywhere",
  europe: "europe",
  asia: "asia",
  north_america: "northAmerica",
  latin_america: "latinAmerica",
  middle_east: "middleEast",
  africa: "africa",
  oceania: "oceania",
}

export function TripSnapshot({ trip }: Readonly<{ trip: TripContext }>) {
  const { messages } = useLocale()
  const complete = !!trip.origin && !!trip.dates.from && !!trip.dates.to && trip.budget.amount > 0 && trip.travelers.count > 0
  const rows = [
    [messages.snapshot.origin, trip.origin || "-"],
    [messages.snapshot.region, messages.form.regions[regionLabelKeys[trip.region ?? "anywhere"]]],
    [messages.snapshot.placesInMind, trip.placesInMind || "-"],
    [messages.snapshot.dates, formatDates(trip, messages.snapshot.nights)],
    [messages.snapshot.budget, `≈ ${trip.budget.currency} ${trip.budget.amount.toLocaleString()}`],
    [messages.snapshot.travelers, `${trip.travelers.count} ${messages.travelers[trip.travelers.type]}`],
    // Vibe always reflects the Style & Pace picks; free-text wishes get their own row.
    [messages.snapshot.vibe, [...trip.style.map((s) => messages.style[s]), messages.style[trip.pace]].join(" · ")],
    [messages.snapshot.notes, excerpt(trip.notes)],
    [messages.snapshot.avoid, trip.avoid || "-"],
  ]

  return (
    <section className="card-hover rounded-md border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
            <ClipboardCheck className="h-4 w-4" aria-hidden />
          </span>
          <h2 className="text-base font-extrabold">{messages.snapshot.title}</h2>
        </div>
        {complete ? (
          <span className="rounded-md bg-emerald-500/12 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
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
      {!complete ? <p className="mt-4 rounded-md bg-muted p-3 text-xs leading-relaxed text-muted-foreground">{messages.snapshot.missing}</p> : null}
    </section>
  )
}
