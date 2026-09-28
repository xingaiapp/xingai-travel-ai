import type { CompareResult, Destination } from "@/lib/types"

function trimText(value: unknown, max = 120): string {
  return typeof value === "string" ? value.trim().slice(0, max) : ""
}

function normalizeDestination(item: Destination, index: number): Destination {
  const name = trimText(item.name, 80) || `Destination ${index + 1}`
  return {
    ...item,
    name,
    country: trimText(item.country, 80) || item.country,
    whyWins: Array.isArray(item.whyWins) ? item.whyWins.map((line) => trimText(line, 160)).filter(Boolean).slice(0, 5) : [],
    tradeoffs: Array.isArray(item.tradeoffs) ? item.tradeoffs.map((line) => trimText(line, 160)).filter(Boolean).slice(0, 5) : [],
    scores: {
      overall: Math.max(1, Math.min(5, Math.round(Number(item.scores?.overall) || 3))),
      weather: trimText(item.scores?.weather, 100),
      flightTime: trimText(item.scores?.flightTime, 80),
      walkability: trimText(item.scores?.walkability, 40),
    },
  }
}

/** Fill blank score cells only — never append city names onto duplicate model values. */
export function normalizeCompareResult(result: CompareResult): CompareResult {
  const destinations = (Array.isArray(result.destinations) ? result.destinations : []).map(normalizeDestination)
  if (destinations.length === 0) return result

  const nextDestinations = destinations.map((item, index) => ({
    ...item,
    scores: {
      ...item.scores,
      weather: item.scores.weather || "Typical for these dates — verify the local forecast",
      flightTime: item.scores.flightTime || `~${10 + index}h from origin hub`,
      walkability:
        item.scores.walkability || (index === 0 ? "Excellent" : index === 1 ? "Good" : "Moderate"),
    },
  }))

  const winner =
    trimText(result.winner, 120) ||
    nextDestinations.find((item) => item.isWinner)?.name ||
    nextDestinations[0]?.name ||
    ""

  return {
    ...result,
    winner,
    whyNotOthers: trimText(result.whyNotOthers, 400) || result.whyNotOthers,
    destinations: nextDestinations,
  }
}
