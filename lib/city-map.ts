/**
 * Per-browser “want to go / been” marks for live city guides.
 * Device-local only — same pattern as trip history (ADR 0007). Not a global ranking.
 */

export const CITY_MAP_STORAGE = "xingai-travel-city-map"
export const CITY_MAP_UPDATED_EVENT = "xingai-travel-city-map-updated"

export type CityMapMark = "want" | "been" | null

export interface CityMapState {
  want: string[]
  been: string[]
}

const EMPTY: CityMapState = { want: [], been: [] }

function uniqueSlugs(list: unknown): string[] {
  if (!Array.isArray(list)) return []
  const out: string[] = []
  const seen = new Set<string>()
  for (const item of list) {
    if (typeof item !== "string") continue
    const slug = item.trim().toLowerCase()
    if (!slug || seen.has(slug)) continue
    seen.add(slug)
    out.push(slug)
  }
  return out
}

export function parseCityMap(raw: string | null): CityMapState {
  if (!raw) return { ...EMPTY, want: [], been: [] }
  try {
    const data = JSON.parse(raw) as { want?: unknown; been?: unknown }
    const want = uniqueSlugs(data.want)
    const been = uniqueSlugs(data.been)
    // Been wins: a city cannot sit in both lists.
    const beenSet = new Set(been)
    return {
      want: want.filter((slug) => !beenSet.has(slug)),
      been,
    }
  } catch {
    return { want: [], been: [] }
  }
}

/** Raw string for useSyncExternalStore (stable between renders). */
export function readCityMapRaw(): string | null {
  try {
    return localStorage.getItem(CITY_MAP_STORAGE)
  } catch {
    return null
  }
}

export function subscribeCityMap(onChange: () => void) {
  window.addEventListener("storage", onChange)
  window.addEventListener(CITY_MAP_UPDATED_EVENT, onChange)
  return () => {
    window.removeEventListener("storage", onChange)
    window.removeEventListener(CITY_MAP_UPDATED_EVENT, onChange)
  }
}

function write(state: CityMapState) {
  try {
    localStorage.setItem(CITY_MAP_STORAGE, JSON.stringify(state))
  } catch {
    // Quota / privacy mode: map is a convenience, never block browsing.
  }
  window.dispatchEvent(new Event(CITY_MAP_UPDATED_EVENT))
}

export function markOf(state: CityMapState, slug: string): CityMapMark {
  const key = slug.trim().toLowerCase()
  if (state.been.includes(key)) return "been"
  if (state.want.includes(key)) return "want"
  return null
}

/** Toggle want/been. Same mark again clears it. Cross-mark replaces the other. */
export function applyCityMark(state: CityMapState, slug: string, mark: "want" | "been"): CityMapState {
  const key = slug.trim().toLowerCase()
  if (!key) return state
  const current = markOf(state, key)
  if (current === mark) {
    return {
      want: state.want.filter((s) => s !== key),
      been: state.been.filter((s) => s !== key),
    }
  }
  if (mark === "been") {
    return {
      want: state.want.filter((s) => s !== key),
      been: [...state.been.filter((s) => s !== key), key],
    }
  }
  return {
    want: [...state.want.filter((s) => s !== key), key],
    been: state.been.filter((s) => s !== key),
  }
}

export function setCityMark(slug: string, mark: "want" | "been") {
  write(applyCityMark(parseCityMap(readCityMapRaw()), slug, mark))
}

export function clearCityMap() {
  write({ want: [], been: [] })
}

/** Progress against the live guide catalog (not a fake Top 100). */
export function cityMapProgress(state: CityMapState, liveSlugs: readonly string[]) {
  const live = new Set(liveSlugs.map((s) => s.toLowerCase()))
  const beenLive = state.been.filter((s) => live.has(s)).length
  const wantLive = state.want.filter((s) => live.has(s)).length
  return {
    totalLive: live.size,
    beenLive,
    wantLive,
    markedLive: beenLive + wantLive,
  }
}
