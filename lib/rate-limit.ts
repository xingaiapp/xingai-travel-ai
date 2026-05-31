/**
 * Per-IP daily rate limiter — matches xingai-meal-coach-ai pattern.
 * Local dev: set TRAVEL_DEMO_DAILY_LIMIT=0 to disable (unlimited).
 * Production: defaults to 3 requests per IP per day.
 */

type RateState = { dayKey: string; count: number }
const rateByIp = new Map<string, RateState>()

function utcDayKey(d = new Date()): string {
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, "0")
  const day = String(d.getUTCDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

export function parseDailyLimit(): number {
  const raw = process.env.TRAVEL_DEMO_DAILY_LIMIT?.trim()
  if (!raw) return 3
  const n = Number(raw)
  if (!Number.isFinite(n)) return 3
  return Math.max(0, Math.floor(n))
}

type RateLimitError = { error: string; code: string; limit: number; resetAt: string }

/**
 * Increments the counter and returns null if allowed, or an error object if limited.
 * Use for /api/compare and /api/inspire (user-initiated requests).
 */
export function checkDailyLimit(ip: string): RateLimitError | null {
  const dailyLimit = parseDailyLimit()
  if (dailyLimit === 0) return null   // unlimited (local dev)

  const today = utcDayKey()
  const cur = rateByIp.get(ip)

  if (!cur || cur.dayKey !== today) {
    rateByIp.set(ip, { dayKey: today, count: 1 })
    return null
  }

  if (cur.count >= dailyLimit) {
    return {
      error: `Rate limit: ${dailyLimit} requests per day (demo).`,
      code: "RATE_LIMIT",
      limit: dailyLimit,
      resetAt: `${today}T24:00:00Z`,
    }
  }

  cur.count += 1
  rateByIp.set(ip, cur)
  return null
}

/**
 * Checks without incrementing — use for /api/plan which fires automatically
 * after compare succeeds. We don't want to double-count the user's daily limit.
 */
export function peekDailyLimit(ip: string): RateLimitError | null {
  const dailyLimit = parseDailyLimit()
  if (dailyLimit === 0) return null

  const today = utcDayKey()
  const cur = rateByIp.get(ip)
  if (!cur || cur.dayKey !== today) return null  // no prior usage → allowed

  if (cur.count > dailyLimit) {
    return {
      error: `Rate limit: ${dailyLimit} requests per day (demo).`,
      code: "RATE_LIMIT",
      limit: dailyLimit,
      resetAt: `${today}T24:00:00Z`,
    }
  }
  return null
}

export function getClientIp(req: Request): string {
  const xff = (req.headers as Headers).get("x-forwarded-for")
  if (xff) return xff.split(",")[0]?.trim() || "unknown"
  return "unknown"
}
