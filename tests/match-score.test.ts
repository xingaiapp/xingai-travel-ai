import { describe, expect, it } from "vitest"
import { computeMatchScore, matchScoreLabelBand, overallTenths, rankedAlternatives, walkabilityTenths } from "@/lib/match-score"
import type { Destination } from "@/lib/types"

describe("computeMatchScore", () => {
  it("stays within floors for confidence bands", () => {
    for (const stars of [-3, 0, 1, 2, 3, 4, 5, 9]) {
      for (const c of ["high", "medium", "low"] as const) {
        const s = computeMatchScore(stars, c)
        expect(s).toBeGreaterThanOrEqual(c === "low" ? 28 : 52)
        expect(s).toBeLessThanOrEqual(98)
      }
    }
  })

  it("lets walkability separate demoted (low-confidence) peers below the old 52 floor", () => {
    expect(computeMatchScore(2, "low", "Excellent")).toBeGreaterThan(computeMatchScore(2, "low", "Moderate"))
    expect(computeMatchScore(2, "low", "Moderate")).toBeLessThan(52)
  })

  it("ranks higher confidence above lower at equal stars", () => {
    expect(computeMatchScore(4, "high")).toBeGreaterThan(computeMatchScore(4, "medium"))
    expect(computeMatchScore(4, "medium")).toBeGreaterThan(computeMatchScore(4, "low"))
  })

  it("nudges score with labeled walkability so equal star/confidence can differ", () => {
    expect(computeMatchScore(4, "medium", "Excellent")).toBeGreaterThan(computeMatchScore(4, "medium", "Moderate"))
  })

  it("treats a non-numeric overall as 3 stars", () => {
    expect(computeMatchScore(Number.NaN, "medium")).toBe(computeMatchScore(3, "medium"))
  })
})

describe("matchScoreLabelBand", () => {
  it("bands at 86 and 72", () => {
    expect(matchScoreLabelBand(86)).toBe("excellent")
    expect(matchScoreLabelBand(85)).toBe("strong")
    expect(matchScoreLabelBand(72)).toBe("strong")
    expect(matchScoreLabelBand(71)).toBe("fair")
  })
})

describe("walkabilityTenths", () => {
  it("maps localized labels", () => {
    expect(walkabilityTenths("Excellent")).toBe(9)
    expect(walkabilityTenths("良好")).toBe(7)
    expect(walkabilityTenths("보통")).toBe(5)
    expect(walkabilityTenths("pobre")).toBe(3)
  })
  it("returns null for unknown or blank text", () => {
    expect(walkabilityTenths("")).toBeNull()
    expect(walkabilityTenths("hilly")).toBeNull()
  })
})

describe("overallTenths", () => {
  it("doubles stars and clamps to 2–10", () => {
    expect(overallTenths(4)).toBe(8)
    expect(overallTenths(0)).toBe(6) // 0 is falsy → default 3 stars
    expect(overallTenths(9)).toBe(10)
  })
})

describe("rankedAlternatives", () => {
  const dest = (
    name: string,
    overall: number,
    confidence: Destination["confidence"],
    isWinner = false,
    flightTime = "",
    walkability = ""
  ) =>
    ({
      name,
      country: "",
      isWinner,
      confidence,
      whyWins: [],
      tradeoffs: [],
      scores: { overall, weather: "", flightTime, walkability },
    }) as Destination

  it("drops the winner and sorts the rest by score", () => {
    const out = rankedAlternatives([dest("A", 5, "high", true), dest("B", 3, "low"), dest("C", 4, "high")])
    expect(out.map((x) => x.item.name)).toEqual(["C", "B"])
  })

  it("breaks equal scores with shorter flight first", () => {
    const out = rankedAlternatives([
      dest("A", 5, "high", true),
      dest("Lisbon", 4, "medium", false, "~12h (1 stop)"),
      dest("Mexico City", 4, "medium", false, "~5h nonstop"),
    ])
    expect(out.map((x) => x.item.name)).toEqual(["Mexico City", "Lisbon"])
  })
})
