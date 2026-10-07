import { describe, expect, it } from "vitest"
import { buildAffiliateLinks } from "@/lib/affiliate"
import { airportCodeFor, originAirportCode } from "@/lib/airports"
import { cities } from "@/lib/cities"
import type { Locale } from "@/lib/i18n/types"

/** Main international airport for every live city guide. A new guide must be added here. */
const GUIDE_AIRPORTS: Record<string, string> = {
  "hong-kong": "HKG",
  tokyo: "NRT",
  seoul: "ICN",
  taipei: "TPE",
  macau: "MFM",
  singapore: "SIN",
  "los-cabos": "SJD",
  shanghai: "PVG",
  lisbon: "LIS",
  barcelona: "BCN",
  xian: "XIY",
  "new-orleans": "MSY",
}

const LOCALES: Locale[] = ["en", "zh", "ko", "es"]

describe("airportCodeFor", () => {
  it("resolves every live city guide in every language", () => {
    for (const city of cities) {
      const expected = GUIDE_AIRPORTS[city.slug]
      expect(expected, `add ${city.slug} to GUIDE_AIRPORTS and lib/airports.ts`).toBeDefined()
      for (const locale of LOCALES) {
        const name = city.name[locale]
        const country = city.country[locale]
        expect(airportCodeFor(name), `${city.slug} ${locale} "${name}"`).toBe(expected)
        expect(airportCodeFor(`${name}, ${country}`), `${city.slug} ${locale} with country`).toBe(expected)
      }
      expect(airportCodeFor(city.localName), `${city.slug} localName`).toBe(expected)
    }
  })

  it("never invents a code from the first letters of the city", () => {
    expect(airportCodeFor("Taipei, Taiwan")).toBe("TPE") // was TAI (Ta'izz, Yemen)
    expect(airportCodeFor("Los Cabos, Mexico")).toBe("SJD") // was LOS (Lagos, Nigeria)
    expect(airportCodeFor("Ljubljana, Slovenia")).toBeNull()
    expect(airportCodeFor("")).toBeNull()
  })

  it("matches Latin aliases as whole words", () => {
    expect(airportCodeFor("St. Jerome")).toBeNull()
    expect(airportCodeFor("Rome, Italy")).toBe("FCO")
    expect(airportCodeFor("Los Angeles")).toBe("LAX")
  })
})

describe("originAirportCode", () => {
  it("prefers an explicit code, then a bare code, then a known city", () => {
    expect(originAirportCode("San Francisco (SFO)")).toBe("SFO")
    expect(originAirportCode("Oakland (oak)")).toBe("OAK")
    expect(originAirportCode("sea")).toBe("SEA")
    expect(originAirportCode("Seattle")).toBe("SEA")
    expect(originAirportCode("Los Angeles")).toBe("LAX") // was LOS (Lagos)
    expect(originAirportCode("Boise, Idaho")).toBeNull()
  })
})

describe("buildAffiliateLinks flight links", () => {
  const dates = { checkIn: "2099-11-06", checkOut: "2099-11-10" }

  it("uses real codes for Skyscanner and Google Flights", () => {
    const { flights } = buildAffiliateLinks({
      originCode: "SEA",
      originName: "Seattle",
      destinationCity: "Taipei",
      destinationCode: "TPE",
      dates,
      travelers: 2,
    })
    expect(flights.map((f) => f.platform)).toEqual(["Skyscanner", "Google Flights"])
    expect(flights[0].url).toContain("/flights/sea/tpe/991106/991110/")
    expect(decodeURIComponent(flights[1].url)).toContain("Flights to TPE from SEA")
  })

  it("drops Skyscanner and searches Google Flights by name when a code is unknown", () => {
    const { flights } = buildAffiliateLinks({
      originCode: null,
      originName: "Boise, Idaho",
      destinationCity: "Ljubljana",
      destinationCode: null,
      dates,
      travelers: 2,
    })
    expect(flights.map((f) => f.platform)).toEqual(["Google Flights"])
    expect(decodeURIComponent(flights[0].url)).toContain("Flights to Ljubljana from Boise, Idaho")
    expect(flights[0].label).toBe("Boise, Idaho → Ljubljana")
  })
})
