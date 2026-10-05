import { describe, expect, it } from "vitest"
import { normalizeBudget } from "@/lib/budget"

const ctx = (amount: number, currency = "USD") => ({ budget: { amount, currency } })
const now = new Date("2026-10-05T00:00:00Z")

describe("normalizeBudget", () => {
  const lines = [
    { category: "lodging", low: 800, high: 1200 },
    { category: "flights", low: "$900", high: 1400, note: " 2 economy tickets " },
    { category: "food", low: 300, high: 200 }, // swapped
    { category: "flights", low: 1, high: 1 }, // duplicate dropped
    { category: "souvenirs", low: 50, high: 80 }, // unknown dropped
  ]

  it("cleans lines, orders them, and computes totals itself", () => {
    const out = normalizeBudget({ currency: "usd", lines }, ctx(5000), now)!
    expect(out.lines.map((l) => l.category)).toEqual(["flights", "lodging", "food"])
    expect(out.lines[0]).toMatchObject({ low: 900, high: 1400, note: "2 economy tickets" })
    expect(out.lines[2]).toMatchObject({ low: 200, high: 300 })
    expect(out.totalLow).toBe(1900)
    expect(out.totalHigh).toBe(2900)
    expect(out.estimatedAt).toBe(now.toISOString())
  })

  it("derives within / tight / over from the totals", () => {
    expect(normalizeBudget({ lines }, ctx(3000), now)!.verdict).toBe("within")
    expect(normalizeBudget({ lines }, ctx(2000), now)!.verdict).toBe("tight")
    expect(normalizeBudget({ lines }, ctx(1000), now)!.verdict).toBe("over")
  })

  it("gives no verdict across currencies or without a budget", () => {
    expect(normalizeBudget({ currency: "EUR", lines }, ctx(3000), now)!.verdict).toBeUndefined()
    expect(normalizeBudget({ lines }, ctx(0), now)!.verdict).toBeUndefined()
  })

  it("refuses an estimate without flights or lodging", () => {
    expect(normalizeBudget({ lines: [{ category: "lodging", low: 1, high: 2 }] }, ctx(100), now)).toBeUndefined()
    expect(normalizeBudget(null, ctx(100), now)).toBeUndefined()
    expect(normalizeBudget({ lines: "nope" }, ctx(100), now)).toBeUndefined()
  })
})
