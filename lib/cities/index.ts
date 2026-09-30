import type { Locale, Messages } from "@/lib/i18n/types"
import { hongKong } from "./hong-kong.ts"
import type { City, CityText, Place } from "./types"

/** City registry (ADR 0008). Adding a city = adding its data file here. */
export const cities: City[] = [hongKong]

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
