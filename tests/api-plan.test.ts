import { NextRequest } from "next/server"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { mockPlanResult, mockRawBudget } from "@/lib/mock-data"

const create = vi.fn()
vi.mock("openai", () => ({ default: class { chat = { completions: { create } } } }))
vi.mock("next/server", async (orig) => ({ ...(await orig<typeof import("next/server")>()), after: (fn: () => unknown) => fn() }))
const recordEvent = vi.fn()
vi.mock("@/lib/metrics", () => ({ recordEvent: (...args: unknown[]) => recordEvent(...args) }))

const { POST } = await import("@/app/api/plan/route")
const { setRateLimitStore } = await import("@/lib/rate-limit")

const tripContext = {
  dates: { from: "2026-12-01", to: "2026-12-06", nights: 5 },
  origin: "Chicago",
  region: "anywhere",
  budget: { amount: 3000, currency: "USD" },
  travelers: { count: 2, type: "couple" },
  style: ["city"],
  pace: "balanced",
  locale: "en",
}

const planBody = {
  destination: "Lisbon, Portugal",
  tripContext,
}

const post = (body: unknown, ip = "3.3.3.3") =>
  POST(
    new NextRequest("http://localhost/api/plan", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": ip },
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
  )

const modelReply = (content: string, finish_reason = "stop") => ({
  choices: [{ message: { content }, finish_reason }],
})

describe("POST /api/plan", () => {
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
    const res = await post(planBody)
    const json = await res.json()
    expect(json.demo).toBe(true)
    expect(json.destination).toBeTruthy()
    expect(create).not.toHaveBeenCalled()
  })

  it("rejects bad bodies with 400", async () => {
    expect((await post("nope")).status).toBe(400)
    expect((await post({ destination: "", tripContext })).status).toBe(400)
  })

  it("returns a plan and records plan_ok", async () => {
    create.mockResolvedValueOnce(
      modelReply(JSON.stringify({ ...mockPlanResult, budgetEstimate: mockRawBudget() }))
    )
    const res = await post(planBody)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.destination).toBe("Lisbon, Portugal")
    expect(json.budgetEstimate?.verdict).toBeTruthy()
    expect(recordEvent).toHaveBeenCalledWith("plan_ok")
  })

  it("retries once then 502 with plan_fail", async () => {
    create.mockResolvedValue(modelReply("{broken", "length"))
    const res = await post(planBody)
    expect(res.status).toBe(502)
    expect(create).toHaveBeenCalledTimes(2)
    expect(recordEvent).toHaveBeenCalledWith("plan_fail")
  })

  it("returns 429 past the plan daily limit without calling the model", async () => {
    // plan bucket = 3 × compare limit; with limit 1 that is 3 successful plans.
    create.mockResolvedValue(modelReply(JSON.stringify({ ...mockPlanResult, budgetEstimate: mockRawBudget() })))
    for (let i = 0; i < 3; i++) await post(planBody, "9.9.9.9")
    create.mockClear()
    const res = await post(planBody, "9.9.9.9")
    expect(res.status).toBe(429)
    expect(create).not.toHaveBeenCalled()
  })
})
