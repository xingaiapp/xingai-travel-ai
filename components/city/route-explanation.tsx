"use client"

import { CheckCircle2, Users } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import { TradeoffNote } from "@/components/tradeoff-note"
import { cityText } from "@/lib/cities"
import type { TravelRoute } from "@/lib/cities/types"

/** Why this route / Good for / Trade-offs. Every route carries all three (ADR 0008 §3.2). */
export function RouteExplanation({ route }: Readonly<{ route: TravelRoute }>) {
  const { locale, messages } = useLocale()
  const m = messages.city

  return (
    <div className="grid gap-4">
      <section className="card-hover rounded-md border border-border bg-card p-4 shadow-sm sm:p-5" aria-labelledby="why-heading">
        <div className="mb-3 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden />
          <h3 id="why-heading" className="text-base font-extrabold">
            {m.whyTitle}
          </h3>
        </div>
        <ul className="space-y-2 text-sm leading-relaxed">
          {route.whyThisRoute.map((item) => (
            <li key={item.en}>• {cityText(item, locale)}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-md border border-border bg-card p-4 shadow-sm sm:p-5" aria-labelledby="goodfor-heading">
        <div className="mb-3 flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" aria-hidden />
          <h3 id="goodfor-heading" className="text-base font-extrabold">
            {m.goodForTitle}
          </h3>
        </div>
        <ul className="flex flex-wrap gap-2">
          {route.goodFor.map((item) => (
            <li key={item.en} className="rounded-md bg-secondary px-2.5 py-1 text-sm font-semibold text-secondary-foreground">
              {cityText(item, locale)}
            </li>
          ))}
        </ul>
      </section>

      <TradeoffNote title={m.tradeoffsTitle}>
        <ul className="space-y-1.5">
          {route.tradeoffs.map((item) => (
            <li key={item.en}>• {cityText(item, locale)}</li>
          ))}
        </ul>
      </TradeoffNote>
    </div>
  )
}
