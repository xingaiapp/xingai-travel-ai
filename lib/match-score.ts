import type { Confidence, Destination } from "@/lib/types"

/**
 * Deterministic Match Score from existing compare fields only.
 * Does not invent factor scores the model never returned.
 * overall: 1–5 stars · confidence: high|medium|low · optional walkability nudge (0–3)
 */
export function computeMatchScore(overall: number, confidence: Confidence, walkability?: string): number {
  const stars = Math.max(1, Math.min(5, Math.round(Number(overall) || 3)))
  const base = stars * 16
  const bonus = confidence === "high" ? 15 : confidence === "medium" ? 8 : 2
  const walk = walkabilityTenths(walkability ?? "")
  const walkBonus = walk == null ? 0 : Math.round((walk / 10) * 3)
  // Low-confidence (e.g. Avoid demotion) may sit below 52 so walkability still separates peers.
  const floor = confidence === "low" ? 28 : 52
  return Math.max(floor, Math.min(98, base + bonus + walkBonus))
}

export function matchScoreLabelBand(score: number): "excellent" | "strong" | "fair" {
  if (score >= 86) return "excellent"
  if (score >= 72) return "strong"
  return "fair"
}

/** Map walkability text (Excellent/Good/Moderate…) to a 1–10 display scale when possible. */
export function walkabilityTenths(value: string): number | null {
  const t = value.trim().toLowerCase()
  if (!t) return null
  if (t.includes("excellent") || t.includes("优秀") || t.includes("훌륭") || t.includes("excelente")) return 9
  if (t.includes("good") || t.includes("良好") || t.includes("좋") || t.includes("buena") || t.includes("bueno")) return 7
  if (t.includes("moderate") || t.includes("fair") || t.includes("一般") || t.includes("보통") || t.includes("moderada")) return 5
  if (t.includes("poor") || t.includes("weak") || t.includes("差") || t.includes("약") || t.includes("pobre")) return 3
  return null
}

export function overallTenths(overall: number): number {
  return Math.max(2, Math.min(10, Math.round(Number(overall) || 3) * 2))
}

/** Hours from strings like "~12h (1 stop)" — used only as a tie-break, not a new factor invent. */
function flightHoursForSort(flightTime: string): number {
  const m = flightTime.match(/(\d+(?:\.\d+)?)\s*h/i) || flightTime.match(/(\d+(?:\.\d+)?)\s*hours?/i)
  if (!m) return 99
  const n = Number(m[1])
  return Number.isFinite(n) ? n : 99
}

export function rankedAlternatives(destinations: Destination[]) {
  return destinations
    .filter((item) => !item.isWinner)
    .map((item) => ({
      item,
      score: computeMatchScore(item.scores.overall, item.confidence, item.scores.walkability),
      flightHours: flightHoursForSort(item.scores.flightTime),
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return a.flightHours - b.flightHours
    })
}
