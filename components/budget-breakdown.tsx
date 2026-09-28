"use client"

import { AlertTriangle, CheckCircle2, CircleAlert, Wallet } from "lucide-react"
import { useMemo } from "react"
import { useLocale } from "@/components/locale-provider"
import type { BudgetCategory, BudgetEstimate, BudgetVerdict } from "@/lib/budget"
import type { Messages } from "@/lib/i18n/types"
import type { TripContext } from "@/lib/types"
import { cn } from "@/lib/utils"

const categoryKey: Record<BudgetCategory, keyof Messages["result"]> = {
  flights: "catFlights",
  lodging: "catLodging",
  food: "catFood",
  activities: "catActivities",
  local_transport: "catLocalTransport",
}

// Status colors ship with an icon + label, never color alone.
const verdictStyle: Record<BudgetVerdict, { key: keyof Messages["result"]; icon: typeof CheckCircle2; className: string }> = {
  within: { key: "verdictWithin", icon: CheckCircle2, className: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300" },
  tight: { key: "verdictTight", icon: AlertTriangle, className: "bg-amber-500/15 text-amber-800 dark:text-amber-200" },
  over: { key: "verdictOver", icon: CircleAlert, className: "bg-red-500/12 text-red-700 dark:text-red-300" },
}

/** Range bar: solid up to the low estimate, lighter to the high estimate — the lighter part is the uncertainty. */
function RangeBar({ low, high, max, label }: Readonly<{ low: number; high: number; max: number; label: string }>) {
  const pct = (n: number) => `${Math.max((n / max) * 100, 0.8)}%`
  return (
    <div className="relative h-2 w-full rounded-full bg-muted" title={label} role="img" aria-label={label}>
      <div className="absolute inset-y-0 left-0 rounded-full bg-primary/30" style={{ width: pct(high) }} />
      <div className="absolute inset-y-0 left-0 rounded-full bg-primary" style={{ width: pct(low) }} />
    </div>
  )
}

export function BudgetBreakdown({ estimate, trip }: Readonly<{ estimate: BudgetEstimate; trip: TripContext }>) {
  const { messages, locale } = useLocale()
  const r = messages.result

  const money = useMemo(() => {
    try {
      const f = new Intl.NumberFormat(locale, { style: "currency", currency: estimate.currency, maximumFractionDigits: 0 })
      return (n: number) => f.format(n)
    } catch {
      return (n: number) => `${estimate.currency} ${n.toLocaleString(locale)}`
    }
  }, [estimate.currency, locale])
  const range = (lo: number, hi: number) => (lo === hi ? money(lo) : `${money(lo)} – ${money(hi)}`)

  const lineMax = Math.max(...estimate.lines.map((l) => l.high), 1)
  const totalMax = Math.max(estimate.totalHigh, estimate.budget, 1) * 1.08
  const verdict = estimate.verdict ? verdictStyle[estimate.verdict] : null
  const VerdictIcon = verdict?.icon
  const people = r.travelerCount.replace("{n}", String(trip.travelers.count))
  const date = new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(estimate.estimatedAt))

  return (
    <section className="rounded-md border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-base font-extrabold">
          <Wallet className="h-5 w-5 text-primary" aria-hidden />
          {r.budgetTitle}
        </h2>
        {verdict && VerdictIcon ? (
          <span className={cn("inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold", verdict.className)}>
            <VerdictIcon className="h-3.5 w-3.5" aria-hidden />
            {r[verdict.key]}
          </span>
        ) : null}
      </div>
      <p className="mb-4 text-xs text-muted-foreground">
        {r.budgetScope.replace("{travelers}", people).replace("{nights}", String(trip.dates.nights))}
      </p>

      {/* Total vs budget: the one comparison the verdict is about. */}
      <div className="mb-5 rounded-md bg-muted/40 p-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
          <span className="font-semibold text-muted-foreground">{r.budgetTotal}</span>
          <span className="text-lg font-black text-foreground">{range(estimate.totalLow, estimate.totalHigh)}</span>
        </div>
        {estimate.budget > 0 ? (
          <>
            <div className="relative mt-3 h-3 w-full rounded-full bg-muted" role="img"
              aria-label={`${r.budgetTotal} ${range(estimate.totalLow, estimate.totalHigh)} · ${r.budgetYours} ${money(estimate.budget)}`}
            >
              <div
                className="absolute inset-y-0 rounded-full bg-primary/35"
                style={{ left: `${(estimate.totalLow / totalMax) * 100}%`, width: `${Math.max(((estimate.totalHigh - estimate.totalLow) / totalMax) * 100, 0.8)}%` }}
              />
              <div className="absolute inset-y-0 left-0 rounded-full bg-primary" style={{ width: `${(estimate.totalLow / totalMax) * 100}%` }} />
              {/* Budget marker, with a surface ring so it reads on top of the fill. */}
              <div
                className="absolute -inset-y-1 w-0.5 rounded-full bg-foreground ring-2 ring-card"
                style={{ left: `calc(${(estimate.budget / totalMax) * 100}% - 1px)` }}
              />
            </div>
            <p className="mt-2 text-right text-xs text-muted-foreground">
              <span className="mr-1 inline-block h-2.5 w-0.5 translate-y-0.5 bg-foreground" aria-hidden />
              {r.budgetYours}: <span className="font-semibold text-foreground">{money(estimate.budget)}</span>
            </p>
          </>
        ) : null}
      </div>

      <ul className="space-y-3">
        {estimate.lines.map((line) => {
          const label = r[categoryKey[line.category]]
          return (
            <li key={line.category} className="grid gap-1.5 sm:grid-cols-[8rem_1fr_9rem] sm:items-center sm:gap-3">
              <span className="text-sm font-semibold text-foreground">{label}</span>
              <div className="order-last sm:order-none">
                <RangeBar low={line.low} high={line.high} max={lineMax} label={`${label}: ${range(line.low, line.high)}`} />
                {line.note ? <p className="mt-1 text-xs text-muted-foreground">{line.note}</p> : null}
              </div>
              <span className="text-sm font-bold text-foreground sm:text-right">{range(line.low, line.high)}</span>
            </li>
          )
        })}
      </ul>

      <p className="mt-4 border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">
        {r.budgetFootnote.replace("{date}", date)}
      </p>
    </section>
  )
}
