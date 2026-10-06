"use client"

import { useMemo, useSyncExternalStore } from "react"
import {
  markOf,
  parseCityMap,
  readCityMapRaw,
  setCityMark,
  subscribeCityMap,
  type CityMapMark,
  type CityMapState,
} from "@/lib/city-map"

/** SSR + first paint: empty map. Real marks hydrate after mount (ADR 0003). */
export function useCityMap(): CityMapState {
  const raw = useSyncExternalStore(subscribeCityMap, readCityMapRaw, () => null)
  return useMemo(() => parseCityMap(raw), [raw])
}

export function useCityMark(slug: string): CityMapMark {
  const state = useCityMap()
  return markOf(state, slug)
}

export function useToggleCityMark(slug: string) {
  return (mark: "want" | "been") => setCityMark(slug, mark)
}
