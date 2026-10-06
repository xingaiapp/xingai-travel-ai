import { NextRequest } from "next/server"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { mockCompareResult } from "@/lib/mock-data"

const create = vi.fn()
vi.mock("openai", () => ({ default: class { chat = { completions: { create } } } }))
vi.mock("next/server", async (orig) => ({ ...(await orig<typeof import("next/server")>()), after: (fn: () => unknown) => fn() }))
const recordEvent = vi.fn()
vi.mock("@/lib/metrics", () => ({ recordEvent: (...args: unknown[]) => recordEvent(...args) }))

const { POST } = await import("@/app/api/inspire/route")
const { setRateLimitStore } = await import("@/lib/rate-limit")

const inspireBody = {
  vibe: "explore",
  flightRange: "medium",
  priority: "food",
  budget: { amount: 2500, currency: "USD" },
  travelers: { count: 2, type: "couple" },
  origin: "Chicago",
  locale: "en",
}

const inspireOk = {
  ...mockCompareResult,
  winner: "Lisbon",
  destinations: mockCompareResult.destinations.map((d, i) => ({
    ...d,
    name: i === 0 ? "Lisbon" : d.name,
    isWinner: i === 0,
    flightHours: 8 + i * 0.5,
  })),
}

const post = (body: unknown, ip = "2.2.2.2") =>
  POST(
    new NextRequest("http://localhost/api/inspire", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": ip },
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
  )

const modelReply = (content: string, finish_reason = "stop") => ({
  choices: [{ message: { content }, finish_reason }],
})

describe("POST /api/inspire", () => {
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

  it("returns a labeled demo without an API key", async () => {
    vi.stubEnv("OPENAI_API_KEY", "")
    const res = await post(inspireBody)
    const json = await res.json()
    expect(json.demo).toBe(true)
    expect(json.inspireMode).toBe(true)
    expect(create).not.toHaveBeenCalled()
  })

  it("rejects bad bodies with 400", async () => {
    expect((await post("nope")).status).toBe(400)
    expect((await post({ ...inspireBody, vibe: "nope" })).status).toBe(400)
  })

  it("returns a constraint-valid decision and records decision_ok", async () => {
    create.mockResolvedValueOnce(modelReply(JSON.stringify(inspireOk)))
    const res = await post(inspireBody)
    expect(res.status).toBe(200)
    expect((await res.json()).winner).toBe("Lisbon")
    expect(recordEvent).toHaveBeenCalledWith("decision_ok", { mode: "inspire", locale: "en" })
  })

  it("returns 502 when the model never satisfies flight constraints", async () => {
    const bad = {
      ...inspireOk,
      destinations: inspireOk.destinations.map((d) => ({ ...d, flightHours: 20 })),
    }
    create.mockResolvedValue(modelReply(JSON.stringify(bad)))
    const res = await post(inspireBody)
    expect(res.status).toBe(502)
    expect((await res.json()).code).toBe("INSPIRE_CONSTRAINTS")
    expect(recordEvent).toHaveBeenCalledWith("decision_fail", { mode: "inspire" })
  })

  it("returns 429 past the daily limit", async () => {
    create.mockResolvedValue(modelReply(JSON.stringify(inspireOk)))
    await post(inspireBody)
    create.mockClear()
    const res = await post(inspireBody)
    expect(res.status).toBe(429)
    expect(create).not.toHaveBeenCalled()
    expect(recordEvent).toHaveBeenCalledWith("decision_limited", { mode: "inspire" })
  })
})
