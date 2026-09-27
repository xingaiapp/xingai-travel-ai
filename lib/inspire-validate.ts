import type { CompareResult, InspireFlightRange } from "@/lib/types"

// Upper bound (one-way hours incl. connections) per flight range; small tolerance for model rounding.
const MAX_FLIGHT_HOURS: Record<InspireFlightRange, number> = {
  short: 4.5,
  medium: 9.5,
  long: Number.POSITIVE_INFINITY,
}

export const INSPIRE_DESTINATION_COUNT = 3

/**
 * Hard constraints the model must respect. Returns human-readable problems
 * (fed back into the retry prompt); an empty array means the result is usable.
 */
export function inspireViolations(result: CompareResult, flightRange: InspireFlightRange): string[] {
  const problems: string[] = []
  const destinations = Array.isArray(result?.destinations) ? result.destinations : []

  if (destinations.length !== INSPIRE_DESTINATION_COUNT) {
    problems.push(`Return exactly ${INSPIRE_DESTINATION_COUNT} destinations (got ${destinations.length}).`)
  }

  const max = MAX_FLIGHT_HOURS[flightRange]
  for (const d of destinations) {
    const hours = d.flightHours
    if (typeof hours !== "number" || !Number.isFinite(hours) || hours <= 0) {
      problems.push(`${d.name || "A destination"} is missing a numeric flightHours.`)
    } else if (hours > max) {
      problems.push(`${d.name} is ~${hours}h away, over the ${max}h flight limit. Replace it.`)
    }
  }

  if (destinations.length > 0 && !destinations.some((d) => d.isWinner && d.name === result.winner)) {
    problems.push(`"winner" must match the one destination with isWinner: true.`)
  }

  return problems
}
