import type { Locale, Messages } from "@/lib/i18n/types"
import { barcelona } from "./barcelona.ts"
import { hongKong } from "./hong-kong.ts"
import { lisbon } from "./lisbon.ts"
import { losCabos } from "./los-cabos.ts"
import { macau } from "./macau.ts"
import { seoul } from "./seoul.ts"
import { shanghai } from "./shanghai.ts"
import { singapore } from "./singapore.ts"
import { taipei } from "./taipei.ts"
import { tokyo } from "./tokyo.ts"
import type { City, CityText, Place } from "./types"

/** City registry (ADR 0008). Adding a city = adding its data file here. */
export const cities: City[] = [
  hongKong,
  tokyo,
  seoul,
  taipei,
  macau,
  singapore,
  losCabos,
  shanghai,
  lisbon,
  barcelona,
]

export function getCity(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug)
}

export function cityText(text: CityText, locale: Locale): string {
  return text[locale]
}

export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match))
}

/** "45 min", "1 h 30 min", "5 h" in the UI language. */
export function formatMinutes(total: number, messages: Messages): string {
  const m = messages.city
  const hours = Math.floor(total / 60)
  const minutes = Math.round(total % 60)
  if (hours === 0) return fill(m.minutes, { m: minutes })
  if (minutes === 0) return fill(m.hours, { h: hours })
  return fill(m.hoursMinutes, { h: hours, m: minutes })
}

/** Hand directions to the traveler's own map app; the page's map is schematic only. */
export function mapsUrl(place: Place): string {
  const { lat, lng } = place.coordinates
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
}

/** Prefill Decide with this city — same pattern as Stories (`?places=&region=`). */
export function cityDecideHref(city: City) {
  const regionBySlug: Record<string, string> = {
    "hong-kong": "asia",
    tokyo: "asia",
    seoul: "asia",
    taipei: "asia",
    macau: "asia",
    singapore: "asia",
    "los-cabos": "latin_america",
    shanghai: "asia",
    lisbon: "europe",
    barcelona: "europe",
  }
  const params = new URLSearchParams({ places: city.name.en })
  const region = regionBySlug[city.slug]
  if (region) params.set("region", region)
  return `/decide?${params.toString()}#trip-form`
}

/** Fire-and-forget funnel event (ADR 0008 §7). Logged only; never affects any decision. */
export function trackCityEvent(
  type: "city_from_result" | "city_route_select" | "city_to_decide",
  city: string,
  route?: string,
) {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, city, route }),
    keepalive: true,
  }).catch(() => {})
}

function normalizeName(name: string) {
  return name.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim()
}

/**
 * Cities for any destination in a finished comparison, in comparison order.
 * Matches names in every locale (the comparison may come back in Chinese or Korean).
 * Never used for scoring (ADR 0008 §1.4).
 */
export function citiesForDestinations(names: string[]): City[] {
  const found: City[] = []
  for (const raw of names) {
    const wanted = normalizeName(raw)
    const city = cities.find((item) =>
      [...Object.values(item.name), item.localName].some((label) => {
        const target = normalizeName(label)
        // Latin names need a word boundary ("Hong Kong, China"); CJK names have no spaces ("香港特别行政区").
        const cjk = !/[a-z]/.test(target)
        return wanted === target || wanted.startsWith(cjk ? target : `${target} `)
      })
    )
    if (city && !found.includes(city)) found.push(city)
  }
  return found
}
