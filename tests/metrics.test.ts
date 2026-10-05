import { afterEach, describe, expect, it, vi } from "vitest"
import { metricFields, recordEvent } from "@/lib/metrics"

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe("metricFields", () => {
  it("adds sanitized dimension fields and skips empty dims", () => {
    expect(metricFields("affiliate_click", { platform: "Booking.com", type: "hotel", extra: undefined })).toEqual([
      "affiliate_click",
      "affiliate_click|platform=booking-com",
      "affiliate_click|type=hotel",
    ])
  })
})

describe("recordEvent", () => {
  it("writes HINCRBY per field plus EXPIRE to one day hash", async () => {
    vi.stubEnv("KV_REST_API_URL", "https://redis.test")
    vi.stubEnv("KV_REST_API_TOKEN", "t")
    vi.spyOn(console, "log").mockImplementation(() => {})
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify([{ result: 1 }, { result: 1 }, { result: 1 }])))
    vi.stubGlobal("fetch", fetchMock)

    await recordEvent("decision_ok", { mode: "compare" })

    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe("https://redis.test/pipeline")
    const cmds = JSON.parse(init.body) as string[][]
    const day = new Date().toISOString().slice(0, 10)
    expect(cmds).toEqual([
      ["HINCRBY", `travel:ev:${day}`, "decision_ok", "1"],
      ["HINCRBY", `travel:ev:${day}`, "decision_ok|mode=compare", "1"],
      ["EXPIRE", `travel:ev:${day}`, String(400 * 86400)],
    ])
  })

  it("never throws when Redis is down, and skips Redis when unconfigured", async () => {
    vi.spyOn(console, "log").mockImplementation(() => {})
    vi.spyOn(console, "error").mockImplementation(() => {})
    const fetchMock = vi.fn().mockRejectedValue(new Error("down"))
    vi.stubGlobal("fetch", fetchMock)
    await expect(recordEvent("plan_ok")).resolves.toBeUndefined()
    expect(fetchMock).not.toHaveBeenCalled()

    vi.stubEnv("KV_REST_API_URL", "https://redis.test")
    vi.stubEnv("KV_REST_API_TOKEN", "t")
    await expect(recordEvent("plan_ok")).resolves.toBeUndefined()
    expect(fetchMock).toHaveBeenCalledOnce()
  })
})
