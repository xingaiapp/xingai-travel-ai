"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMemo, useSyncExternalStore } from "react"
import { ArrowRight, BriefcaseBusiness, Compass, HardDrive, Sparkles, Trash2 } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import { mockPlanResult } from "@/lib/mock-data"
import {
  clearHistory,
  parseHistory,
  readHistoryRaw,
  removeDecision,
  restoreDecision,
  subscribeHistory,
  winnerOf,
  type TripHistoryEntry,
} from "@/lib/trip-history"
import { getCityImage } from "@/lib/utils"

// Server and first client paint both see "no history"; the real list arrives after hydration (ADR 0003).
function useHistory() {
  const raw = useSyncExternalStore(subscribeHistory, readHistoryRaw, () => null)
  return useMemo(() => parseHistory(raw), [raw])
}

export function TripsPage() {
  const { messages, locale } = useLocale()
  const router = useRouter()
  const entries = useHistory()
  const t = messages.trips

  const dateFmt = useMemo(() => new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", year: "numeric" }), [locale])

  function reopen(entry: TripHistoryEntry) {
    restoreDecision(entry, mockPlanResult)
    router.push("/result")
  }

  function clearAll() {
    if (window.confirm(t.clearConfirm)) clearHistory()
  }

  return (
    <main className="decision-grid-bg flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-black tracking-tight sm:text-4xl">
              <BriefcaseBusiness className="h-7 w-7 text-primary" aria-hidden />
              {t.title}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{t.subtitle}</p>
          </div>
          {entries.length > 0 ? (
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm font-bold text-muted-foreground transition hover:border-destructive/40 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" aria-hidden />
              {t.clearAll}
            </button>
          ) : null}
        </div>

        <p className="mb-4 flex items-start gap-2 rounded-md border border-border bg-muted/40 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
          <HardDrive className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>
            {t.localOnly}
            {entries.length > 0 ? <> · {t.count.replace("{n}", String(entries.length))}</> : null}
          </span>
        </p>

        {entries.length === 0 ? (
          <section className="rounded-md border border-dashed border-border bg-card px-5 py-10 text-center">
            <Compass className="mx-auto h-8 w-8 text-primary" aria-hidden />
            <h2 className="mt-3 text-lg font-extrabold">{t.emptyTitle}</h2>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">{t.emptyBody}</p>
            <Link
              href="/decide"
              className="mt-5 inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-extrabold text-primary-foreground shadow-lg shadow-primary/20"
            >
              {t.emptyCta} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </section>
        ) : (
          <ul className="grid gap-3">
            {entries.map((entry) => {
              const winner = winnerOf(entry.compare)
              const others = entry.compare.destinations.filter((d) => d !== winner).map((d) => d.name)
              const { trip } = entry
              const dates = trip.dates.from && trip.dates.to ? `${trip.dates.from} → ${trip.dates.to}` : null
              return (
                <li key={entry.id} className="overflow-hidden rounded-md border border-border bg-card shadow-sm">
                  <div className="grid sm:grid-cols-[9rem_1fr]">
                    <div
                      className="h-28 bg-muted bg-cover bg-center sm:h-full"
                      style={{ backgroundImage: `url('${getCityImage(`${winner.name} ${winner.country}`)}')` }}
                      aria-hidden
                    />
                    <div className="min-w-0 p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-black">
                          {winner.name}, {winner.country}
                        </h2>
                        {entry.mode === "inspire" ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 px-2 py-0.5 text-[0.7rem] font-bold text-amber-700 dark:text-amber-300">
                            <Sparkles className="h-3 w-3" aria-hidden />
                            {messages.home.modeSurprise}
                          </span>
                        ) : null}
                      </div>
                      {others.length > 0 ? (
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">vs {others.join(" · ")}</p>
                      ) : null}
                      <p className="mt-2 text-sm text-muted-foreground">
                        {[
                          trip.origin || null,
                          dates,
                          `${trip.budget.currency} ${trip.budget.amount.toLocaleString(locale)}`,
                          `${trip.travelers.count} ${messages.travelers[trip.travelers.type]}`,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs text-muted-foreground">
                          {t.savedOn} {dateFmt.format(new Date(entry.savedAt))}
                        </span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => removeDecision(entry.id)}
                            className="inline-flex h-9 items-center rounded-md px-3 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-destructive"
                          >
                            {t.remove}
                          </button>
                          <button
                            type="button"
                            onClick={() => reopen(entry)}
                            className="inline-flex h-9 items-center gap-1 rounded-md border border-primary bg-primary/5 px-3 text-sm font-extrabold text-primary transition hover:bg-primary/10"
                          >
                            {t.open} <ArrowRight className="h-4 w-4" aria-hidden />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </main>
  )
}
