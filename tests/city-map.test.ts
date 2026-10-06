import { describe, expect, it } from "vitest"
import { applyCityMapPrefill, applyCityMark, cityMapProgress, markOf, parseCityMap } from "@/lib/city-map"
import type { TripContext } from "@/lib/types"

const baseTrip = {
  dates: { from: "2026-11-01", to: "2026-11-05", nights: 4 },
  origin: "SFO",
  region: "anywhere",
  budget: { amount: 2000, currency: "USD" },
  travelers: { count: 2, type: "couple" },
  style: ["city"],
  pace: "balanced",
} satisfies TripContext

describe("parseCityMap", () => {
  it("returns empty lists for null / invalid JSON", () => {
    expect(parseCityMap(null)).toEqual({ want: [], been: [] })
    expect(parseCityMap("{")).toEqual({ want: [], been: [] })
  })

  it("dedupes slugs and drops want when also been", () => {
    const state = parseCityMap(
      JSON.stringify({ want: ["Tokyo", "tokyo", "seoul"], been: ["tokyo", "lisbon"] })
    )
    expect(state.been).toEqual(["tokyo", "lisbon"])
    expect(state.want).toEqual(["seoul"])
  })
})

describe("applyCityMark", () => {
  it("toggles the same mark off", () => {
    const withWant = applyCityMark({ want: [], been: [] }, "hong-kong", "want")
    expect(markOf(withWant, "hong-kong")).toBe("want")
    expect(applyCityMark(withWant, "hong-kong", "want")).toEqual({ want: [], been: [] })
  })

  it("been replaces want", () => {
    const want = applyCityMark({ want: [], been: [] }, "tokyo", "want")
    const been = applyCityMark(want, "tokyo", "been")
    expect(been).toEqual({ want: [], been: ["tokyo"] })
  })
})

describe("cityMapProgress", () => {
  it("counts only live slugs", () => {
    const progress = cityMapProgress(
      { want: ["tokyo", "paris"], been: ["hong-kong", "atlantis"] },
      ["hong-kong", "tokyo", "seoul"]
    )
    expect(progress).toEqual({
      totalLive: 3,
      beenLive: 1,
      wantLive: 1,
      markedLive: 2,
    })
  })
})

describe("applyCityMapPrefill", () => {
  const names = (slug: string) =>
    ({ tokyo: "Tokyo", "hong-kong": "Hong Kong", seoul: "Seoul" })[slug]

  it("fills empty placesInMind from want and avoid from been", () => {
    const next = applyCityMapPrefill(
      baseTrip,
      { want: ["tokyo", "seoul"], been: ["hong-kong"] },
      names
    )
    expect(next.placesInMind).toBe("Tokyo, Seoul")
    expect(next.avoid).toBe("Already visited: Hong Kong")
  })

  it("does not overwrite existing placesInMind or duplicate avoid tags", () => {
    const next = applyCityMapPrefill(
      { ...baseTrip, placesInMind: "Paris", avoid: "Already visited: Hong Kong" },
      { want: ["tokyo"], been: ["hong-kong"] },
      names
    )
    expect(next.placesInMind).toBe("Paris")
    expect(next.avoid).toBe("Already visited: Hong Kong")
  })
})
