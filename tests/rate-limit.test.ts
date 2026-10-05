import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import {
  bucketLimit,
  checkDailyLimit,
  consumeDailyLimit,
  getClientIp,
  memoryStore,
  setRateLimitStore,
} from "@/lib/rate-limit"

function freshStore() {
  const counts = new Map<string, number>()
  return {
    counts,
    async incr(key: string) {
      counts.set(key, (counts.get(key) ?? 0) + 1)
      return counts.get(key)!
    },
    async get(key: string) {
      return counts.get(key) ?? 0
    },
  }
}

describe("checkDailyLimit + consumeDailyLimit", () => {
  let store: ReturnType<typeof freshStore>
  beforeEach(() => {
    store = freshStore()
    setRateLimitStore(store)
    vi.stubEnv("TRAVEL_DEMO_DAILY_LIMIT", "2")
    vi.stubEnv("TRAVEL_GLOBAL_DAILY_LIMIT", "0")
  })
  afterEach(() => {
    setRateLimitStore(null)
    vi.unstubAllEnvs()
  })

  it("peeks without counting; consume then blocks at the per-IP limit", async () => {
    expect(await checkDailyLimit("1.1.1.1")).toBeNull()
    expect(store.counts.size).toBe(0)
    await consumeDailyLimit("1.1.1.1")
    expect(await checkDailyLimit("1.1.1.1")).toBeNull()
    await consumeDailyLimit("1.1.1.1")
    expect(await checkDailyLimit("1.1.1.1")).toMatchObject({ code: "RATE_LIMIT", limit: 2 })
    expect(await checkDailyLimit("2.2.2.2")).toBeNull()
  })

  it("gives plan its own 3x bucket", async () => {
    expect(bucketLimit("plan")).toBe(6)
    await consumeDailyLimit("1.1.1.1")
    await consumeDailyLimit("1.1.1.1")
    expect(await checkDailyLimit("1.1.1.1")).not.toBeNull()
    for (let i = 0; i < 6; i++) {
      expect(await checkDailyLimit("1.1.1.1", "plan")).toBeNull()
      await consumeDailyLimit("1.1.1.1", "plan")
    }
    expect(await checkDailyLimit("1.1.1.1", "plan")).not.toBeNull()
  })

  it("enforces the global cap across IPs after consume", async () => {
    vi.stubEnv("TRAVEL_GLOBAL_DAILY_LIMIT", "3")
    for (const ip of ["a", "b", "c"]) {
      expect(await checkDailyLimit(ip)).toBeNull()
      await consumeDailyLimit(ip)
    }
    expect(await checkDailyLimit("d")).toMatchObject({ limit: 3 })
  })

  it("is unlimited when the per-IP limit is 0", async () => {
    vi.stubEnv("TRAVEL_DEMO_DAILY_LIMIT", "0")
    for (let i = 0; i < 10; i++) {
      expect(await checkDailyLimit("1.1.1.1")).toBeNull()
      await consumeDailyLimit("1.1.1.1")
    }
    expect(store.counts.size).toBe(0)
  })

  it("falls back to memory when Redis fails", async () => {
    setRateLimitStore(null)
    vi.stubEnv("KV_REST_API_URL", "http://127.0.0.1:9")
    vi.stubEnv("KV_REST_API_TOKEN", "t")
    vi.stubEnv("TRAVEL_DEMO_DAILY_LIMIT", "2")
    vi.stubEnv("TRAVEL_GLOBAL_DAILY_LIMIT", "0")
    vi.spyOn(console, "error").mockImplementation(() => {})
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("down")))
    const ip = `fallback-${Math.random()}`
    expect(await checkDailyLimit(ip)).toBeNull()
    await consumeDailyLimit(ip)
    expect(await checkDailyLimit(ip)).toBeNull()
    await consumeDailyLimit(ip)
    expect(await checkDailyLimit(ip)).not.toBeNull()
    vi.unstubAllGlobals()
  })
})

describe("memoryStore", () => {
  it("counts per key", async () => {
    const key = `k-${new Date().toISOString().slice(0, 10)}-${Math.random()}`
    expect(await memoryStore.incr(key)).toBe(1)
    expect(await memoryStore.incr(key)).toBe(2)
    expect(await memoryStore.get(key)).toBe(2)
  })
})

describe("getClientIp", () => {
  it("prefers the first x-forwarded-for hop, then x-real-ip", () => {
    expect(getClientIp(new Request("http://x", { headers: { "x-forwarded-for": "9.9.9.9, 10.0.0.1" } }))).toBe("9.9.9.9")
    expect(getClientIp(new Request("http://x", { headers: { "x-real-ip": "8.8.8.8" } }))).toBe("8.8.8.8")
    expect(getClientIp(new Request("http://x"))).toBe("unknown")
  })
})
