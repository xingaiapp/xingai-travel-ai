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
  /** True only when this URL includes a configured partner id. */
  sponsored?: boolean
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

/** Revenue stays unavailable until at least one partner id is set at build time. */
export function affiliateIdsConfigured(): boolean {
  return Object.values(cfg).some((id) => id.trim().length > 0)
}

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
  /** IATA code, or null when the origin text is not a known airport (see lib/airports.ts). */
  originCode: string | null
  /** Origin as typed, used in the Google Flights query when there is no code. */
  originName?: string
  destinationCity: string    // e.g. "Lisbon"
  /** IATA code, or null when unknown — never a guessed code. */
  destinationCode: string | null
  dates: TripDates
  /** Party size; everyone is searched as an adult (the form has no child ages). */
  travelers?: number
  suggestedActivities?: string[]
}): AffiliateLinks {
  const { originCode, destinationCity, destinationCode, suggestedActivities = [] } = params
  const originName = params.originName?.trim() ?? ""
  const citySlug = destinationCity.toLowerCase().replace(/\s+/g, "-")
  // Shared trip links carry no dates; send partners a plain city search then.
  const dates = usableDates(params.dates)
  const adults = Math.min(Math.max(Math.round(params.travelers ?? 0), 0), 9)
  const rooms = adults > 0 ? Math.ceil(adults / 2) : 0
  const yymmdd = (d: string) => d.slice(2).replace(/-/g, "")

  // Skyscanner's path needs real airport codes on both ends; without them we skip it rather
  // than send a search to the wrong airport. /{from}/{to}/{YYMMDD}/{YYMMDD}/, adultsv2 = party size.
  let skyscanner: string | null = null
  if (originCode && destinationCode) {
    skyscanner = `https://www.skyscanner.com/transport/flights/${enc(originCode.toLowerCase())}/${enc(destinationCode.toLowerCase())}/`
    if (dates) skyscanner += `${yymmdd(dates.checkIn)}/${yymmdd(dates.checkOut)}/`
    if (adults) skyscanner = withParam(withParam(skyscanner, "adultsv2", String(adults)), "rtn", dates ? "1" : "")
    skyscanner = withParam(skyscanner, "ref", cfg.skyscanner)
  }

  // Google Flights understands city names, so a missing code falls back to the name.
  const fromLabel = originCode ?? originName
  const toLabel = destinationCode ?? destinationCity

  // Google Flights parses this exact English phrasing, and only with hl=en; other UI languages
  // (and "from X to Y" order) open an empty search form. Verified 2026-09.
  const googleQuery = [
    `Flights to ${toLabel}${fromLabel ? ` from ${fromLabel}` : ""}`,
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

  const routeLabel = fromLabel ? `${fromLabel} → ${toLabel}` : toLabel
  const flights: AffiliateLink[] = [
    ...(skyscanner
      ? [{ platform: "Skyscanner", label: routeLabel, url: skyscanner, sponsored: Boolean(cfg.skyscanner.trim()) }]
      : []),
    {
      platform: "Google Flights",
      label: routeLabel,
      url: `https://www.google.com/travel/flights?q=${enc(googleQuery)}&hl=en`,
    },
  ]

  const hotels: AffiliateLink[] = [
    { platform: "Booking.com", label: `${destinationCity} — Booking.com`, url: booking, sponsored: Boolean(cfg.booking.trim()) },
    { platform: "Expedia", label: `${destinationCity} — Expedia`, url: expedia, sponsored: Boolean(cfg.expedia.trim()) },
  ]

  const activities: AffiliateLink[] = [
    {
      platform: "Viator",
      label: `Top tours in ${destinationCity}`,
      url: withParam(`https://www.viator.com/search/${citySlug}`, "pid", cfg.viator),
      sponsored: Boolean(cfg.viator.trim()),
    },
    { platform: "GetYourGuide", label: `${destinationCity} experiences`, url: gyg, sponsored: Boolean(cfg.gyg.trim()) },
    ...suggestedActivities.slice(0, 1).map((activity) => ({
      platform: "Viator",
      label: activity,
      url: withParam(`https://www.viator.com/search/${enc(activity)}`, "pid", cfg.viator),
      sponsored: Boolean(cfg.viator.trim()),
    })),
  ]

  return { flights, hotels, activities }
}
