"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useReducer } from "react"
import { BookFirst } from "@/components/book-first"
import { BudgetBreakdown } from "@/components/budget-breakdown"
import { DestinationCompare } from "@/components/destination-compare"
import { DecisionEvidence } from "@/components/decision-evidence"
import { Itinerary } from "@/components/itinerary"
import { StepProgress } from "@/components/step-progress"
import { TradeoffNote } from "@/components/tradeoff-note"
import { TripWarnings } from "@/components/trip-warnings"
import { CityGuideLink } from "@/components/city/city-guide-link"
import { RelatedStories } from "@/components/related-stories"
import { ShareTripButton } from "@/components/share-trip-button"
import { PrintTripButton } from "@/components/print-trip-button"
import { UncertaintyNotes } from "@/components/uncertainty-notes"
import { LanguageMismatch } from "@/components/language-mismatch"
import { useLocale } from "@/components/locale-provider"
import { COMPARE_STORAGE, fetchPlan, PLAN_STORAGE, REGENERATE_STORAGE, TRIP_STORAGE } from "@/lib/trip-history"
import { recordTravelRetention } from "@/lib/travel-retention"
import type { CompareResult, PlanResult, TripContext } from "@/lib/types"
import { track } from "@vercel/analytics"


function readOptional<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

interface PageState {
  ready: boolean
  compare: CompareResult | null
  trip: TripContext | null
  plan: PlanResult | null
  planReady: boolean
  planFailed: boolean
}

type PageAction =
  | { type: "HYDRATE"; compare: CompareResult | null; trip: TripContext | null; plan: PlanResult | null }
  | { type: "PLAN_READY"; plan: PlanResult }
  | { type: "PLAN_FAILED" }
  | { type: "PLAN_RETRY" }

function pageReducer(state: PageState, action: PageAction): PageState {
  switch (action.type) {
    case "HYDRATE":
      return {
        ...state,
        ready: true,
        compare: action.compare,
        trip: action.trip,
        plan: action.plan,
        planReady: action.plan !== null,
        planFailed: false,
      }
    case "PLAN_READY":
      return { ...state, plan: action.plan, planReady: true, planFailed: false }
    case "PLAN_FAILED":
      return { ...state, plan: null, planReady: true, planFailed: true }
    case "PLAN_RETRY":
      return { ...state, plan: null, planReady: false, planFailed: false }
    default:
      return state
  }
}

function PlanSkeleton() {
  return (
    <div className="card-hover space-y-3 rounded-md border border-border bg-card p-4 sm:p-5">
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
    ready: false,
    compare: null,
    trip: null,
    plan: null,
    planReady: false,
    planFailed: false,
  })

  // Single hydration effect — one dispatch, no cascading setState
  useEffect(() => {
    dispatch({
      type: "HYDRATE",
      compare: readOptional<CompareResult>(COMPARE_STORAGE),
      trip: readOptional<TripContext>(TRIP_STORAGE),
      plan: readOptional<PlanResult>(PLAN_STORAGE),
    })
  }, [])

  // Poll for plan if not yet available (fire-and-forget from decide page)
  useEffect(() => {
    if (!state.ready || !state.compare || state.planReady) return
    const interval = window.setInterval(() => {
      const stored = readOptional<PlanResult>(PLAN_STORAGE)
      if (stored) dispatch({ type: "PLAN_READY", plan: stored })
    }, 500)
    const timeout = window.setTimeout(() => {
      dispatch({ type: "PLAN_FAILED" })
    }, 15000)
    return () => { window.clearInterval(interval); window.clearTimeout(timeout) }
  }, [state.ready, state.compare, state.planReady])

  function retryPlan() {
    if (!state.compare || !state.trip) return
    const pick = state.compare.destinations.find((item) => item.isWinner) ?? state.compare.destinations[0]
    if (!pick) return
    const destination = `${pick.name}, ${pick.country}`
    dispatch({ type: "PLAN_RETRY" })
    fetchPlan(destination, state.trip)
      .then((plan) => {
        sessionStorage.setItem(PLAN_STORAGE, JSON.stringify(plan))
        dispatch({ type: "PLAN_READY", plan })
      })
      .catch(() => dispatch({ type: "PLAN_FAILED" }))
  }

  const { compare, trip, plan, planReady, planFailed, ready } = state
  if (!ready || !compare || !trip) {
    return (
      <main className="decision-grid-bg flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-12">
        <div className="mx-auto max-w-6xl">
          {ready ? (
            <div className="card-hover rounded-md border border-border bg-card p-5">
              <p className="text-sm font-semibold text-foreground">{messages.result.noDecision}</p>
              <Link
                href="/decide"
                className="mt-4 inline-flex h-11 items-center rounded-md bg-primary px-4 text-sm font-extrabold text-primary-foreground"
              >
                {messages.result.noDecisionCta}
              </Link>
            </div>
          ) : (
            <PlanSkeleton />
          )}
        </div>
      </main>
    )
  }

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
          <div className="flex flex-wrap gap-2 no-print">
            {compare.demo ? null : (
              <ShareTripButton compare={compare} plan={planReady ? plan : null} title={`${winner.name}, ${winner.country}`} />
            )}
            <PrintTripButton />
            <Link
              href="/decide"
              onClick={() => {
                recordTravelRetention("compare_again")
                track("compare_again_clicked", { app: "travel", source: "result" })
              }}
              className="inline-flex h-11 items-center rounded-md border border-border bg-card px-4 text-sm font-extrabold text-primary shadow-sm"
            >
              {messages.result.replan}
            </Link>
            <Link
              href="/decide"
              onClick={() => {
                recordTravelRetention("plan_again")
                track("plan_again_clicked", { app: "travel", source: "result" })
              }}
              className="inline-flex h-11 items-center rounded-md border border-border bg-muted/50 px-4 text-sm font-extrabold text-foreground shadow-sm"
            >
              {messages.result.planAgain}
            </Link>
          </div>
        </div>

        {compare.demo ? (
          <p className="mb-4 rounded-md border border-amber-300 bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
            {messages.result.demoBanner}
          </p>
        ) : null}

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
          <DecisionEvidence winner={winner} budgetEstimate={planReady ? plan?.budgetEstimate : null} />
          <TradeoffNote title={messages.result.whyNot}>{compare.whyNotOthers}</TradeoffNote>
          <UncertaintyNotes />

          {planReady && plan?.warnings?.length ? (
            <TripWarnings warnings={plan.warnings} destination={plan.destination} />
          ) : null}

          <div id="full-plan" className="space-y-4 scroll-mt-24">
            {planReady && plan ? (
              <>
                {plan.budgetEstimate ? <BudgetBreakdown estimate={plan.budgetEstimate} trip={trip} /> : null}
                <section className="card-hover rounded-md border border-border bg-card p-4 shadow-sm sm:p-5">
                  <h2 className="mb-4 text-base font-extrabold">{messages.result.bookFirst}</h2>
                  <BookFirst plan={plan} trip={trip} />
                </section>
                <Itinerary plan={plan} />
              </>
            ) : planFailed ? (
              <div className="rounded-md border border-amber-300 bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
                <p>{messages.result.planFailed}</p>
                <button
                  type="button"
                  onClick={retryPlan}
                  className="mt-3 inline-flex h-11 items-center rounded-md bg-amber-800 px-4 text-sm font-extrabold text-amber-50 dark:bg-amber-200 dark:text-amber-950"
                >
                  {messages.result.tryAgain}
                </button>
              </div>
            ) : (
              <PlanSkeleton />
            )}
          </div>

          <RelatedStories destinations={compare.destinations.map((item) => item.name)} />
          <CityGuideLink destinations={compare.destinations.map((item) => item.name)} />

          <p className="rounded-md bg-muted p-3 text-center text-xs leading-relaxed text-muted-foreground">
            {messages.result.note}
          </p>
        </div>
      </div>
    </main>
  )
}
