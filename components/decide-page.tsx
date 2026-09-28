"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowDown, ChevronDown, MapPinned, Route, ShieldCheck, Sparkles } from "lucide-react"
import { DestinationCompare } from "@/components/destination-compare"
import { InspireForm } from "@/components/inspire-form"
import { LanguageMismatch } from "@/components/language-mismatch"
import { StepProgress } from "@/components/step-progress"
import { StylePaceSelector } from "@/components/style-pace-selector"
import { TripForm } from "@/components/trip-form"
import { TripSnapshot } from "@/components/trip-snapshot"
import { useLocale } from "@/components/locale-provider"
import { defaultTrip, mockCompareResult, mockPlanResult } from "@/lib/mock-data"
import type { CompareResult, InspireContext, TripContext } from "@/lib/types"
import {
  addDecision,
  attachPlan,
  COMPARE_STORAGE,
  fetchPlan,
  findDecision,
  INSPIRE_STORAGE,
  PLAN_STORAGE,
  REGENERATE_STORAGE,
  restoreDecision,
  TRIP_STORAGE,
  winnerOf,
} from "@/lib/trip-history"
import { cn, HELP_ANCHOR, OPEN_HELP_EVENT } from "@/lib/utils"
import { useEffect, useState, useRef } from "react"

const COMPARE_UPDATED_EVENT = "xingai-travel-compare-updated"

const defaultInspire: InspireContext = {
  vibe: "explore",
  flightRange: "medium",
  priority: "food",
  budget: { amount: 2000, currency: "USD" },
  travelers: { count: 2, type: "couple" },
}

type Mode = "compare" | "inspire"
type ModeResult = { data: CompareResult; trip: TripContext; historyId?: string }

function normalizeTrip(value: TripContext): TripContext {
  return {
    ...defaultTrip,
    ...value,
    dates: { ...defaultTrip.dates, ...value.dates },
    budget: { ...defaultTrip.budget, ...value.budget },
    travelers: { ...defaultTrip.travelers, ...value.travelers },
    region: value.region ?? defaultTrip.region,
  }
}

const REGIONS: TripContext["region"][] = [
  "anywhere", "europe", "asia", "north_america", "latin_america", "middle_east", "africa", "oceania",
]

// Travel Stories link here with ?places=Hong%20Kong&region=asia so the reader starts from their own constraints.
function withLinkPrefill(trip: TripContext): TripContext {
  const params = new URLSearchParams(window.location.search)
  const places = params.get("places")?.trim().slice(0, 120)
  const region = params.get("region") as TripContext["region"] | null
  if (!places && !region) return trip
  return {
    ...trip,
    ...(places ? { placesInMind: places } : {}),
    ...(region && REGIONS.includes(region) ? { region } : {}),
  }
}

export function DecidePage() {
  const router = useRouter()
  const { messages, locale } = useLocale()

  const [trip, setTrip] = useState<TripContext>(defaultTrip)
  const [tripReady, setTripReady] = useState(false)

  // Inspire Me mode
  const [inspireMode, setInspireMode] = useState(false)
  const [inspire, setInspire] = useState<InspireContext>(() => ({
    ...defaultInspire,
    budget: defaultTrip.budget,
    travelers: defaultTrip.travelers,
  }))

  // Each mode keeps its own result, so running Surprise me never wipes the comparison (and vice versa).
  const mode: Mode = inspireMode ? "inspire" : "compare"
  const [loadingMode, setLoadingMode] = useState<Mode | null>(null)
  const [errors, setErrors] = useState<Partial<Record<Mode, string>>>({})
  const [results, setResults] = useState<Partial<Record<Mode, ModeResult>>>({})
  const current = results[mode]
  const loading = loadingMode === mode
  const error = errors[mode] ?? ""
  // Which mode's result is currently in the /result session keys.
  const sessionModeRef = useRef<Mode | null>(null)
  const controllerRef = useRef<AbortController | null>(null)

  // Derive inspire budget/travelers from trip form (no setState in effect needed)
  const inspireWithTrip: InspireContext = { ...inspire, budget: trip.budget, travelers: trip.travelers }

  useEffect(() => {
    let stored = defaultTrip
    try {
      stored = normalizeTrip(JSON.parse(sessionStorage.getItem(TRIP_STORAGE) ?? "") as TripContext)
    } catch { /* keep default */ }
    try {
      const prefs = JSON.parse(sessionStorage.getItem(INSPIRE_STORAGE) ?? "") as Pick<InspireContext, "vibe" | "flightRange" | "priority">
      if (prefs?.vibe && prefs.flightRange && prefs.priority) setInspire((prev) => ({ ...prev, ...prefs }))
    } catch { /* keep default */ }
    setTrip(withLinkPrefill(stored))
    setTripReady(true)
  }, [])

  useEffect(() => {
    if (!tripReady) return
    sessionStorage.setItem(TRIP_STORAGE, JSON.stringify({ ...trip, locale }))
  }, [trip, locale, tripReady])

  useEffect(() => {
    const { vibe, flightRange, priority } = inspire
    sessionStorage.setItem(INSPIRE_STORAGE, JSON.stringify({ vibe, flightRange, priority }))
  }, [inspire])

  // Arriving from /result via "Regenerate in <language>": rerun that mode once the form is hydrated.
  useEffect(() => {
    if (!tripReady) return
    const pending = sessionStorage.getItem(REGENERATE_STORAGE) as Mode | null
    if (pending !== "compare" && pending !== "inspire") return
    sessionStorage.removeItem(REGENERATE_STORAGE)
    queueMicrotask(() => {
      setInspireMode(pending === "inspire")
      void runCompare(pending)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once after hydration
  }, [tripReady])

  async function runCompare(runMode: Mode = mode) {
    if (controllerRef.current) controllerRef.current.abort()
    const controller = new AbortController()
    controllerRef.current = controller
    const isInspire = runMode === "inspire"
    setLoadingMode(runMode)
    setErrors((prev) => ({ ...prev, [runMode]: "" }))

    try {
      const timeout = window.setTimeout(() => controller.abort(), 30000)

      let data: CompareResult

      if (isInspire) {
        // Inspire Me path — use /api/inspire
        const inspirePayload: InspireContext = {
          ...inspireWithTrip,
          dates: trip.dates.from ? trip.dates : undefined,
          origin: trip.origin || undefined,
          locale,
        }
        const res = await fetch("/api/inspire", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inspirePayload),
          signal: controller.signal,
        })
        window.clearTimeout(timeout)
        if (!res.ok) throw new Error("Inspire failed")
        data = (await res.json()) as CompareResult
      } else {
        // Normal compare path
        const payload = { ...trip, locale }
        const res = await fetch("/api/compare", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
        })
        window.clearTimeout(timeout)
        if (!res.ok) throw new Error("Compare failed")
        data = (await res.json()) as CompareResult
      }

      data = { ...data, mode: runMode, generatedLocale: locale }
      // For inspire mode: use trip dates/origin if filled, else defaultTrip as fallback
      const planCtx: TripContext = isInspire
        ? { ...defaultTrip, ...( trip.dates.from ? { dates: trip.dates, origin: trip.origin } : {}), budget: inspireWithTrip.budget, travelers: inspireWithTrip.travelers, locale }
        : { ...trip, locale }

      sessionStorage.setItem(TRIP_STORAGE, JSON.stringify(planCtx))
      sessionStorage.setItem(COMPARE_STORAGE, JSON.stringify(data))
      sessionStorage.removeItem(PLAN_STORAGE)
      sessionModeRef.current = runMode
      window.dispatchEvent(new Event(COMPARE_UPDATED_EVENT))

      const winner = winnerOf(data)
      // Only live results go into Trips history; the preview fallback below is never saved.
      const historyId = winner ? addDecision({ mode: runMode, trip: planCtx, compare: data }) : undefined
      setResults((prev) => ({ ...prev, [runMode]: { data, trip: planCtx, historyId } }))
      if (winner && historyId) {
        fetchPlan(`${winner.name}, ${winner.country}`, planCtx)
          .then((plan) => {
            attachPlan(historyId, plan)
            // Don't clobber the session if the user has since opened the other mode's result.
            if (sessionModeRef.current === runMode) sessionStorage.setItem(PLAN_STORAGE, JSON.stringify(plan))
          })
          .catch(() => {
            if (sessionModeRef.current === runMode) sessionStorage.setItem(PLAN_STORAGE, JSON.stringify(mockPlanResult))
          })
      }
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError" && controllerRef.current !== controller) return
      const fallback: CompareResult = { ...mockCompareResult, mode: runMode, generatedLocale: "en" }
      sessionStorage.setItem(COMPARE_STORAGE, JSON.stringify(fallback))
      sessionStorage.setItem(PLAN_STORAGE, JSON.stringify(mockPlanResult))
      sessionModeRef.current = runMode
      window.dispatchEvent(new Event(COMPARE_UPDATED_EVENT))
      setResults((prev) => ({ ...prev, [runMode]: { data: fallback, trip: defaultTrip } }))
      setErrors((prev) => ({ ...prev, [runMode]: messages.result.previewFallback }))
    } finally {
      if (controllerRef.current === controller) setLoadingMode(null)
    }
  }

  function openPlan() {
    if (!current) return
    if (sessionModeRef.current !== mode) {
      const saved = current.historyId ? findDecision(current.historyId) : undefined
      restoreDecision(saved ?? { trip: current.trip, compare: current.data, plan: current.historyId ? undefined : mockPlanResult }, mockPlanResult)
      sessionModeRef.current = mode
      window.dispatchEvent(new Event(COMPARE_UPDATED_EVENT))
    }
    router.push("/result")
  }

  const resultLocale = current?.data.generatedLocale
  const langMismatch = !!current && !loading && !!resultLocale && resultLocale !== locale

  const ctaLabel = inspireMode ? `${messages.home.inspireCta} →` : `${messages.home.compare} →`

  return (
    <main className="decision-grid-bg flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-12">
      <div className="mx-auto max-w-6xl">
        <HeroIntro />

        {/* Mode toggle */}
        <div className="mb-4 flex items-center gap-2 rounded-md border border-border bg-card p-1">
          <button
            type="button"
            onClick={() => setInspireMode(false)}
            className={cn(
              "flex h-9 flex-1 items-center justify-center gap-2 rounded-md text-sm font-bold transition",
              !inspireMode ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {messages.home.modeKnowTrip}
          </button>
          <button
            type="button"
            onClick={() => setInspireMode(true)}
            className={cn(
              "flex h-9 flex-1 items-center justify-center gap-2 rounded-md text-sm font-bold transition",
              inspireMode ? "surprise-tab-active" : "surprise-tab-idle"
            )}
          >
            <Sparkles
              className={cn(
                "h-4 w-4 shrink-0",
                !inspireMode && "text-amber-600 drop-shadow-[0_0_8px_rgba(251,191,36,0.55)] dark:text-amber-200"
              )}
              aria-hidden
            />
            {messages.home.modeSurprise}
          </button>
        </div>

        {inspireMode ? (
          <p className="mb-4 flex gap-2 rounded-md border border-amber-300/50 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-950 dark:border-amber-700/45 dark:bg-amber-950/35 dark:text-amber-100">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>
              {messages.home.inspireLegal}{" "}
              <Link href="/disclaimer" className="font-bold underline underline-offset-2 hover:text-amber-800 dark:hover:text-amber-50">
                {messages.chrome.disclaimer}
              </Link>
            </span>
          </p>
        ) : null}

        <div id="trip-form" className="grid scroll-mt-24 gap-4 lg:grid-cols-[1.15fr_.85fr]">
          <div className="space-y-4">
            {inspireMode ? (
              <InspireForm
                value={inspireWithTrip}
                onChange={(v) => setInspire((prev) => ({ ...prev, vibe: v.vibe, flightRange: v.flightRange, priority: v.priority }))}
                tripBudget={trip.budget}
                tripTravelers={trip.travelers}
              />
            ) : (
              <TripForm value={trip} onChange={setTrip} />
            )}

            <button
              type="button"
              onClick={() => runCompare()}
              disabled={loading}
              className={cn(
                "flex h-12 w-full items-center justify-center gap-2 rounded-md px-5 text-base font-extrabold shadow-lg transition hover:opacity-95 disabled:cursor-wait disabled:opacity-70",
                inspireMode
                  ? "surprise-tab-active"
                  : "bg-primary text-primary-foreground shadow-primary/20"
              )}
            >
              {loading
                ? messages.result.comparing
                : inspireMode
                ? <><Sparkles className="h-4 w-4" aria-hidden /> {ctaLabel}</>
                : ctaLabel}
            </button>
            <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4" aria-hidden />
              {messages.home.helper}
            </p>
          </div>

          {/* Sticky as one column so cards below the snapshot never slide underneath it. */}
          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <TripSnapshot trip={trip} />
            {!inspireMode && <StylePaceSelector value={trip} onChange={setTrip} />}
            {inspireMode && (
              <div className="rounded-md border border-border bg-card p-4 text-sm text-muted-foreground sm:p-5">
                <p className="mb-1 font-bold text-foreground">{messages.inspire.budgetNote}</p>
                <p className="text-xs leading-relaxed">{messages.inspire.budgetDateNote}</p>
                <button
                  type="button"
                  onClick={() => setInspireMode(false)}
                  className="mt-3 text-xs font-bold text-primary hover:underline"
                >
                  {messages.inspire.editBudgetDates}
                </button>
              </div>
            )}
          </div>
        </div>

        {error ? (
          <p className="mt-4 rounded-md border border-amber-300 bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
            {error}
          </p>
        ) : null}

        {langMismatch ? (
          <LanguageMismatch from={resultLocale} onRegenerate={() => runCompare()} />
        ) : null}

        {(loading || current) ? (
          <div className="mt-5">
            {loading ? <CompareSkeleton /> : current ? (
              <div>
                <DestinationCompare result={current.data} showPlanLink={false} />
                <button
                  type="button"
                  onClick={openPlan}
                  className="mt-4 flex h-11 w-full items-center justify-center rounded-md border border-primary bg-primary/5 text-sm font-extrabold text-primary hover:bg-primary/10"
                >
                  {messages.result.seePlan} →
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </main>
  )
}

function HeroIntro() {
  const { messages } = useLocale()
  const [helpOpen, setHelpOpen] = useState(false)

  useEffect(() => {
    const reveal = () => {
      setHelpOpen(true)
      requestAnimationFrame(() => document.getElementById(HELP_ANCHOR)?.scrollIntoView({ behavior: "smooth", block: "start" }))
    }
    if (window.location.hash === `#${HELP_ANCHOR}`) reveal()
    window.addEventListener(OPEN_HELP_EVENT, reveal)
    return () => window.removeEventListener(OPEN_HELP_EVENT, reveal)
  }, [])

  const helpSteps = [
    [messages.home.helpStep1Title, messages.home.helpStep1Body],
    [messages.home.helpStep2Title, messages.home.helpStep2Body],
    [messages.home.helpStep3Title, messages.home.helpStep3Body],
  ]

  return (
    <section className="mb-6 overflow-hidden rounded-md border border-border bg-card shadow-xl shadow-primary/10">
      <div className="relative sm:min-h-[35rem] lg:min-h-[34rem]">
        <div
          aria-hidden
          className="absolute inset-0 bg-[url('/assets/hero-travel-decision.webp')] bg-cover bg-[72%_center] lg:bg-center dark:brightness-[1.14] dark:saturate-[1.06]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,18,38,.22),rgba(7,18,38,.58)),linear-gradient(90deg,rgba(5,16,34,.91)_0%,rgba(9,34,75,.78)_38%,rgba(37,99,235,.16)_74%,rgba(255,255,255,.04)_100%)] dark:bg-[linear-gradient(180deg,rgba(2,6,23,.1),rgba(2,6,23,.46)),linear-gradient(90deg,rgba(2,6,23,.68)_0%,rgba(15,23,42,.52)_44%,rgba(37,99,235,.12)_78%,rgba(2,6,23,.04)_100%)]"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/28 to-transparent dark:from-black/16" />
        <div className="relative grid gap-6 p-5 text-white sm:p-8 lg:min-h-[34rem] lg:grid-cols-[1.05fr_.95fr] lg:p-10">
          <div className="flex max-w-2xl flex-col justify-center">
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-md border border-white/25 bg-white/14 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] shadow-sm backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              {messages.home.heroBadge}
            </span>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-sky-100">{messages.home.eyebrow}</p>
            <h1 className="hero-display-title mt-3 max-w-[11ch] text-5xl font-black tracking-normal drop-shadow-sm sm:max-w-[12ch] sm:text-6xl lg:max-w-none lg:text-7xl">
              <span className="block text-white">{messages.home.headlineLead}</span>
              <span className="hero-headline-accent">{messages.home.headlineAccent}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-sky-50/92 sm:text-lg">{messages.home.sub}</p>
            <div className="mt-6 flex justify-center">
              <a
                href="#trip-form"
                className="hero-primary-cta inline-flex h-12 items-center justify-center gap-2 px-5 text-sm font-extrabold shadow-lg transition hover:-translate-y-0.5"
              >
                {messages.home.primaryCta}
                <ArrowDown className="h-4 w-4" aria-hidden />
              </a>
            </div>
            <p className="mt-5 flex max-w-xl items-center gap-2 rounded-md border border-white/18 bg-white/10 px-3 py-2 text-xs font-semibold text-sky-50 backdrop-blur-md">
              <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden />
              {messages.home.trustLine}
            </p>
          </div>

          <div id={HELP_ANCHOR} className="flex items-center scroll-mt-24">
            <div className="hero-help-panel w-full rounded-md border bg-white/[.16] p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-5 dark:bg-slate-950/34">
              <button
                type="button"
                onClick={() => setHelpOpen((open) => !open)}
                aria-expanded={helpOpen}
                aria-controls="how-to-use-content"
                className="flex w-full items-start gap-3 text-left lg:pointer-events-none lg:cursor-default"
              >
                <span className="hero-help-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
                  <MapPinned className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <h2 className="hero-help-title text-lg font-black">{messages.home.helpTitle}</h2>
                    <ChevronDown className={cn("hero-help-chevron h-4 w-4 shrink-0 transition lg:hidden", helpOpen && "rotate-180")} aria-hidden />
                  </span>
                  <p className={cn("hero-help-sub mt-1 text-sm leading-relaxed", !helpOpen && "hidden lg:block")}>{messages.home.helpSub}</p>
                </span>
              </button>

              <div id="how-to-use-content" className={cn("mt-4 space-y-3", helpOpen ? "block" : "hidden lg:block")}>
                {helpSteps.map(([title, body], index) => (
                  <div key={title} className="hero-help-step grid grid-cols-[2rem_1fr] gap-3 rounded-md border p-3 shadow-sm">
                    <span className="hero-help-step-num flex h-8 w-8 items-center justify-center rounded-full text-sm font-black">
                      {index + 1}
                    </span>
                    <span>
                      <span className="hero-help-step-title block text-sm font-extrabold">{title}</span>
                      <span className="hero-help-step-body mt-0.5 block text-xs leading-relaxed">{body}</span>
                    </span>
                  </div>
                ))}
              </div>

              <div className={cn("hero-help-footer mt-4 rounded-md border p-3", helpOpen ? "block" : "hidden lg:block")}>
                <p className="flex items-center gap-2 text-xs font-bold">
                  <Route className="hero-help-footer-icon h-4 w-4 shrink-0" aria-hidden />
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
    <section className="rounded-md border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 h-5 w-36 animate-pulse rounded bg-muted" />
      <div className="grid gap-5 lg:grid-cols-[18rem_1fr]">
        <div className="h-48 animate-pulse rounded-md bg-muted" />
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
