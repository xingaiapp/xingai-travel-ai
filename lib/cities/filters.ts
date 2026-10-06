import type { CityCatalogIntent, CityCatalogRegion } from "@/lib/cities/catalog"

export type RegionFilter = "all" | CityCatalogRegion
export type IntentFilter = "all" | CityCatalogIntent

const REGIONS: CityCatalogRegion[] = ["asia", "europe", "americas"]
const INTENTS: CityCatalogIntent[] = ["first-city", "beach", "food", "culture"]

export function parseRegion(raw: string | null | undefined): RegionFilter {
  if (raw && REGIONS.includes(raw as CityCatalogRegion)) return raw as CityCatalogRegion
  return "all"
}

export function parseIntent(raw: string | null | undefined): IntentFilter {
  if (raw && INTENTS.includes(raw as CityCatalogIntent)) return raw as CityCatalogIntent
  return "all"
}
