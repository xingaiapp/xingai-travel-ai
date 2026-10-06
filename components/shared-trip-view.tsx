"use client"

import Link from "next/link"
import { BookFirst } from "@/components/book-first"
import { DestinationCompare } from "@/components/destination-compare"
import { DecisionEvidence } from "@/components/decision-evidence"
import { Itinerary } from "@/components/itinerary"
import { TradeoffNote } from "@/components/tradeoff-note"
import { TripWarnings } from "@/components/trip-warnings"
import { useLocale } from "@/components/locale-provider"
import type { SharedTrip } from "@/lib/share-codec"

const ctaClass =
  "inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-extrabold text-primary-foreground shadow-sm sm:w-auto"

export function SharedTripView({ trip }: { trip: SharedTrip | null }) {
  const { messages } = useLocale()
  const r = messages.result
  const cta = (
    <Link href="/decide?ref=share" className={ctaClass}>
      {r.sharedCta}
    </Link>
  )

  if (!trip) {
    return (
      <main className="flex-1 px-4 pb-28 pt-12 text-center sm:px-6">
        <h1 className="text-2xl font-black">{r.sharedInvalidTitle}</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{r.sharedInvalidBody}</p>
        <div className="mt-6">{cta}</div>
      </main>
    )
  }

  const { c: compare, p: plan } = trip
  const winner = compare.destinations.find((d) => d.isWinner) ?? compare.destinations[0]

  return (
    <main className="decision-grid-bg flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-primary">{r.sharedBadge}</p>
            <h1 className="mt-1 text-4xl font-black tracking-tight">
              {winner.name}, {winner.country}
            </h1>
          </div>
          {cta}
        </div>

        <div className="space-y-4">
          <DestinationCompare result={compare} />
          <DecisionEvidence winner={winner} budgetEstimate={plan?.budgetEstimate} />
          <TradeoffNote title={r.whyNot}>{compare.whyNotOthers}</TradeoffNote>
          {plan?.warnings?.length ? <TripWarnings warnings={plan.warnings} destination={plan.destination} /> : null}
          {plan ? (
            <>
              <section className="card-hover rounded-md border border-border bg-card p-4 shadow-sm sm:p-5">
                <h2 className="mb-4 text-base font-extrabold">{r.bookFirst}</h2>
                <BookFirst plan={plan} trip={null} />
              </section>
              <Itinerary plan={plan} />
            </>
          ) : null}
          <div className="pt-2 text-center">{cta}</div>
          <p className="rounded-md bg-muted p-3 text-center text-xs leading-relaxed text-muted-foreground">
            {r.sharedFrom} · {r.note}
          </p>
        </div>
      </div>
    </main>
  )
}
