export interface TripDates {
  checkIn: string   // YYYY-MM-DD
  checkOut: string
}

export interface AffiliateLink {
  platform: string
  label: string
  url: string
  note?: string
  badge?: string
}

export interface AffiliateLinks {
  flights: AffiliateLink[]
  hotels: AffiliateLink[]
  activities: AffiliateLink[]
}

const cfg = {
  booking:    process.env.NEXT_PUBLIC_BOOKING_AFFILIATE_ID    ?? "",
  skyscanner: process.env.NEXT_PUBLIC_SKYSCANNER_PARTNER_ID   ?? "",
  expedia:    process.env.NEXT_PUBLIC_EXPEDIA_CID             ?? "",
  viator:     process.env.NEXT_PUBLIC_VIATOR_PARTNER_ID       ?? "",
  gyg:        process.env.NEXT_PUBLIC_GETYOURGUIDE_PARTNER_ID ?? "",
}

function enc(s: string) { return encodeURIComponent(s) }

/** Append the partner id only when configured; the search itself never depends on it. */
function withParam(url: string, key: string, value: string) {
  if (!value) return url
  return `${url}${url.includes("?") ? "&" : "?"}${key}=${enc(value)}`
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

/**
 * Dates go to partners only when both are valid, ordered, and not in the past —
 * a stale default (e.g. last spring) would make OTAs show an error instead of results.
 */
export function usableDates(dates: TripDates, today = new Date().toISOString().slice(0, 10)): TripDates | null {
  const { checkIn, checkOut } = dates
  if (!ISO_DATE.test(checkIn) || !ISO_DATE.test(checkOut)) return null
  if (checkOut <= checkIn || checkIn < today) return null
  return dates
}

export function buildAffiliateLinks(params: {
  originCode: string         // e.g. "SFO"
  destinationCity: string    // e.g. "Lisbon"
  destinationCode: string    // e.g. "LIS"
  dates: TripDates
  /** Party size; everyone is searched as an adult (the form has no child ages). */
  travelers?: number
  suggestedActivities?: string[]
}): AffiliateLinks {
  const { originCode, destinationCity, destinationCode, suggestedActivities = [] } = params
  const citySlug = destinationCity.toLowerCase().replace(/\s+/g, "-")
  // Shared trip links carry no dates; send partners a plain city search then.
  const dates = usableDates(params.dates)
  const adults = Math.min(Math.max(Math.round(params.travelers ?? 0), 0), 9)
  const rooms = adults > 0 ? Math.ceil(adults / 2) : 0
  const yymmdd = (d: string) => d.slice(2).replace(/-/g, "")

  // Skyscanner: /{from}/{to}/{YYMMDD}/{YYMMDD}/ for a round trip, adultsv2 = party size.
  let skyscanner = `https://www.skyscanner.com/transport/flights/${enc(originCode.toLowerCase())}/${enc(destinationCode.toLowerCase())}/`
  if (dates) skyscanner += `${yymmdd(dates.checkIn)}/${yymmdd(dates.checkOut)}/`
  if (adults) skyscanner = withParam(withParam(skyscanner, "adultsv2", String(adults)), "rtn", dates ? "1" : "")
  skyscanner = withParam(skyscanner, "ref", cfg.skyscanner)

  // Google Flights parses this exact English phrasing, and only with hl=en; other UI languages
  // (and "from X to Y" order) open an empty search form. Verified 2026-09.
  const googleQuery = [
    `Flights to ${destinationCode} from ${originCode}`,
    dates ? `on ${dates.checkIn} through ${dates.checkOut}` : "",
    adults ? `for ${adults} adult${adults > 1 ? "s" : ""}` : "",
  ].filter(Boolean).join(" ")

  let booking = `https://www.booking.com/searchresults.html?ss=${enc(destinationCity)}`
  if (dates) booking += `&checkin=${dates.checkIn}&checkout=${dates.checkOut}`
  if (adults) booking += `&group_adults=${adults}&no_rooms=${rooms}&group_children=0`
  booking = withParam(booking, "aid", cfg.booking)

  let expedia = `https://www.expedia.com/Hotel-Search?destination=${enc(destinationCity)}`
  if (dates) expedia += `&startDate=${dates.checkIn}&endDate=${dates.checkOut}`
  if (adults) expedia += `&adults=${adults}`
  expedia = withParam(expedia, "cid", cfg.expedia)

  let gyg = `https://www.getyourguide.com/s/?q=${enc(destinationCity)}`
  if (dates) gyg += `&date_from=${dates.checkIn}&date_to=${dates.checkOut}`
  gyg = withParam(gyg, "partner_id", cfg.gyg)

  const flights: AffiliateLink[] = [
    { platform: "Skyscanner", label: `${originCode} → ${destinationCode}`, url: skyscanner },
    {
      platform: "Google Flights",
      label: `${originCode} → ${destinationCode}`,
      url: `https://www.google.com/travel/flights?q=${enc(googleQuery)}&hl=en`,
    },
  ]

  const hotels: AffiliateLink[] = [
    { platform: "Booking.com", label: `${destinationCity} — Booking.com`, url: booking },
    { platform: "Expedia", label: `${destinationCity} — Expedia`, url: expedia },
  ]

  const activities: AffiliateLink[] = [
    {
      platform: "Viator",
      label: `Top tours in ${destinationCity}`,
      url: withParam(`https://www.viator.com/search/${citySlug}`, "pid", cfg.viator),
    },
    { platform: "GetYourGuide", label: `${destinationCity} experiences`, url: gyg },
    ...suggestedActivities.slice(0, 1).map((activity) => ({
      platform: "Viator",
      label: activity,
      url: withParam(`https://www.viator.com/search/${enc(activity)}`, "pid", cfg.viator),
    })),
  ]

  return { flights, hotels, activities }
}

// Extract IATA-style origin code from freetext like "San Francisco (SFO)"
export function extractOriginCode(origin: string): string {
  const match = origin.match(/\(([A-Z]{3})\)/)
  return match ? match[1] : origin.slice(0, 3).toUpperCase()
}

// Guess destination IATA from city name (best-effort mapping)
const IATA_MAP: Record<string, string> = {
  lisbon: "LIS", porto: "OPO", barcelona: "BCN", madrid: "MAD", paris: "CDG",
  rome: "FCO", amsterdam: "AMS", prague: "PRG", vienna: "VIE", athens: "ATH",
  istanbul: "IST", dubai: "DXB", singapore: "SIN", tokyo: "NRT", bangkok: "BKK",
  bali: "DPS", "new york": "JFK", "mexico city": "MEX", "buenos aires": "EZE",
  "cape town": "CPT", london: "LHR", berlin: "BER", zurich: "ZRH",
}

export function guessIata(cityName: string): string {
  const key = cityName.toLowerCase()
  for (const [city, code] of Object.entries(IATA_MAP)) {
    if (key.includes(city)) return code
  }
  return cityName.slice(0, 3).toUpperCase()
}
