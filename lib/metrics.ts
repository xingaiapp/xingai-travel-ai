/**
 * Aggregate funnel counters in Redis: one hash per UTC day, `travel:ev:YYYY-MM-DD`.
 * Fields are `event` plus `event|dim=value` breakdowns. No IPs, user agents, or free-text trip input are stored.
 * Read them with `npm run metrics`. Without Redis (local dev) events only go to the server log.
 */

import { redisConfig, redisPipeline, type RedisCommand } from "@/lib/redis"

export type TravelEvent =
  | "decision_ok"
  | "decision_fail"
  | "decision_limited"
  | "plan_ok"
  | "plan_fail"
  | "affiliate_click"
  | "booking_cta_view"
  | "decide_start"
  | "recommendation_view"
  | "story_from_result"
  | "story_to_decide"
  | "story_submit_interest"
  | "city_from_result"
  | "city_route_select"
  | "city_to_decide"

type Dims = Record<string, string | undefined>

const RETENTION_SECONDS = 400 * 24 * 60 * 60

function cleanDim(v: string): string {
  return v.toLowerCase().replace(/[^a-z0-9_-]+/g, "-").slice(0, 40)
}

export function metricFields(event: TravelEvent, dims: Dims = {}): string[] {
  const fields: string[] = [event]
  for (const [k, v] of Object.entries(dims)) {
    if (v) fields.push(`${event}|${k}=${cleanDim(v)}`)
  }
  return fields
}

/** Never throws: metrics must not break the request they describe. */
export async function recordEvent(event: TravelEvent, dims: Dims = {}): Promise<void> {
  console.log(`[event] ${event}`, dims)
  if (!redisConfig()) return
  const key = `travel:ev:${new Date().toISOString().slice(0, 10)}`
  const commands: RedisCommand[] = metricFields(event, dims).map((f) => ["HINCRBY", key, f, 1])
  commands.push(["EXPIRE", key, RETENTION_SECONDS])
  try {
    await redisPipeline(commands)
  } catch (err) {
    console.error("[metrics] redis write failed", (err as Error).message)
  }
}
