/**
 * Coarse local retention + usage signals for Travel.
 * Browser-only; pairs with Vercel Analytics. Never blocks Decide.
 */
import { track } from "@vercel/analytics"

export const TRAVEL_RETENTION_STORAGE_KEY = "xingai-travel-retention-v1"
export const TRAVEL_USAGE_STORAGE_KEY = "xingai-travel-usage-v1"

const DAY_MS = 24 * 60 * 60 * 1000

export type TravelRetentionEvent =
  | "decision"
  | "save"
  | "return"
  | "compare_again"
  | "plan_again"

type RetentionState = {
  activeDays: string[]
  lastEventAt: number
  lastEvent: TravelRetentionEvent | null
}

type UsageState = {
  decisionCount: number
  saveCount: number
  returnCount: number
  againCount: number
}

function utcDay(ts = Date.now()): string {
  return new Date(ts).toISOString().slice(0, 10)
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJson(key: string, value: unknown): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* quota */
  }
}

export function loadTravelUsage(): UsageState {
  const u = readJson<Partial<UsageState>>(TRAVEL_USAGE_STORAGE_KEY, {})
  return {
    decisionCount: typeof u.decisionCount === "number" ? u.decisionCount : 0,
    saveCount: typeof u.saveCount === "number" ? u.saveCount : 0,
    returnCount: typeof u.returnCount === "number" ? u.returnCount : 0,
    againCount: typeof u.againCount === "number" ? u.againCount : 0,
  }
}

export function loadTravelRetention(): RetentionState {
  const r = readJson<Partial<RetentionState>>(TRAVEL_RETENTION_STORAGE_KEY, {})
  const days = Array.isArray(r.activeDays)
    ? r.activeDays.filter((d): d is string => typeof d === "string")
    : []
  return {
    activeDays: days,
    lastEventAt: typeof r.lastEventAt === "number" ? r.lastEventAt : 0,
    lastEvent: (r.lastEvent as TravelRetentionEvent | null) ?? null,
  }
}

export function countTravelActiveDaysLast7(now = Date.now()): number {
  const { activeDays } = loadTravelRetention()
  const start = utcDay(now - 6 * DAY_MS)
  return activeDays.filter((d) => d >= start && d <= utcDay(now)).length
}

export function recordTravelRetention(event: TravelRetentionEvent): void {
  if (typeof window === "undefined") return
  const day = utcDay()
  const prev = loadTravelRetention()
  const activeDays = prev.activeDays.includes(day)
    ? prev.activeDays
    : [...prev.activeDays, day].slice(-60)
  writeJson(TRAVEL_RETENTION_STORAGE_KEY, {
    activeDays,
    lastEventAt: Date.now(),
    lastEvent: event,
  } satisfies RetentionState)

  const usage = loadTravelUsage()
  if (event === "decision") usage.decisionCount += 1
  if (event === "save") usage.saveCount += 1
  if (event === "return") usage.returnCount += 1
  if (event === "compare_again" || event === "plan_again") usage.againCount += 1
  writeJson(TRAVEL_USAGE_STORAGE_KEY, usage)

  try {
    track("retention_event", {
      app: "travel",
      event,
      usage_decisions: usage.decisionCount,
      active_days_7: countTravelActiveDaysLast7(),
    })
  } catch {
    /* analytics must never break Decide */
  }
}
