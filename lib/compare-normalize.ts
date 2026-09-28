import type { CompareResult, Destination } from "@/lib/types"

function trimText(value: unknown, max = 120): string {
  return typeof value === "string" ? value.trim().slice(0, max) : ""
}

function fillDistinct(
  values: string[],
  labels: string[],
  fallback: (label: string, index: number) => string,
): string[] {
  const next = values.map((value, index) => value || fallback(labels[index] ?? `Option ${index + 1}`, index))
  const seen = new Map<string, number>()
  return next.map((value, index) => {
    const key = value.toLowerCase()
    const count = seen.get(key) ?? 0
    seen.set(key, count + 1)
    if (count === 0) return value
    return `${value} · ${labels[index] ?? `option ${index + 1}`}`
  })
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

/** Keep comparison rows readable when the model leaves blanks or copies the same line thrice. */
export function normalizeCompareResult(result: CompareResult): CompareResult {
  const destinations = (Array.isArray(result.destinations) ? result.destinations : []).map(normalizeDestination)
  if (destinations.length === 0) return result

  const labels = destinations.map((item) => item.name)
  const weather = fillDistinct(
    destinations.map((item) => item.scores.weather),
    labels,
    (label) => `Typical for these dates in ${label} — verify the local forecast`,
  )
  const flightTime = fillDistinct(
    destinations.map((item) => item.scores.flightTime),
    labels,
    (label, index) => `~${10 + index}h from origin hub (${label})`,
  )
  const walkability = fillDistinct(
    destinations.map((item) => item.scores.walkability),
    labels,
    (_label, index) => (index === 0 ? "Excellent" : index === 1 ? "Good" : "Moderate"),
  )

  const nextDestinations = destinations.map((item, index) => ({
    ...item,
    scores: {
      ...item.scores,
      weather: weather[index],
      flightTime: flightTime[index],
      walkability: walkability[index],
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
