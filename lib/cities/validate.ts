import { distanceKm, MAX_WALK_KM, minimumWalkMinutes } from "./geo.ts"
import type { City, CityText } from "./types"

// Build-time checks for city data (ADR 0008 §2–3). Run by scripts/check-cities.mjs before every build.
// Keep this file free of `@/` imports so Node can load it directly.

const LOCALES = ["en", "zh", "ko", "es"] as const
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

/** Rough bounds per city, to catch swapped or mistyped coordinates. */
const BOUNDS: Record<string, { lat: [number, number]; lng: [number, number] }> = {
  "hong-kong": { lat: [22.15, 22.57], lng: [113.82, 114.45] },
}

export function validateCity(city: City): string[] {
  const errors: string[] = []
  const err = (where: string, message: string) => errors.push(`${city.slug} › ${where}: ${message}`)

  const text = (where: string, value: CityText | undefined) => {
    for (const locale of LOCALES) {
      if (!value?.[locale]?.trim()) err(where, `missing ${locale} text`)
    }
  }

  text("name", city.name)
  text("country", city.country)
  text("intro", city.intro)
  text("hero alt", city.hero.alt)
  text("hero credit", city.hero.credit.label)
  text("map waterLabel", city.map.waterLabel)
  if (city.map.water.length < 3) err("map", "water outline needs at least 3 points")

  const clusterIds = new Set<string>()
  for (const cluster of city.clusters) {
    if (clusterIds.has(cluster.id)) err(`cluster ${cluster.id}`, "duplicate id")
    clusterIds.add(cluster.id)
    text(`cluster ${cluster.id}`, cluster.name)
  }
  const clusterById = new Map(city.clusters.map((cluster) => [cluster.id, cluster]))
  for (const cluster of city.clusters) {
    for (const id of cluster.neighbours) {
      const other = clusterById.get(id)
      if (!other) err(`cluster ${cluster.id}`, `unknown neighbour "${id}"`)
      else if (!other.neighbours.includes(cluster.id)) err(`cluster ${cluster.id}`, `neighbour "${id}" does not list it back`)
    }
  }

  if (city.places.length < 15 || city.places.length > 25) {
    err("places", `expected 15–25 places, found ${city.places.length}`)
  }

  const bounds = BOUNDS[city.slug]
  if (!bounds) err("bounds", "no coordinate bounds defined for this city")

  const placeIds = new Set<string>()
  const usedClusters = new Set<string>()
  for (const place of city.places) {
    const where = `place ${place.id}`
    if (placeIds.has(place.id)) err(where, "duplicate id")
    placeIds.add(place.id)

    text(`${where} name`, place.name)
    text(`${where} summary`, place.summary)
    if (!place.localName.trim()) err(where, "missing localName")

    if (!clusterIds.has(place.clusterId)) err(where, `unknown cluster "${place.clusterId}"`)
    usedClusters.add(place.clusterId)

    const { lat, lng } = place.coordinates
    if (bounds && (lat < bounds.lat[0] || lat > bounds.lat[1] || lng < bounds.lng[0] || lng > bounds.lng[1])) {
      err(where, `coordinates ${lat},${lng} are outside ${city.slug}`)
    }

    if (place.categories.length === 0) err(where, "no categories")
    if (new Set(place.categories).size !== place.categories.length) err(where, "duplicate categories")

    if (place.sources.length === 0) err(where, "no sources (No Citation, No Claim)")
    for (const source of place.sources) {
      if (!source.name.trim()) err(where, "source without a name")
      if (!source.url.startsWith("https://")) err(where, `source URL must be https: ${source.url}`)
      if (!ISO_DATE.test(source.retrievedAt)) err(where, `retrievedAt must be YYYY-MM-DD: ${source.retrievedAt}`)
    }

    if (insidePolygon([lng, lat], city.map.water)) err(where, "coordinates fall inside the map's water outline")

    const { min, max } = place.visitMinutes
    if (min <= 0 || max < min) err(where, `invalid visitMinutes ${min}–${max}`)
  }

  for (const id of clusterIds) {
    if (!usedClusters.has(id)) err(`cluster ${id}`, "has no places")
  }

  const placeById = new Map(city.places.map((place) => [place.id, place]))
  for (const route of city.routes) {
    const where = `route ${route.id}`
    text(`${where} name`, route.name)
    text(`${where} description`, route.description)
    if (route.photo) {
      text(`${where} photo alt`, route.photo.alt)
      text(`${where} photo credit`, route.photo.credit.label)
    }
    for (const [label, list] of [["whyThisRoute", route.whyThisRoute], ["goodFor", route.goodFor], ["tradeoffs", route.tradeoffs]] as const) {
      if (list.length === 0) err(where, `${label} is empty`)
      list.forEach((item, index) => text(`${where} ${label}[${index}]`, item))
    }
    if (route.stops.length < 2) err(where, "needs at least two stops")

    const left = new Set<string>()
    const seen = new Set<string>()
    let previous: (typeof city.places)[number] | undefined
    let total = 0
    route.stops.forEach((stop, index) => {
      const stopWhere = `${where} stop ${index + 1}`
      if (stop.order !== index + 1) err(stopWhere, `order is ${stop.order}, expected ${index + 1}`)
      const place = placeById.get(stop.placeId)
      if (!place) {
        err(stopWhere, `unknown place "${stop.placeId}"`)
        previous = undefined
        return
      }
      if (seen.has(place.id)) err(stopWhere, `visits "${place.id}" twice`)
      seen.add(place.id)
      text(`${stopWhere} reason`, stop.reason)
      if (stop.estimatedVisitMinutes <= 0) err(stopWhere, "estimatedVisitMinutes must be positive")
      total += stop.estimatedVisitMinutes + stop.estimatedTravelMinutesFromPrevious

      if (index === 0) {
        if (stop.transportMode || stop.estimatedTravelMinutesFromPrevious !== 0) {
          err(stopWhere, "first stop takes no transportMode and 0 travel minutes")
        }
      } else if (!stop.transportMode) {
        err(stopWhere, "missing transportMode")
      } else if (previous) {
        checkLeg(stopWhere, previous, place, stop.transportMode, stop.estimatedTravelMinutesFromPrevious)
      }

      // Backtracking: once a route leaves a cluster, it must not come back to it.
      if (previous && place.clusterId !== previous.clusterId) {
        left.add(previous.clusterId)
        if (left.has(place.clusterId)) err(stopWhere, `returns to cluster "${place.clusterId}" after leaving it`)
      }
      previous = place
    })

    // The headline duration must match the stops, within a rounding margin.
    if (Math.abs(total - route.estimatedDurationMinutes) > 15) {
      err(where, `estimatedDurationMinutes is ${route.estimatedDurationMinutes}, stops add up to ${total}`)
    }
  }

  function checkLeg(
    where: string,
    from: (typeof city.places)[number],
    to: (typeof city.places)[number],
    mode: NonNullable<City["routes"][number]["stops"][number]["transportMode"]>,
    minutes: number
  ) {
    const sameCluster = from.clusterId === to.clusterId
    const fromCluster = clusterById.get(from.clusterId)
    const toCluster = clusterById.get(to.clusterId)
    if (!fromCluster || !toCluster) return
    const adjacent = sameCluster || fromCluster.neighbours.includes(to.clusterId)
    const km = distanceKm(from.coordinates, to.coordinates)

    if (minutes <= 0) err(where, "travel minutes must be positive after the first stop")
    if (mode === "walk") {
      if (!adjacent) err(where, `walks between non-neighbouring clusters ${from.clusterId} → ${to.clusterId}`)
      if (fromCluster.side !== toCluster.side) err(where, "walks across the harbour")
      if (km > MAX_WALK_KM) err(where, `walks ${km.toFixed(1)} km straight-line (max ${MAX_WALK_KM})`)
      const floor = minimumWalkMinutes(km)
      if (minutes < floor) err(where, `walk of ${km.toFixed(2)} km labelled ${minutes} min; needs at least ${floor}`)
    }
    if (mode === "ferry" && fromCluster.side === toCluster.side) err(where, "ferry leg does not cross the harbour")
    if (mode === "peak_tram" && from.clusterId !== "the-peak" && to.clusterId !== "the-peak") {
      err(where, "peak_tram leg must start or end at the Peak")
    }
  }

  return errors
}

/** Ray-casting point-in-polygon on [lng, lat] pairs. */
function insidePolygon([x, y]: [number, number], polygon: [number, number][]): boolean {
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i]
    const [xj, yj] = polygon[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

/** Every photo path a city uses, for the build script to check on disk. */
export function cityPhotoPaths(city: City): string[] {
  const photos = [city.hero, ...city.routes.flatMap((route) => (route.photo ? [route.photo] : []))]
  return photos.flatMap((photo) => [`${photo.src}-800.webp`, `${photo.src}-1600.webp`])
}
