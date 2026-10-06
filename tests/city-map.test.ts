import { describe, expect, it } from "vitest"
import { applyCityMark, cityMapProgress, markOf, parseCityMap } from "@/lib/city-map"

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
