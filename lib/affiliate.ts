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

export function buildAffiliateLinks(params: {
  originCode: string         // e.g. "SFO"
  destinationCity: string    // e.g. "Lisbon"
  destinationCode: string    // e.g. "LIS"
  dates: TripDates
  suggestedActivities?: string[]
}): AffiliateLinks {
  const { originCode, destinationCity, destinationCode, dates, suggestedActivities = [] } = params
  const citySlug = destinationCity.toLowerCase().replace(/\s+/g, "-")

  const flights: AffiliateLink[] = [
    {
      platform: "Skyscanner",
      label: `${originCode} → ${destinationCode}`,
      url: cfg.skyscanner
        ? `https://www.skyscanner.com/transport/flights/${originCode}/${destinationCode}/${dates.checkIn.replace(/-/g, "")}/?ref=${cfg.skyscanner}`
        : `https://www.skyscanner.com/transport/flights/${originCode}/${destinationCode}/`,
    },
    {
      platform: "Google Flights",
      label: `${originCode} → ${destinationCode}`,
      url: `https://www.google.com/flights?q=flights+from+${enc(originCode)}+to+${enc(destinationCode)}`,
    },
  ]

  const hotels: AffiliateLink[] = [
    {
      platform: "Booking.com",
      label: `${destinationCity} — Booking.com`,
      url: cfg.booking
        ? `https://www.booking.com/searchresults.html?ss=${enc(destinationCity)}&checkin=${dates.checkIn}&checkout=${dates.checkOut}&aid=${cfg.booking}`
        : `https://www.booking.com/searchresults.html?ss=${enc(destinationCity)}`,
    },
    {
      platform: "Expedia",
      label: `${destinationCity} — Expedia`,
      url: cfg.expedia
        ? `https://www.expedia.com/Hotel-Search?destination=${enc(destinationCity)}&startDate=${dates.checkIn}&endDate=${dates.checkOut}&cid=${cfg.expedia}`
        : `https://www.expedia.com/Hotel-Search?destination=${enc(destinationCity)}`,
    },
  ]

  const activities: AffiliateLink[] = [
    {
      platform: "Viator",
      label: `Top tours in ${destinationCity}`,
      url: cfg.viator
        ? `https://www.viator.com/search/${citySlug}?pid=${cfg.viator}`
        : `https://www.viator.com/search/${citySlug}`,
    },
    {
      platform: "GetYourGuide",
      label: `${destinationCity} experiences`,
      url: cfg.gyg
        ? `https://www.getyourguide.com/s/?q=${enc(destinationCity)}&partner_id=${cfg.gyg}`
        : `https://www.getyourguide.com/s/?q=${enc(destinationCity)}`,
    },
    ...suggestedActivities.slice(0, 1).map((activity) => ({
      platform: "Viator",
      label: activity,
      url: cfg.viator
        ? `https://www.viator.com/search/${enc(activity)}?pid=${cfg.viator}`
        : `https://www.viator.com/search/${enc(activity)}`,
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
