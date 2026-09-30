import { distanceKm, MAX_WALK_KM, minimumWalkMinutes } from "./geo.ts"
import type { City, Place, RouteStop, TransportMode, TravelRoute } from "./types"
import { validateCity } from "./validate.ts"

// Deterministic route adjustments (ADR 0008 §4). No model, no network: every change is a rule
// over places already in the dataset, and every change is reported with its reason.
// No `@/` imports (validated by build-time scripts).

export type AdjustToggle = "rain" | "easier" | "food" | "shorter"

/** Applied in this order, so a shorter day trims the route the other toggles produced. */
export const ADJUST_TOGGLES: AdjustToggle[] = ["rain", "easier", "food", "shorter"]

/** Target for "shorter day", in minutes. */
export const SHORTER_DAY_MINUTES = 240

/** Longest walk the "easier walking" toggle leaves on foot. */
const EASY_WALK_MINUTES = 20

/** Farthest a meal stop may sit from the route, straight-line. */
const FOOD_DETOUR_KM = 1.2

export type RouteChange =
  | { kind: "swap"; toggle: "rain"; from: string; to: string }
  | { kind: "remove"; toggle: "rain" | "easier" | "shorter"; from: string }
  | { kind: "taxi"; toggle: "easier"; to: string; walkMinutes: number }
  | { kind: "add"; toggle: "food"; to: string; near: string }
  | { kind: "noFood" }

export interface AdjustedRoute {
  route: TravelRoute
  changes: RouteChange[]
  /** Too much of the route had to go; suggest another route instead of pretending this one works. */
  unworkable: boolean
  /** The adjusted route broke a data rule, so the original is shown unchanged. */
  rejected: boolean
}

export function adjustRoute(city: City, original: TravelRoute, toggles: ReadonlySet<AdjustToggle>): AdjustedRoute {
  if (toggles.size === 0) return { route: original, changes: [], unworkable: false, rejected: false }

  const placeById = new Map(city.places.map((place) => [place.id, place]))
  const clusterById = new Map(city.clusters.map((cluster) => [cluster.id, cluster]))
  const place = (id: string) => placeById.get(id) as Place
  let stops: RouteStop[] = original.stops.map((stop) => ({ ...stop }))
  const changes: RouteChange[] = []
  let removed = 0

  const inRoute = (id: string) => stops.some((stop) => stop.placeId === id)
  const km = (a: string, b: string) => distanceKm(place(a).coordinates, place(b).coordinates)
  const walkable = (a: string, b: string) => {
    const from = clusterById.get(place(a).clusterId)
    const to = place(b).clusterId
    return !!from && (from.id === to || from.neighbours.includes(to)) && km(a, b) <= MAX_WALK_KM
  }

  /** Re-time the walking leg into stop `index` after its neighbour changed; fall back to a taxi when it is no longer walkable. */
  const retime = (index: number) => {
    const stop = stops[index]
    if (!stop || index === 0 || stop.transportMode !== "walk") return
    const previous = stops[index - 1].placeId
    if (!walkable(previous, stop.placeId)) {
      stop.transportMode = "taxi"
      return
    }
    stop.estimatedTravelMinutesFromPrevious = Math.max(
      stop.estimatedTravelMinutesFromPrevious,
      minimumWalkMinutes(km(previous, stop.placeId))
    )
  }

  const removeAt = (index: number) => {
    const [gone] = stops.splice(index, 1)
    removed++
    if (index === 0) {
      if (stops[0]) {
        stops[0].transportMode = undefined
        stops[0].estimatedTravelMinutesFromPrevious = 0
      }
      return
    }
    const next = stops[index]
    if (!next) return
    // You now travel straight from the previous stop to the next one.
    next.estimatedTravelMinutesFromPrevious += gone.estimatedTravelMinutesFromPrevious
    next.transportMode = dominantMode(gone.transportMode, next.transportMode)
    retime(index)
  }

  const swapAt = (index: number, to: Place) => {
    stops[index] = {
      ...stops[index],
      placeId: to.id,
      estimatedVisitMinutes: Math.round((to.visitMinutes.min + to.visitMinutes.max) / 2),
      // A substitute has no editorial reason of its own; show what the place is instead.
      reason: to.summary,
    }
    retime(index)
    retime(index + 1)
  }

  /** Nearest same-cluster place that passes `ok`, preferring shared categories. */
  const substitute = (current: Place, ok: (candidate: Place) => boolean): Place | undefined => {
    const shared = (candidate: Place) => candidate.categories.filter((c) => current.categories.includes(c)).length
    return city.places
      .filter(
        (candidate) =>
          candidate.clusterId === current.clusterId && !candidate.transport && !inRoute(candidate.id) && ok(candidate)
      )
      .sort((a, b) => shared(b) - shared(a) || km(current.id, a.id) - km(current.id, b.id))[0]
  }

  const dryEnough = (candidate: Place) => !toggles.has("rain") || (!candidate.weatherSensitive && candidate.setting !== "outdoor")
  const flatEnough = (candidate: Place) => !toggles.has("easier") || candidate.walking === "easy"

  // Rain swaps in an indoor place nearby. Easier walking only removes: a slope is the cost of
  // that stop, and swapping in an unrelated flat place would hide it.
  const replaceWhere = (toggle: "rain" | "easier", needsChange: (p: Place) => boolean) => {
    for (const id of stops.map((stop) => stop.placeId)) {
      const index = stops.findIndex((stop) => stop.placeId === id)
      const current = place(id)
      if (index < 0 || !needsChange(current)) continue
      const next = toggle === "rain" ? substitute(current, (candidate) => dryEnough(candidate) && flatEnough(candidate)) : undefined
      if (toggle === "rain" && next) {
        swapAt(index, next)
        changes.push({ kind: "swap", toggle, from: current.id, to: next.id })
      } else {
        removeAt(index)
        changes.push({ kind: "remove", toggle, from: current.id })
      }
    }
  }

  if (toggles.has("rain")) replaceWhere("rain", (p) => p.weatherSensitive)

  if (toggles.has("easier")) {
    replaceWhere("easier", (p) => p.walking !== "easy")
    stops.forEach((stop, index) => {
      if (index > 0 && stop.transportMode === "walk" && stop.estimatedTravelMinutesFromPrevious >= EASY_WALK_MINUTES) {
        changes.push({ kind: "taxi", toggle: "easier", to: stop.placeId, walkMinutes: stop.estimatedTravelMinutesFromPrevious })
        stop.transportMode = "taxi"
        stop.estimatedTravelMinutesFromPrevious = Math.max(8, Math.round(stop.estimatedTravelMinutesFromPrevious / 2))
      }
    })
  }

  if (toggles.has("food")) {
    let best: { after: number; food: Place; added: number } | undefined
    stops.forEach((stop, index) => {
      const next = stops[index + 1]
      // Never between a pier and its ferry, or between two areas.
      if (next && (next.transportMode !== "walk" || place(next.placeId).clusterId !== place(stop.placeId).clusterId)) return
      for (const food of city.places) {
        if (!food.categories.includes("food") || inRoute(food.id) || food.clusterId !== place(stop.placeId).clusterId) continue
        if (!dryEnough(food) || !flatEnough(food)) continue
        const toFood = km(stop.placeId, food.id)
        if (toFood > FOOD_DETOUR_KM) continue
        const added = next ? toFood + km(food.id, next.placeId) - km(stop.placeId, next.placeId) : toFood
        if (!best || added < best.added) best = { after: index, food, added }
      }
    })
    if (best) {
      const from = stops[best.after].placeId
      stops.splice(best.after + 1, 0, {
        placeId: best.food.id,
        order: 0,
        estimatedVisitMinutes: 40,
        estimatedTravelMinutesFromPrevious: minimumWalkMinutes(km(from, best.food.id)) + 2,
        transportMode: "walk",
        reason: best.food.summary,
      })
      retime(best.after + 2)
      changes.push({ kind: "add", toggle: "food", to: best.food.id, near: from })
    } else {
      changes.push({ kind: "noFood" })
    }
  }

  if (toggles.has("shorter")) {
    while (total(stops) > SHORTER_DAY_MINUTES && stops.length > 3) {
      // Keep the start and the ending; drop the longest middle stop.
      let longest = 1
      for (let i = 2; i < stops.length - 1; i++) {
        if (stops[i].estimatedVisitMinutes > stops[longest].estimatedVisitMinutes) longest = i
      }
      const from = stops[longest].placeId
      removeAt(longest)
      removed--
      changes.push({ kind: "remove", toggle: "shorter", from })
    }
  }

  stops = stops.map((stop, index) => ({ ...stop, order: index + 1 }))
  const route: TravelRoute = { ...original, stops, estimatedDurationMinutes: total(stops) }
  const unworkable = stops.length < 3 || removed > Math.floor(original.stops.length / 2)

  // The same rules the build enforces must hold for anything we show.
  if (validateCity({ ...city, routes: [route] }).length > 0) {
    return { route: original, changes: [], unworkable: false, rejected: true }
  }
  return { route, changes, unworkable, rejected: false }
}

function total(stops: RouteStop[]): number {
  return stops.reduce((sum, stop) => sum + stop.estimatedVisitMinutes + stop.estimatedTravelMinutesFromPrevious, 0)
}

/** When a stop is dropped, the combined leg keeps the "real" transport (ferry, MTR, tram…) over walking. */
function dominantMode(dropped: TransportMode | undefined, next: TransportMode | undefined): TransportMode | undefined {
  if (next && next !== "walk") return next
  if (dropped && dropped !== "walk") return dropped
  return next ?? dropped
}
