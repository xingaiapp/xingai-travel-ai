"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useReducer } from "react"
import { BookFirst } from "@/components/book-first"
import { DestinationCompare } from "@/components/destination-compare"
import { Itinerary } from "@/components/itinerary"
import { StepProgress } from "@/components/step-progress"
import { TradeoffNote } from "@/components/tradeoff-note"
import { TripWarnings } from "@/components/trip-warnings"
import { RelatedStories } from "@/components/related-stories"
import { ShareTripButton } from "@/components/share-trip-button"
import { LanguageMismatch } from "@/components/language-mismatch"
import { useLocale } from "@/components/locale-provider"
import { mockCompareResult, mockPlanResult, defaultTrip } from "@/lib/mock-data"
import { COMPARE_STORAGE, PLAN_STORAGE, REGENERATE_STORAGE, TRIP_STORAGE } from "@/lib/trip-history"
import type { CompareResult, PlanResult, TripContext } from "@/lib/types"


function readStorage<T>(key: string, fallback: T): T {
  try { return JSON.parse(sessionStorage.getItem(key) ?? "") as T } catch { return fallback }
}

interface PageState {
  compare: CompareResult
  trip: TripContext
  plan: PlanResult | null
  planReady: boolean
}

type PageAction =
  | { type: "HYDRATE"; compare: CompareResult; trip: TripContext; plan: PlanResult | null }
  | { type: "PLAN_READY"; plan: PlanResult }

function pageReducer(state: PageState, action: PageAction): PageState {
  switch (action.type) {
    case "HYDRATE":
      return {
        ...state,
        compare: action.compare,
        trip: action.trip,
        plan: action.plan,
        planReady: action.plan !== null,
      }
    case "PLAN_READY":
      return { ...state, plan: action.plan, planReady: true }
    default:
      return state
  }
}

function PlanSkeleton() {
  return (
    <div className="space-y-3 rounded-md border border-border bg-card p-4 sm:p-5">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-14 animate-pulse rounded-md bg-muted" />
      ))}
    </div>
  )
}

export function ResultPage() {
  const { messages, locale } = useLocale()
  const router = useRouter()

  const [state, dispatch] = useReducer(pageReducer, {
    compare: mockCompareResult,
    trip: defaultTrip,
    plan: null,
    planReady: false,
  })

  // Single hydration effect — one dispatch, no cascading setState
  useEffect(() => {
    dispatch({
      type: "HYDRATE",
      compare: readStorage(COMPARE_STORAGE, mockCompareResult),
      trip: readStorage(TRIP_STORAGE, defaultTrip),
      plan: readStorage<PlanResult | null>(PLAN_STORAGE, null),
    })
  }, [])

  // Poll for plan if not yet available (fire-and-forget from decide page)
  useEffect(() => {
    if (state.planReady) return
    const interval = window.setInterval(() => {
      const stored = readStorage<PlanResult | null>(PLAN_STORAGE, null)
      if (stored) dispatch({ type: "PLAN_READY", plan: stored })
    }, 500)
    const timeout = window.setTimeout(() => {
      dispatch({ type: "PLAN_READY", plan: mockPlanResult })
    }, 15000)
    return () => { window.clearInterval(interval); window.clearTimeout(timeout) }
  }, [state.planReady])

  const { compare, trip, plan, planReady } = state
  const winner = compare.destinations.find((item) => item.isWinner) ?? compare.destinations[0]

  return (
    <main className="decision-grid-bg flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-12">
      <div className="mx-auto max-w-6xl">
        <StepProgress active={3} />
        <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-muted-foreground">
          {messages.result.breadcrumb}
        </p>

        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-primary">{messages.result.bestFit}</p>
            <h1 className="mt-1 text-4xl font-black tracking-tight">{winner.name}, {winner.country}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <ShareTripButton compare={compare} plan={planReady ? plan : null} title={`${winner.name}, ${winner.country}`} />
            <Link
              href="/decide"
              className="inline-flex h-11 items-center rounded-md border border-border bg-card px-4 text-sm font-extrabold text-primary shadow-sm"
            >
              {messages.result.replan}
            </Link>
          </div>
        </div>

        {compare.generatedLocale && compare.generatedLocale !== locale ? (
          <div className="mb-4">
            <LanguageMismatch
              from={compare.generatedLocale}
              onRegenerate={() => {
                sessionStorage.setItem(REGENERATE_STORAGE, compare.mode ?? "compare")
                router.push("/decide")
              }}
            />
          </div>
        ) : null}

        <div className="space-y-4">
          <DestinationCompare result={compare} />
          <TradeoffNote title={messages.result.whyNot}>{compare.whyNotOthers}</TradeoffNote>

          {planReady && plan?.warnings?.length ? (
            <TripWarnings warnings={plan.warnings} destination={plan.destination} />
          ) : null}

          <div id="full-plan" className="space-y-4 scroll-mt-24">
            {planReady && plan ? (
              <>
                <section className="rounded-md border border-border bg-card p-4 shadow-sm sm:p-5">
                  <h2 className="mb-4 text-base font-extrabold">{messages.result.bookFirst}</h2>
                  <BookFirst plan={plan} trip={trip} />
                </section>
                <Itinerary plan={plan} />
              </>
            ) : (
              <PlanSkeleton />
            )}
          </div>

          <RelatedStories destinations={compare.destinations.map((item) => item.name)} />

          <p className="rounded-md bg-muted p-3 text-center text-xs leading-relaxed text-muted-foreground">
            {messages.result.note}
          </p>
        </div>
      </div>
    </main>
  )
}
