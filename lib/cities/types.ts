/**
 * City layer data model (ADR 0008).
 *
 * Two kinds of fields, kept apart on purpose:
 * - Facts (`summary`, `coordinates`, `district`) must be backed by `sources`.
 * - Editorial estimates (`visitMinutes`, `bestTime`, `setting`, `walking`) are our judgment,
 *   used for routing and adjustment toggles, and are labelled as estimates in the UI.
 * Dynamic facts (opening hours, prices, closures, events, current popularity) are not modelled in v1.
 *
 * Keep this file free of `@/` imports so build-time scripts can load it directly.
 */

/** City copy is required in every locale. Unlike stories, there is no English fallback. */
export type CityText = { en: string; zh: string; ko: string; es: string }

export type CityLocale = keyof CityText

export interface Source {
  name: string
  url: string
  /** ISO date the source was read, e.g. "2026-09-30". */
  retrievedAt: string
}

export type PlaceCategory =
  | "iconic"
  | "local"
  | "culture"
  | "food"
  | "photo"
  | "nature"
  | "night"
  /** Set only by the publisher, as a first-hand label. Never used as a route reason (ADR 0008 §2.5). */
  | "xing_pick"

export type PlaceSetting = "indoor" | "outdoor" | "mixed"
export type WalkingEffort = "easy" | "moderate" | "steep"
export type BestTime = "morning" | "daytime" | "sunset" | "evening" | "any"

export interface Place {
  id: string
  name: CityText
  /** Name as written locally (Traditional Chinese for Hong Kong). */
  localName: string
  clusterId: string
  coordinates: {
    lat: number
    lng: number
    /** "site" = the place itself; "area" = a street, market or neighbourhood centre point. */
    precision: "site" | "area"
  }
  categories: PlaceCategory[]
  /** Stable facts only, each one supported by `sources`. */
  summary: CityText
  sources: [Source, ...Source[]]
  /** Editorial estimate of a typical visit, not a sourced fact. */
  visitMinutes: { min: number; max: number }
  bestTime: BestTime
  setting: PlaceSetting
  weatherSensitive: boolean
  walking: WalkingEffort
}

export interface Cluster {
  id: string
  name: CityText
  /** Which side of the harbour; used by the map and to reason about ferry crossings. */
  side: "island" | "kowloon"
  /**
   * Clusters you can reach directly (on foot, or by one ferry / tram / MTR hop) without passing
   * through another cluster. Must be symmetric. Routes may only walk between neighbours.
   */
  neighbours: string[]
}

export type TransportMode = "walk" | "mtr" | "tram" | "peak_tram" | "ferry" | "bus" | "taxi"

export interface RouteStop {
  placeId: string
  order: number
  estimatedVisitMinutes: number
  /** Estimate, shown as "about N min". 0 for the first stop. */
  estimatedTravelMinutesFromPrevious: number
  /** How you get here from the previous stop. Omitted for the first stop. */
  transportMode?: TransportMode
  reason: CityText
}

/** A processed photo (see scripts/process-story-photos.mjs): `src` is the base path without the -800/-1600 suffix. */
export interface CityPhoto {
  src: string
  width: number
  height: number
  alt: CityText
  /** Where the photo comes from, e.g. a first-hand Travel Story. Photos never claim to show a specific stop. */
  credit: { label: CityText; href: string }
}

export interface TravelRoute {
  id: string
  photo?: CityPhoto
  name: CityText
  theme: "essentials" | "photo" | "local"
  description: CityText
  estimatedDurationMinutes: number
  stops: RouteStop[]
  goodFor: CityText[]
  tradeoffs: CityText[]
  whyThisRoute: CityText[]
}

export interface City {
  slug: string
  name: CityText
  localName: string
  country: CityText
  /** Orientation for a first-time visitor. Stable facts only. */
  intro: CityText
  hero: CityPhoto
  /** Schematic map data. Not for navigation. */
  map: {
    /** Water outline as [lng, lat] points, drawn behind the places. */
    water: [number, number][]
    waterLabel: CityText
    /** [lng, lat] where the water label sits. */
    waterLabelAt: [number, number]
  }
  clusters: Cluster[]
  places: Place[]
  routes: TravelRoute[]
}
