import { describe, expect, it } from "vitest"
import { normalizeCompareResult } from "@/lib/compare-normalize"
import type { CompareResult } from "@/lib/types"

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
})
