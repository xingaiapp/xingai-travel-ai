import type { CompareResult, PlanResult, TripContext } from "@/lib/types"
import { recordTravelRetention } from "@/lib/travel-retention"

// Session keys shared by /decide, /result and /trips (see ADR 0003).
export const TRIP_STORAGE = "xingai-travel-trip-context"
export const COMPARE_STORAGE = "xingai-travel-compare-result"
export const PLAN_STORAGE = "xingai-travel-plan-result"
export const INSPIRE_STORAGE = "xingai-travel-inspire-prefs"
// Set by /result when the user asks to regenerate in the current UI language; /decide consumes it.
export const REGENERATE_STORAGE = "xingai-travel-regenerate"

// Recent decisions for /trips — this browser only, no account (see ADR 0007).
export const HISTORY_STORAGE = "xingai-travel-trip-history"
export const HISTORY_UPDATED_EVENT = "xingai-travel-history-updated"
const MAX_ENTRIES = 12

export interface TripHistoryEntry {
  id: string
  savedAt: string
  mode: "compare" | "inspire"
  trip: TripContext
  compare: CompareResult
  plan?: PlanResult
}

function parse(raw: string | null): TripHistoryEntry[] {
  if (!raw) return []
  try {
    const list = JSON.parse(raw) as unknown
    return Array.isArray(list) ? (list as TripHistoryEntry[]).filter((e) => e?.id && e.compare?.destinations?.length) : []
  } catch {
    return []
  }
}

/** Raw string snapshot for useSyncExternalStore (stable between renders). */
export function readHistoryRaw(): string | null {
  try {
    return localStorage.getItem(HISTORY_STORAGE)
  } catch {
    return null
  }
}

export function parseHistory(raw: string | null): TripHistoryEntry[] {
  return parse(raw)
}

export function subscribeHistory(onChange: () => void) {
  window.addEventListener("storage", onChange)
  window.addEventListener(HISTORY_UPDATED_EVENT, onChange)
  return () => {
    window.removeEventListener("storage", onChange)
    window.removeEventListener(HISTORY_UPDATED_EVENT, onChange)
  }
}

function write(list: TripHistoryEntry[]) {
  try {
    localStorage.setItem(HISTORY_STORAGE, JSON.stringify(list.slice(0, MAX_ENTRIES)))
  } catch {
    // Quota or privacy mode: history is a convenience, never block the decision flow.
  }
  window.dispatchEvent(new Event(HISTORY_UPDATED_EVENT))
}

export function addDecision(entry: Omit<TripHistoryEntry, "id" | "savedAt">): string {
  const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
  write([{ ...entry, id, savedAt: new Date().toISOString() }, ...parse(readHistoryRaw())])
  recordTravelRetention("decision")
  recordTravelRetention("save")
  return id
}

export function attachPlan(id: string, plan: PlanResult) {
  write(parse(readHistoryRaw()).map((e) => (e.id === id ? { ...e, plan } : e)))
}

export function removeDecision(id: string) {
  write(parse(readHistoryRaw()).filter((e) => e.id !== id))
}

export function clearHistory() {
  write([])
}

export function winnerOf(compare: CompareResult) {
  return compare.destinations.find((d) => d.isWinner) ?? compare.destinations[0]
}

/**
 * Make a decision the one /result shows: write the three session keys. A missing plan
 * (user left before it arrived) is requested again; /result polls PLAN_STORAGE.
 */
export function restoreDecision(entry: { id?: string; trip: TripContext; compare: CompareResult; plan?: PlanResult }) {
  sessionStorage.setItem(TRIP_STORAGE, JSON.stringify(entry.trip))
  sessionStorage.setItem(COMPARE_STORAGE, JSON.stringify(entry.compare))
  if (entry.plan) {
    sessionStorage.setItem(PLAN_STORAGE, JSON.stringify(entry.plan))
    return
  }
  sessionStorage.removeItem(PLAN_STORAGE)
  const winner = winnerOf(entry.compare)
  fetchPlan(`${winner.name}, ${winner.country}`, entry.trip)
    .then((plan) => {
      sessionStorage.setItem(PLAN_STORAGE, JSON.stringify(plan))
      if (entry.id) attachPlan(entry.id, plan)
    })
    .catch(() => sessionStorage.removeItem(PLAN_STORAGE))
}

export function findDecision(id: string) {
  return parse(readHistoryRaw()).find((e) => e.id === id)
}

export async function fetchPlan(destination: string, tripContext: TripContext): Promise<PlanResult> {
  const res = await fetch("/api/plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ destination, tripContext }),
  })
  if (!res.ok) throw new Error("Plan failed")
  return (await res.json()) as PlanResult
}
