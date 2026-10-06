import type { CompareResult, Destination, TripContext } from "@/lib/types"

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

/** Hours parsed from strings like "~12h (1 stop)" or "11 hours". */
export function parseFlightHours(flightTime: string): number | null {
  const m = flightTime.match(/(\d+(?:\.\d+)?)\s*h/i) || flightTime.match(/(\d+(?:\.\d+)?)\s*hours?/i)
  if (!m) return null
  const n = Number(m[1])
  return Number.isFinite(n) ? n : null
}

/** User asked to avoid long flights (en / zh / ko / es cues). */
export function avoidLongFlights(avoid?: string): boolean {
  if (!avoid?.trim()) return false
  return /long\s*flights?|长途|長途|长途飞行|장거리|장시간\s*비행|vuelos?\s+largos?/i.test(avoid)
}

/**
 * Soft trip → long-haul is especially bad. Threshold hours above which a destination
 * violates "avoid long flights" (stricter when nights ≤ 5).
 */
export function longFlightLimitHours(nights: number): number {
  return nights > 0 && nights <= 5 ? 9 : 12
}

function rankKey(item: Destination): number {
  const stars = item.scores.overall
  const bonus = item.confidence === "high" ? 0.3 : item.confidence === "medium" ? 0.15 : 0
  return stars + bonus
}

function applyAvoidHardConstraints(
  destinations: Destination[],
  trip: TripContext | undefined,
  whyNotOthers: string
): { destinations: Destination[]; winner: string; whyNotOthers: string } {
  if (!trip || destinations.length === 0) {
    return {
      destinations,
      winner:
        destinations.find((item) => item.isWinner)?.name || destinations[0]?.name || "",
      whyNotOthers,
    }
  }

  const avoid = trip.avoid?.trim() ?? ""
  const nights = trip.dates?.nights ?? 0
  const checkLong = avoidLongFlights(avoid)
  const hourCap = longFlightLimitHours(nights)
  const demotedNames: string[] = []

  const next = destinations.map((item) => {
    let dest = item
    const hours = parseFlightHours(item.scores.flightTime)
    if (checkLong && hours != null && hours >= hourCap) {
      demotedNames.push(item.name)
      dest = {
        ...dest,
        confidence: "low",
        scores: { ...dest.scores, overall: Math.min(dest.scores.overall, 2) },
        tradeoffs: [
          `Violates Avoid (long flight ~${hours}h; trip ${nights || "?"} nights)`,
          ...dest.tradeoffs.filter((line) => !/violates avoid/i.test(line)),
        ].slice(0, 5),
        isWinner: false,
      }
    }
    return dest
  })

  // Prefer non-demoted destinations as winner; fall back to best remaining rank.
  const ranked = [...next].sort((a, b) => rankKey(b) - rankKey(a))
  const preferred = ranked.find((d) => !demotedNames.includes(d.name)) ?? ranked[0]
  const withFlags = next.map((d) => ({
    ...d,
    isWinner: preferred ? d.name === preferred.name : d.isWinner,
  }))

  let nextWhy = whyNotOthers
  if (demotedNames.length) {
    const note = `Demoted for Avoid (long flights): ${demotedNames.join(", ")}.`
    nextWhy = nextWhy ? `${nextWhy} ${note}` : note
  }

  return {
    destinations: withFlags,
    winner: preferred?.name ?? "",
    whyNotOthers: nextWhy,
  }
}

/** Fill blank score cells; optionally demote destinations that violate Avoid. */
export function normalizeCompareResult(result: CompareResult, trip?: TripContext): CompareResult {
  const destinations = (Array.isArray(result.destinations) ? result.destinations : []).map(normalizeDestination)
  if (destinations.length === 0) return result

  const filled = destinations.map((item, index) => ({
    ...item,
    scores: {
      ...item.scores,
      weather: item.scores.weather || "Typical for these dates — verify the local forecast",
      flightTime: item.scores.flightTime || `~${10 + index}h from origin hub`,
      walkability:
        item.scores.walkability || (index === 0 ? "Excellent" : index === 1 ? "Good" : "Moderate"),
    },
  }))

  const whySeed = trimText(result.whyNotOthers, 400) || result.whyNotOthers
  const constrained = applyAvoidHardConstraints(filled, trip, whySeed)
  const modelWinner = trimText(result.winner, 120)
  const modelDemoted =
    Boolean(trip?.avoid?.trim()) &&
    Boolean(modelWinner) &&
    constrained.destinations.some((item) => item.name === modelWinner && !item.isWinner)

  const finalWinner = modelDemoted
    ? constrained.destinations.find((item) => item.isWinner)?.name ||
      constrained.winner ||
      constrained.destinations[0]?.name ||
      ""
    : modelWinner ||
      constrained.destinations.find((item) => item.isWinner)?.name ||
      constrained.winner ||
      constrained.destinations[0]?.name ||
      ""

  // Keep isWinner flags aligned with finalWinner when Avoid demotion rewrote the ranking.
  const nextDestinations = modelDemoted
    ? constrained.destinations.map((item) => ({
        ...item,
        isWinner: item.name === finalWinner,
      }))
    : constrained.destinations

  return {
    ...result,
    winner: finalWinner,
    whyNotOthers: String(constrained.whyNotOthers ?? "").slice(0, 400),
    destinations: nextDestinations,
  }
}
