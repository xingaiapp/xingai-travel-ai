"use client"

import Link from "next/link"
import { useState } from "react"
import { DestinationCompare } from "@/components/destination-compare"
import { Itinerary } from "@/components/itinerary"
import { StepProgress } from "@/components/step-progress"
import { TradeoffNote } from "@/components/tradeoff-note"
import { useLocale } from "@/components/locale-provider"
import { mockCompareResult, mockPlanResult } from "@/lib/mock-data"
import type { CompareResult, PlanResult } from "@/lib/types"

const COMPARE_STORAGE = "xingai-travel-compare-result"
const PLAN_STORAGE = "xingai-travel-plan-result"

export function ResultPage() {
  const { messages } = useLocale()
  const [compare] = useState<CompareResult>(() => {
    if (typeof window === "undefined") return mockCompareResult
    const storedCompare = sessionStorage.getItem(COMPARE_STORAGE)
    if (storedCompare) {
      try {
        return JSON.parse(storedCompare) as CompareResult
      } catch {
        return mockCompareResult
      }
    }
    return mockCompareResult
  })
  const [plan] = useState<PlanResult>(() => {
    if (typeof window === "undefined") return mockPlanResult
    const storedPlan = sessionStorage.getItem(PLAN_STORAGE)
    if (storedPlan) {
      try {
        return JSON.parse(storedPlan) as PlanResult
      } catch {
        return mockPlanResult
      }
    }
    return mockPlanResult
  })

  const winner = compare.destinations.find((item) => item.isWinner) ?? compare.destinations[0]

  return (
    <main className="decision-grid-bg flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-12">
      <div className="mx-auto max-w-6xl">
        <StepProgress active={3} />
        <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-muted-foreground">{messages.result.breadcrumb}</p>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-primary">{messages.result.bestFit}</p>
            <h1 className="mt-1 text-4xl font-black tracking-tight">{winner.name}, {winner.country}</h1>
          </div>
          <Link href="/decide" className="inline-flex h-11 items-center rounded-xl border border-border bg-card px-4 text-sm font-extrabold text-primary shadow-sm">
            {messages.result.replan}
          </Link>
        </div>

        <div className="space-y-4">
          <DestinationCompare result={compare} />
          <TradeoffNote title={messages.result.whyNot}>{compare.whyNotOthers}</TradeoffNote>
          <Itinerary plan={plan} />
          <p className="rounded-xl bg-muted p-3 text-center text-xs leading-relaxed text-muted-foreground">{messages.result.note}</p>
        </div>
      </div>
    </main>
  )
}
