import { describe, expect, it } from "vitest"
import { mockCompareResult, mockPlanResult } from "@/lib/mock-data"
import { decodeSharedTrip, encodeSharedTrip } from "@/lib/share-codec"

describe("share codec", () => {
  it("round-trips compare + plan and strips flight book-first items", async () => {
    const encoded = await encodeSharedTrip(mockCompareResult, mockPlanResult)
    expect(encoded).toMatch(/^[A-Za-z0-9_-]+$/)
    const decoded = await decodeSharedTrip(encoded)
    expect(decoded?.c.winner).toBe(mockCompareResult.winner)
    expect(decoded?.p?.bookFirst.some((b) => b.type === "flight")).toBe(false)
  })

  it("clips over-long model text instead of failing", async () => {
    const long = { ...mockCompareResult, whyNotOthers: "x".repeat(5000) }
    const decoded = await decodeSharedTrip(await encodeSharedTrip(long, null))
    expect(decoded?.c.whyNotOthers.length).toBe(1200)
    expect(decoded?.p).toBeNull()
  })

  it("rejects junk, oversize, and bad characters", async () => {
    expect(await decodeSharedTrip(null)).toBeNull()
    expect(await decodeSharedTrip("not base64!")).toBeNull()
    expect(await decodeSharedTrip("A".repeat(12_001))).toBeNull()
    expect(await decodeSharedTrip("AAAA")).toBeNull()
  })
})
