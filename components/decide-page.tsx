"use client"

import { useRouter } from "next/navigation"
import { ArrowDown, CircleHelp, MapPinned, Route, ShieldCheck, Sparkles } from "lucide-react"
import { DestinationCompare } from "@/components/destination-compare"
import { StepProgress } from "@/components/step-progress"
import { StylePaceSelector } from "@/components/style-pace-selector"
import { TripForm } from "@/components/trip-form"
import { TripSnapshot } from "@/components/trip-snapshot"
import { useLocale } from "@/components/locale-provider"
import { defaultTrip, mockCompareResult, mockPlanResult } from "@/lib/mock-data"
import type { CompareResult, TripContext } from "@/lib/types"
import { useEffect, useState } from "react"

const TRIP_STORAGE = "xingai-travel-trip-context"
const COMPARE_STORAGE = "xingai-travel-compare-result"
const PLAN_STORAGE = "xingai-travel-plan-result"

export function DecidePage() {
  const router = useRouter()
  const { messages, locale } = useLocale()
  const [trip, setTrip] = useState<TripContext>(() => {
    if (typeof window === "undefined") return defaultTrip
    const stored = sessionStorage.getItem(TRIP_STORAGE)
    if (!stored) return defaultTrip
    try {
      return JSON.parse(stored) as TripContext
    } catch {
      return defaultTrip
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    sessionStorage.setItem(TRIP_STORAGE, JSON.stringify({ ...trip, locale }))
  }, [trip, locale])

  async function compareDestinations() {
    setLoading(true)
    setError("")
    const payload = { ...trip, locale }
    try {
      const controller = new AbortController()
      const timeout = window.setTimeout(() => controller.abort(), 30000)
      const response = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
      window.clearTimeout(timeout)
      if (!response.ok) throw new Error("Compare failed")
      const data = (await response.json()) as CompareResult
      sessionStorage.setItem(COMPARE_STORAGE, JSON.stringify(data))
      const winner = data.destinations.find((item) => item.isWinner) ?? data.destinations[0]
      if (winner) {
        const planResponse = await fetch("/api/plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ destination: `${winner.name}, ${winner.country}`, tripContext: payload }),
          signal: controller.signal,
        })
        if (planResponse.ok) {
          sessionStorage.setItem(PLAN_STORAGE, JSON.stringify(await planResponse.json()))
        }
      }
    } catch {
      sessionStorage.setItem(COMPARE_STORAGE, JSON.stringify(mockCompareResult))
      sessionStorage.setItem(PLAN_STORAGE, JSON.stringify(mockPlanResult))
      setError("Using preview data because live comparison is unavailable.")
    } finally {
      setLoading(false)
      window.setTimeout(() => router.push("/result"), 450)
    }
  }

  return (
    <main className="decision-grid-bg flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-12">
      <div className="mx-auto max-w-6xl">
        <HeroIntro />

        <div id="trip-form" className="grid scroll-mt-24 gap-4 lg:grid-cols-[1.15fr_.85fr]">
          <div className="space-y-4">
            <TripForm value={trip} onChange={setTrip} />
            <button
              type="button"
              onClick={compareDestinations}
              disabled={loading}
              className="flex h-13 w-full items-center justify-center rounded-xl bg-primary px-5 text-base font-extrabold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-95 disabled:cursor-wait disabled:opacity-70"
            >
              {loading ? "Comparing..." : `${messages.home.compare} →`}
            </button>
            <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4" aria-hidden />
              {messages.home.helper}
            </p>
          </div>

          <div className="space-y-4">
            <TripSnapshot trip={trip} />
            <StylePaceSelector value={trip} onChange={setTrip} />
          </div>
        </div>

        {error ? <p className="mt-4 rounded-xl border border-amber-300 bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">{error}</p> : null}

        <div className="mt-5">
          {loading ? <CompareSkeleton /> : <DestinationCompare result={mockCompareResult} />}
        </div>
      </div>
    </main>
  )
}

function HeroIntro() {
  const { messages } = useLocale()
  const helpSteps = [
    [messages.home.helpStep1Title, messages.home.helpStep1Body],
    [messages.home.helpStep2Title, messages.home.helpStep2Body],
    [messages.home.helpStep3Title, messages.home.helpStep3Body],
  ]

  return (
    <section className="mb-6 overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-xl shadow-primary/10">
      <div className="relative min-h-[31rem] bg-[url('/assets/context-mock.jpg')] bg-cover bg-center sm:min-h-[25rem] lg:min-h-[30rem]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,18,42,.88),rgba(20,78,160,.66)_48%,rgba(20,78,160,.12))]" />
        <div className="relative grid min-h-[31rem] gap-6 p-5 text-white sm:min-h-[25rem] sm:p-8 lg:min-h-[30rem] lg:grid-cols-[1.1fr_.9fr] lg:p-10">
          <div className="flex max-w-2xl flex-col justify-center">
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              {messages.home.heroBadge}
            </span>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-sky-100">{messages.home.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              {messages.home.headline}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-sky-50/90 sm:text-lg">{messages.home.sub}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#trip-form"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-extrabold text-primary shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
              >
                {messages.home.primaryCta}
                <ArrowDown className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="#how-to-use"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/15"
              >
                <CircleHelp className="h-4 w-4" aria-hidden />
                {messages.home.secondaryCta}
              </a>
            </div>

            <p className="mt-5 flex max-w-xl items-center gap-2 text-xs font-semibold text-sky-100">
              <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden />
              {messages.home.trustLine}
            </p>
          </div>

          <div id="how-to-use" className="flex items-center">
            <div className="w-full rounded-2xl border border-white/22 bg-white/14 p-4 shadow-2xl shadow-black/20 backdrop-blur-md sm:p-5">
              <div className="mb-4 flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-primary">
                  <MapPinned className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h2 className="text-lg font-black">{messages.home.helpTitle}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-sky-50/85">{messages.home.helpSub}</p>
                </div>
              </div>

              <div className="space-y-3">
                {helpSteps.map(([title, body], index) => (
                  <div key={title} className="grid grid-cols-[2rem_1fr] gap-3 rounded-xl bg-white/12 p-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-black text-primary">
                      {index + 1}
                    </span>
                    <span>
                      <span className="block text-sm font-extrabold">{title}</span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-sky-50/82">{body}</span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-white/18 bg-slate-950/24 p-3">
                <p className="flex items-center gap-2 text-xs font-bold text-sky-50">
                  <Route className="h-4 w-4 text-sky-200" aria-hidden />
                  {messages.home.helper}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-card/96 px-4 py-4 sm:px-6">
        <StepProgress active={1} />
      </div>
    </section>
  )
}

function CompareSkeleton() {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 h-5 w-36 animate-pulse rounded bg-muted" />
      <div className="grid gap-5 lg:grid-cols-[18rem_1fr]">
        <div className="h-48 animate-pulse rounded-xl bg-muted" />
        <div className="space-y-3">
          <div className="h-8 w-2/3 animate-pulse rounded bg-muted" />
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="h-12 animate-pulse rounded bg-muted" />
            <div className="h-12 animate-pulse rounded bg-muted" />
            <div className="h-12 animate-pulse rounded bg-muted" />
          </div>
          <div className="h-24 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </section>
  )
}
