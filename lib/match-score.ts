import type { Confidence, Destination } from "@/lib/types"

/**
 * Deterministic Match Score from existing compare fields only.
 * Does not invent factor scores the model never returned.
 * overall: 1–5 stars · confidence: high|medium|low
 */
export function computeMatchScore(overall: number, confidence: Confidence): number {
  const stars = Math.max(1, Math.min(5, Math.round(Number(overall) || 3)))
  const base = stars * 16
  const bonus = confidence === "high" ? 15 : confidence === "medium" ? 8 : 2
  return Math.max(52, Math.min(98, base + bonus))
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

export function rankedAlternatives(destinations: Destination[]) {
  return destinations
    .filter((item) => !item.isWinner)
    .map((item) => ({
      item,
      score: computeMatchScore(item.scores.overall, item.confidence),
    }))
    .sort((a, b) => b.score - a.score)
}
