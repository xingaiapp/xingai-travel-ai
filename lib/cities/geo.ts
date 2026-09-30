// Small geography helpers for the city layer. No `@/` imports (loaded by build-time scripts).

const EARTH_RADIUS_KM = 6371

/** Straight-line distance in km. Real walking distance is longer; callers add their own margin. */
export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const rad = (deg: number) => (deg * Math.PI) / 180
  const dLat = rad(b.lat - a.lat)
  const dLng = rad(b.lng - a.lng)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h))
}

/** Longest leg a route may ask people to walk, straight-line. */
export const MAX_WALK_KM = 2.5

/** Brisk-but-realistic city pace, straight-line. Streets, crossings and slopes only make it slower. */
export const WALK_KM_PER_HOUR = 4.5

/** Fewest minutes a walking leg of this straight-line length can honestly be labelled with. */
export function minimumWalkMinutes(km: number): number {
  return Math.ceil((km / WALK_KM_PER_HOUR) * 60)
}
