import { describe, expect, it } from "vitest"
import {
  avoidLongFlights,
  longFlightLimitHours,
  normalizeCompareResult,
  parseFlightHours,
} from "@/lib/compare-normalize"
import type { CompareResult, TripContext } from "@/lib/types"

const raw = (over: Partial<CompareResult> = {}) =>
  ({
    winner: "",
    confidence: "high",
    whyNotOthers: "  because  ",
    destinations: [
      { name: " Lisbon ", country: "Portugal", isWinner: true, confidence: "high", whyWins: ["a", "", "b"], tradeoffs: [], scores: { overall: 7, weather: "", flightTime: "8h", walkability: "Good" } },
      { name: "Porto", country: "Portugal", isWinner: false, confidence: "medium", whyWins: [], tradeoffs: ["x"], scores: { overall: 3, weather: "Mild", flightTime: "", walkability: "Good" } },
    ],
    ...over,
  }) as CompareResult

const shortTripAvoidLong: TripContext = {
  dates: { from: "2026-11-05", to: "2026-11-09", nights: 4 },
  origin: "SFO",
  region: "anywhere",
  budget: { amount: 2000, currency: "USD" },
  travelers: { count: 2, type: "couple" },
  style: ["city"],
  pace: "balanced",
  avoid: "Long flights",
}

describe("normalizeCompareResult", () => {
  it("trims, clamps stars, and drops blank lines", () => {
    const out = normalizeCompareResult(raw())
    expect(out.destinations[0].name).toBe("Lisbon")
    expect(out.destinations[0].scores.overall).toBe(5)
    expect(out.destinations[0].whyWins).toEqual(["a", "b"])
    expect(out.whyNotOthers).toBe("because")
  })

  it("fills only blank cells and never rewrites duplicate values", () => {
    const out = normalizeCompareResult(raw())
    expect(out.destinations[0].scores.weather).toMatch(/verify the local forecast/)
    expect(out.destinations[1].scores.flightTime).toBe("~11h from origin hub")
    expect(out.destinations.map((d) => d.scores.walkability)).toEqual(["Good", "Good"])
  })

  it("falls back to the isWinner destination when winner is blank", () => {
    expect(normalizeCompareResult(raw()).winner).toBe("Lisbon")
    expect(normalizeCompareResult(raw({ winner: "Porto" })).winner).toBe("Porto")
  })

  it("returns the input unchanged when there are no destinations", () => {
    const empty = raw({ destinations: [] })
    expect(normalizeCompareResult(empty)).toBe(empty)
  })

  it("demotes long-haul winners when Avoid says long flights on a short trip", () => {
    const out = normalizeCompareResult(
      raw({
        winner: "Lisbon",
        destinations: [
          {
            name: "Lisbon",
            country: "Portugal",
            isWinner: true,
            confidence: "high",
            whyWins: ["food"],
            tradeoffs: [],
            scores: { overall: 5, weather: "Mild", flightTime: "~12h (1 stop)", walkability: "Excellent" },
          },
          {
            name: "Mexico City",
            country: "Mexico",
            isWinner: false,
            confidence: "medium",
            whyWins: ["shorter flight"],
            tradeoffs: [],
            scores: { overall: 4, weather: "Mild", flightTime: "~5h nonstop", walkability: "Good" },
          },
          {
            name: "Miami",
            country: "USA",
            isWinner: false,
            confidence: "medium",
            whyWins: ["beach"],
            tradeoffs: [],
            scores: { overall: 3, weather: "Warm", flightTime: "~6h", walkability: "Moderate" },
          },
        ],
      }),
      { ...shortTripAvoidLong, locale: "zh" }
    )
    expect(out.winner).toBe("Mexico City")
    expect(out.destinations.find((d) => d.name === "Lisbon")?.scores.overall).toBeLessThanOrEqual(2)
    expect(out.destinations.find((d) => d.name === "Lisbon")?.confidence).toBe("low")
    expect(out.whyNotOthers).toMatch(/避开长途/)
    expect(out.destinations.find((d) => d.name === "Lisbon")?.tradeoffs[0]).toMatch(/违反「避开」/)
  })
})

describe("avoid helpers", () => {
  it("parses flight hours", () => {
    expect(parseFlightHours("~12h (1 stop)")).toBe(12)
    expect(parseFlightHours("11 hours")).toBe(11)
    expect(parseFlightHours("nonstop")).toBeNull()
  })

  it("detects long-flight avoid cues", () => {
    expect(avoidLongFlights("Long flights, extreme heat")).toBe(true)
    expect(avoidLongFlights("长途飞行")).toBe(true)
    expect(avoidLongFlights("crowds only")).toBe(false)
  })

  it("uses a tighter hour cap on short trips", () => {
    expect(longFlightLimitHours(4)).toBe(9)
    expect(longFlightLimitHours(10)).toBe(12)
  })
})
