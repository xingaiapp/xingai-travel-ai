import { NextRequest } from "next/server"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { mockCompareResult } from "@/lib/mock-data"

const create = vi.fn()
vi.mock("openai", () => ({ default: class { chat = { completions: { create } } } }))
vi.mock("next/server", async (orig) => ({ ...(await orig<typeof import("next/server")>()), after: (fn: () => unknown) => fn() }))
const recordEvent = vi.fn()
vi.mock("@/lib/metrics", () => ({ recordEvent: (...args: unknown[]) => recordEvent(...args) }))

const { POST } = await import("@/app/api/compare/route")
const { setRateLimitStore } = await import("@/lib/rate-limit")

const trip = {
  dates: { from: "2026-12-01", to: "2026-12-06", nights: 5 },
  origin: "Chicago",
  budget: { amount: 3000, currency: "USD" },
  travelers: { count: 2, type: "couple" },
  style: ["city"],
  pace: "balanced",
  locale: "zh",
}
const post = (body: unknown, ip = "1.1.1.1") =>
  POST(new NextRequest("http://localhost/api/compare", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  }))
const modelReply = (content: string, finish_reason = "stop") => ({
  choices: [{ message: { content }, finish_reason }],
})

describe("POST /api/compare", () => {
  let counts: Map<string, number>
  beforeEach(() => {
    counts = new Map()
    setRateLimitStore({
      async incr(k) {
        counts.set(k, (counts.get(k) ?? 0) + 1)
        return counts.get(k)!
      },
      async get(k) {
        return counts.get(k) ?? 0
      },
    })
    vi.stubEnv("OPENAI_API_KEY", "sk-test")
    vi.stubEnv("TRAVEL_DEMO_DAILY_LIMIT", "1")
    vi.stubEnv("TRAVEL_GLOBAL_DAILY_LIMIT", "0")
    create.mockReset()
    recordEvent.mockReset()
    vi.spyOn(console, "error").mockImplementation(() => {})
  })
  afterEach(() => {
    setRateLimitStore(null)
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it("returns a labeled demo without an API key and never calls the model", async () => {
    vi.stubEnv("OPENAI_API_KEY", "")
    const res = await post(trip)
    expect((await res.json()).demo).toBe(true)
    expect(create).not.toHaveBeenCalled()
  })

  it("rejects bad bodies with 400 without spending quota", async () => {
    expect((await post("not json")).status).toBe(400)
    expect((await post({ ...trip, style: [] })).status).toBe(400)
    expect(counts.size).toBe(0)
  })

  it("returns the normalized decision and records decision_ok", async () => {
    create.mockResolvedValueOnce(modelReply(JSON.stringify(mockCompareResult)))
    const res = await post(trip)
    expect(res.status).toBe(200)
    expect((await res.json()).winner).toBe(mockCompareResult.winner)
    expect(recordEvent).toHaveBeenCalledWith("decision_ok", { mode: "compare", locale: "zh" })
    expect(counts.size).toBeGreaterThan(0)
  })

  it("retries once, then 502 with decision_fail without spending quota", async () => {
    create.mockResolvedValue(modelReply("{not json", "length"))
    const res = await post(trip)
    expect(res.status).toBe(502)
    expect(create).toHaveBeenCalledTimes(2)
    expect(recordEvent).toHaveBeenCalledWith("decision_fail", { mode: "compare" })
    expect(counts.size).toBe(0)
  })

  it("returns 429 past the daily limit without calling the model", async () => {
    create.mockResolvedValue(modelReply(JSON.stringify(mockCompareResult)))
    await post(trip)
    create.mockClear()
    const res = await post(trip)
    expect(res.status).toBe(429)
    expect((await res.json()).code).toBe("RATE_LIMIT")
    expect(create).not.toHaveBeenCalled()
    expect(recordEvent).toHaveBeenCalledWith("decision_limited", { mode: "compare" })
  })
})
