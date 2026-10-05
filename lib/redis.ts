/**
 * Minimal Upstash Redis REST client (the store Vercel KV / Marketplace provisions).
 * Reads KV_REST_API_* first, then UPSTASH_REDIS_REST_*. Returns null config when unset (local dev).
 */

export type RedisCommand = Array<string | number>

export function redisConfig(): { url: string; token: string } | null {
  const url = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL)?.trim()
  const token = (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN)?.trim()
  return url && token ? { url: url.replace(/\/$/, ""), token } : null
}

/** Runs commands in one round trip. Throws on transport errors or any command error. */
export async function redisPipeline(commands: RedisCommand[], timeoutMs = 1500): Promise<unknown[]> {
  const cfg = redisConfig()
  if (!cfg) throw new Error("redis not configured")
  const res = await fetch(`${cfg.url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands.map((c) => c.map(String))),
    cache: "no-store",
    signal: AbortSignal.timeout(timeoutMs),
  })
  if (!res.ok) throw new Error(`redis ${res.status}`)
  const replies = (await res.json()) as Array<{ result?: unknown; error?: string }>
  return replies.map((r) => {
    if (r?.error) throw new Error(r.error)
    return r?.result
  })
}
