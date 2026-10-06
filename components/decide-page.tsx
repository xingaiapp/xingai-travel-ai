"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, ChevronDown, MapPinned, Route, ShieldCheck, Sparkles } from "lucide-react"
import { TravelMapProgress } from "@/components/city/travel-map-progress"
import { DestinationCompare } from "@/components/destination-compare"
import { InspireForm } from "@/components/inspire-form"
import { LanguageMismatch } from "@/components/language-mismatch"
import { StepProgress } from "@/components/step-progress"
import { StylePaceSelector } from "@/components/style-pace-selector"
import { TripForm } from "@/components/trip-form"
import { TripSnapshot } from "@/components/trip-snapshot"
import { useLocale } from "@/components/locale-provider"
import { getCity } from "@/lib/cities"
import { applyCityMapPrefill, parseCityMap, readCityMapRaw } from "@/lib/city-map"
import { defaultFutureDates, defaultTrip, isPastDate } from "@/lib/mock-data"
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

class DecisionRequestError extends Error {
  code: string
  constructor(code: string) {
    super("Decision request failed")
    this.code = code
  }
}

async function decisionError(res: Response): Promise<DecisionRequestError> {
  try {
    const body = (await res.json()) as { code?: string }
    return new DecisionRequestError(body.code ?? "")
  } catch {
    return new DecisionRequestError("")
  }
}

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
  const merged: TripContext = {
    ...defaultTrip,
    ...value,
    dates: { ...defaultTrip.dates, ...value.dates },
    budget: { ...defaultTrip.budget, ...value.budget },
    travelers: { ...defaultTrip.travelers, ...value.travelers },
    region: value.region ?? defaultTrip.region,
  }
  if (isPastDate(merged.dates.from) || isPastDate(merged.dates.to)) {
    merged.dates = defaultFutureDates(merged.dates.nights || 4)
  }
  return merged
}

const REGIONS: TripContext["region"][] = [
  "anywhere", "europe", "asia", "north_america", "latin_america", "middle_east", "africa", "oceania",
]

// Travel Stories / city search link here with ?places=…&region=… so the reader starts from their own constraints.
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

/** Want → empty placesInMind; Been → avoid. URL / session text wins. */
function withCityMapPrefill(trip: TripContext): TripContext {
  return applyCityMapPrefill(trip, parseCityMap(readCityMapRaw()), (slug) => getCity(slug)?.name.en)
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
  const [errorCodes, setErrorCodes] = useState<Partial<Record<Mode, string>>>({})
  /** Field validation (empty origin, dates) — not an API failure; no Try again. */
  const [fieldNotice, setFieldNotice] = useState("")
  const [results, setResults] = useState<Partial<Record<Mode, ModeResult>>>({})
  const current = results[mode]
  const loading = loadingMode === mode
  const error = errors[mode] ?? ""
  const errorCode = errorCodes[mode] ?? ""
  // Which mode's result is currently in the /result session keys.
  const sessionModeRef = useRef<Mode | null>(null)
  const controllerRef = useRef<AbortController | null>(null)

  function focusTripOrigin() {
    queueMicrotask(() => {
      const el = document.getElementById("trip-origin") as HTMLInputElement | null
      el?.scrollIntoView({ behavior: "smooth", block: "center" })
      el?.focus()
    })
  }

  // Derive inspire budget/travelers from trip form (no setState in effect needed)
  const inspireWithTrip: InspireContext = { ...inspire, budget: trip.budget, travelers: trip.travelers }

  function patchTrip(next: TripContext) {
    setTrip(next)
    if (next.origin.trim()) setFieldNotice((prev) => (prev === messages.form.originRequired ? "" : prev))
  }

  useEffect(() => {
    let stored = defaultTrip
    try {
      stored = normalizeTrip(JSON.parse(sessionStorage.getItem(TRIP_STORAGE) ?? "") as TripContext)
    } catch { /* keep default */ }
    try {
      const prefs = JSON.parse(sessionStorage.getItem(INSPIRE_STORAGE) ?? "") as Pick<InspireContext, "vibe" | "flightRange" | "priority">
      // sessionStorage only exists after mount; restoring saved prefs here is intentional.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (prefs?.vibe && prefs.flightRange && prefs.priority) setInspire((prev) => ({ ...prev, ...prefs }))
    } catch { /* keep default */ }
    setTrip(withCityMapPrefill(withLinkPrefill(stored)))
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
    setFieldNotice("")

    if (!isInspire) {
      if (!trip.origin.trim()) {
        setLoadingMode(null)
        setFieldNotice(messages.form.originRequired)
        focusTripOrigin()
        return
      }
      if (!trip.dates.from || !trip.dates.to || isPastDate(trip.dates.from) || isPastDate(trip.dates.to)) {
        setLoadingMode(null)
        setFieldNotice(messages.form.datesPastError)
        return
      }
      if (new Date(trip.dates.to).getTime() < new Date(trip.dates.from).getTime()) {
        setLoadingMode(null)
        setFieldNotice(messages.form.datesOrderError)
        return
      }
    }

    try {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "decide_start", mode: runMode }),
        keepalive: true,
      }).catch(() => {})

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
        if (!res.ok) throw await decisionError(res)
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
        if (!res.ok) throw await decisionError(res)
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
      // A demo sample is labeled and is not this traveler's decision, so it stays out of Trips.
      const historyId = data.demo || !winner ? undefined : addDecision({ mode: runMode, trip: planCtx, compare: data })
      setResults((prev) => ({ ...prev, [runMode]: { data, trip: planCtx, historyId } }))
      setErrors((prev) => ({ ...prev, [runMode]: "" }))
      setErrorCodes((prev) => ({ ...prev, [runMode]: "" }))
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "recommendation_view", mode: runMode }),
        keepalive: true,
      }).catch(() => {})
      if (winner) {
        fetchPlan(`${winner.name}, ${winner.country}`, planCtx)
          .then((plan) => {
            if (historyId) attachPlan(historyId, plan)
            // Don't clobber the session if the user has since opened the other mode's result.
            if (sessionModeRef.current === runMode) sessionStorage.setItem(PLAN_STORAGE, JSON.stringify(plan))
          })
          .catch(() => {
            if (sessionModeRef.current === runMode) sessionStorage.removeItem(PLAN_STORAGE)
          })
      }
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError" && controllerRef.current !== controller) return
      const code = e instanceof DecisionRequestError ? e.code : ""
      const message = code === "RATE_LIMIT" ? messages.result.rateLimited : messages.result.decisionFailed
      setErrors((prev) => ({ ...prev, [runMode]: message }))
      setErrorCodes((prev) => ({ ...prev, [runMode]: code }))
    } finally {
      if (controllerRef.current === controller) setLoadingMode(null)
    }
  }

  function openPlan() {
    if (!current) return
    if (sessionModeRef.current !== mode) {
      const saved = current.historyId ? findDecision(current.historyId) : undefined
      restoreDecision(saved ?? { trip: current.trip, compare: current.data })
      sessionModeRef.current = mode
      window.dispatchEvent(new Event(COMPARE_UPDATED_EVENT))
    }
    router.push("/result")
  }

  const resultLocale = current?.data.generatedLocale
  const langMismatch = !!current && !loading && !!resultLocale && resultLocale !== locale

  const ctaLabel = inspireMode ? `${messages.home.inspireCta} →` : `${messages.home.compare} →`

  return (
    <main className="flex-1 pb-28 lg:pb-12">
      <HeroIntro />

      <div className="decision-grid-bg px-4 pt-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <TravelMapProgress variant="decide" className="mb-4" />

        {/* Mode toggle */}
        <div className="mb-4 flex items-center gap-2 rounded-full border border-border bg-card p-1">
          <button
            type="button"
            onClick={() => setInspireMode(false)}
            className={cn(
              "flex h-11 flex-1 items-center justify-center gap-2 rounded-full text-sm font-bold transition",
              !inspireMode ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {messages.home.modeKnowTrip}
          </button>
          <button
            type="button"
            onClick={() => setInspireMode(true)}
            className={cn(
              "flex h-11 flex-1 items-center justify-center gap-2 rounded-full text-sm font-bold transition",
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
              <TripForm
                value={trip}
                onChange={patchTrip}
                originInvalid={fieldNotice === messages.form.originRequired}
              />
            )}

            <button
              type="button"
              onClick={() => runCompare()}
              disabled={loading}
              className={cn(
                "flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-base font-bold shadow-[0_8px_20px_color-mix(in_oklch,var(--primary)_28%,transparent)] transition hover:opacity-95 disabled:cursor-wait disabled:opacity-70",
                inspireMode
                  ? "surprise-tab-active"
                  : "bg-primary text-primary-foreground"
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
            {!inspireMode && <StylePaceSelector value={trip} onChange={patchTrip} />}
            {inspireMode && (
              <div className="card-hover rounded-md border border-border bg-card p-4 text-sm text-muted-foreground sm:p-5">
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

        {current?.data.demo ? (
          <p className="mt-4 rounded-md border border-amber-300 bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
            {messages.result.demoBanner}
          </p>
        ) : null}

        {fieldNotice ? (
          <p
            id="trip-origin-error"
            role="alert"
            aria-live="assertive"
            className="mt-4 rounded-md border border-amber-300 bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200"
          >
            {fieldNotice}
          </p>
        ) : null}

        {error ? (
          <div className="mt-4 rounded-md border border-amber-300 bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
            <p>{error}</p>
            {errorCode !== "RATE_LIMIT" ? (
              <button
                type="button"
                onClick={() => runCompare()}
                disabled={loading}
                className="mt-3 inline-flex h-11 items-center rounded-md bg-amber-800 px-4 text-sm font-extrabold text-amber-50 disabled:opacity-70 dark:bg-amber-200 dark:text-amber-950"
              >
                {messages.result.tryAgain}
              </button>
            ) : null}
          </div>
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
                  className="mt-4 flex h-11 w-full items-center justify-center rounded-full border border-primary bg-primary/5 text-sm font-bold text-primary hover:bg-primary/10"
                >
                  {messages.result.seePlan} →
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
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
    <section className="w-full">
      {/* Full-bleed photo stage — same edge-to-edge width as Home (no inset card). */}
      <div className="relative w-full overflow-hidden min-h-[min(58svh,28rem)] sm:min-h-[22rem] lg:min-h-[28rem]">
        <div
          aria-hidden
          className="absolute inset-0 bg-[url('/assets/hero-travel-decision.webp')] bg-cover bg-[72%_center] lg:bg-center dark:brightness-[1.08] dark:saturate-[1.04]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--background)_22%,transparent)_0%,transparent_40%,color-mix(in_oklch,var(--background)_45%,transparent)_72%,color-mix(in_oklch,var(--background)_88%,transparent)_100%)] sm:bg-[linear-gradient(105deg,color-mix(in_oklch,var(--background)_72%,transparent)_0%,color-mix(in_oklch,var(--background)_36%,transparent)_40%,transparent_72%)]"
        />
        <div className="relative mx-auto grid h-full w-full max-w-6xl gap-6 px-4 pb-8 pt-10 sm:px-6 lg:min-h-[28rem] lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-12">
          <div className="flex max-w-2xl flex-col justify-end lg:justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground [text-shadow:0_1px_2px_color-mix(in_oklch,var(--background)_70%,transparent)]">
              {messages.home.eyebrow}
            </p>
            <h1 className="hero-display-title mt-3 text-[1.65rem] font-semibold leading-[1.15] tracking-tight text-foreground [text-shadow:0_1px_2px_color-mix(in_oklch,var(--background)_70%,transparent)] sm:text-5xl">
              <span className="block">{messages.home.headlineLead}</span>
              <span className="mt-1 block text-primary">{messages.home.headlineAccent}</span>
            </h1>
            <p className="mt-4 hidden max-w-xl text-base leading-relaxed text-foreground [text-shadow:0_1px_2px_color-mix(in_oklch,var(--background)_65%,transparent)] sm:block sm:text-lg">
              {messages.home.sub}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#trip-form"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-[0_8px_20px_color-mix(in_oklch,var(--primary)_28%,transparent)]"
              >
                {messages.home.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <button
                type="button"
                onClick={() => {
                  setHelpOpen(true)
                  requestAnimationFrame(() => {
                    const target =
                      window.matchMedia("(min-width: 1024px)").matches
                        ? document.getElementById(HELP_ANCHOR)
                        : document.getElementById("how-to-use-mobile")
                    target?.scrollIntoView({ behavior: "smooth", block: "start" })
                  })
                }}
                className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/25 bg-background/40 px-6 text-sm font-bold text-foreground backdrop-blur-[1px] sm:bg-card sm:shadow-[0_8px_20px_color-mix(in_oklch,var(--foreground)_8%,transparent)]"
              >
                {messages.home.secondaryCta}
              </button>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/85 [text-shadow:0_1px_2px_color-mix(in_oklch,var(--background)_65%,transparent)]">
              {messages.home.trustLine}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{messages.home.heroProof}</p>
          </div>

          <div id={HELP_ANCHOR} className="hidden scroll-mt-24 items-center lg:flex">
            <div className="card-hover w-full rounded-2xl border border-border/80 bg-card/90 p-4 shadow-sm backdrop-blur-sm sm:p-5">
              <button
                type="button"
                onClick={() => setHelpOpen((open) => !open)}
                aria-expanded={helpOpen}
                aria-controls="how-to-use-content"
                className="flex w-full items-start gap-3 text-left"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-background text-primary">
                  <MapPinned className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <h2 className="text-lg font-semibold text-foreground">{messages.home.helpTitle}</h2>
                    <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition", helpOpen && "rotate-180")} aria-hidden />
                  </span>
                  <p className={cn("mt-1 text-sm leading-relaxed text-muted-foreground", !helpOpen && "hidden")}>{messages.home.helpSub}</p>
                </span>
              </button>

              <div id="how-to-use-content" className={cn("mt-4 space-y-3", helpOpen ? "block" : "hidden")}>
                {helpSteps.map(([title, body], index) => (
                  <div key={title} className="card-hover grid grid-cols-[2rem_1fr] gap-3 rounded-xl border border-border/80 bg-background/80 p-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-foreground">{title}</span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{body}</span>
                    </span>
                  </div>
                ))}
              </div>

              <div className={cn("card-hover mt-4 rounded-xl border border-border/80 bg-background/80 p-3", helpOpen ? "block" : "hidden")}>
                <p className="flex items-center gap-2 text-xs font-semibold text-foreground">
                  <Route className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {messages.home.helper}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="how-to-use-mobile" className="scroll-mt-24 border-b border-border bg-card px-4 py-4 lg:hidden">
        <div className="mx-auto max-w-6xl rounded-2xl border border-border/80 bg-card p-4">
          <button
            type="button"
            onClick={() => setHelpOpen((open) => !open)}
            aria-expanded={helpOpen}
            aria-controls="how-to-use-content-mobile"
            className="flex w-full items-start gap-3 text-left"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-background text-primary">
              <MapPinned className="h-5 w-5" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-semibold text-foreground">{messages.home.helpTitle}</h2>
                <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition", helpOpen && "rotate-180")} aria-hidden />
              </span>
              <p className={cn("mt-1 text-sm leading-relaxed text-muted-foreground", !helpOpen && "hidden")}>{messages.home.helpSub}</p>
            </span>
          </button>
          <div id="how-to-use-content-mobile" className={cn("mt-4 space-y-3", helpOpen ? "block" : "hidden")}>
            {helpSteps.map(([title, body], index) => (
              <div key={title} className="card-hover grid grid-cols-[2rem_1fr] gap-3 rounded-xl border border-border/80 bg-background/80 p-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">{title}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{body}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-b border-border bg-card/80 px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <StepProgress active={1} />
        </div>
      </div>
    </section>
  )
}

function CompareSkeleton() {
  return (
    <section className="card-hover rounded-md border border-border bg-card p-5 shadow-sm">
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
