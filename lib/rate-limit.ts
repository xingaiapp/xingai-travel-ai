/**
 * Daily rate limits for the OpenAI-backed routes.
 *
 * Counters live in a shared Redis (Upstash REST — the store Vercel KV / Marketplace provisions) so every
 * serverless instance sees the same count. Without Redis env vars (local dev) or if Redis is unreachable,
 * it falls back to a per-instance in-memory Map — better than nothing, but not a real cap.
 *
 * Buckets (all reset at UTC midnight):
 *   - compare/inspire: per IP, TRAVEL_DEMO_DAILY_LIMIT (default 3; 0 = unlimited for local dev)
 *   - plan:            per IP, 3 × the compare limit (auto-fires after compare, plus replan / city switch)
 *   - global:          all IPs, TRAVEL_GLOBAL_DAILY_LIMIT (default 300; 0 = off) — OpenAI spend backstop
 *
 * Callers must validate the request body first, so malformed requests never burn a user's quota.
 */

import { redisConfig, redisPipeline } from "@/lib/redis"

export type LimitBucket = "decision" | "plan"

type RateLimitError = { error: string; code: string; limit: number; resetAt: string }

function utcDayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10)
}

function parseLimit(raw: string | undefined, fallback: number): number {
  const v = raw?.trim()
  if (!v) return fallback
  const n = Number(v)
  if (!Number.isFinite(n)) return fallback
  return Math.max(0, Math.floor(n))
}

export function parseDailyLimit(): number {
  return parseLimit(process.env.TRAVEL_DEMO_DAILY_LIMIT, 3)
}

export function parseGlobalLimit(): number {
  return parseLimit(process.env.TRAVEL_GLOBAL_DAILY_LIMIT, 300)
}

export function bucketLimit(bucket: LimitBucket): number {
  const perIp = parseDailyLimit()
  return bucket === "plan" ? perIp * 3 : perIp
}

// ── Stores ────────────────────────────────────────────────────────────

type Store = { incr(key: string): Promise<number> }

const memory = new Map<string, number>()

export const memoryStore: Store = {
  async incr(key) {
    const today = utcDayKey()
    // Drop yesterday's keys so the Map does not grow forever on a warm instance.
    for (const k of memory.keys()) if (!k.includes(today)) memory.delete(k)
    const next = (memory.get(key) ?? 0) + 1
    memory.set(key, next)
    return next
  },
}

const redisStore: Store = {
  async incr(key) {
    // EXPIRE 25h: outlives the UTC day the key is named after.
    const [count] = await redisPipeline([["INCR", key], ["EXPIRE", key, 90000]])
    if (typeof count !== "number") throw new Error("redis bad reply")
    return count
  },
}

let storeOverride: Store | null = null

/** Test hook: force a store (pass null to restore env-based selection). */
export function setRateLimitStore(store: Store | null) {
  storeOverride = store
}

async function incr(key: string): Promise<number> {
  if (storeOverride) return storeOverride.incr(key)
  if (redisConfig()) {
    try {
      return await redisStore.incr(key)
    } catch (err) {
      console.error("[rate-limit] redis unavailable, using in-memory fallback", (err as Error).message)
    }
  }
  return memoryStore.incr(key)
}

// ── Public API ────────────────────────────────────────────────────────

function limitError(limit: number, today: string, code = "RATE_LIMIT"): RateLimitError {
  return {
    error: `Rate limit: ${limit} requests per day (demo).`,
    code,
    limit,
    resetAt: `${today}T24:00:00Z`,
  }
}

/**
 * Counts one request against `bucket` for this IP and against the global cap.
 * Returns null if allowed, or an error body for a 429.
 */
export async function checkDailyLimit(ip: string, bucket: LimitBucket = "decision"): Promise<RateLimitError | null> {
  const perIp = bucketLimit(bucket)
  if (perIp === 0) return null // unlimited (local dev)

  const today = utcDayKey()
  const count = await incr(`travel:rl:${bucket}:${today}:${ip}`)
  if (count > perIp) return limitError(perIp, today)

  const globalLimit = parseGlobalLimit()
  if (globalLimit > 0) {
    const total = await incr(`travel:rl:global:${today}`)
    if (total > globalLimit) return limitError(globalLimit, today, "RATE_LIMIT")
  }
  return null
}

export function getClientIp(req: Request): string {
  const headers = req.headers as Headers
  const xff = headers.get("x-forwarded-for")
  if (xff) return xff.split(",")[0]?.trim() || "unknown"
  return headers.get("x-real-ip")?.trim() || "unknown"
}
