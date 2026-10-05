#!/usr/bin/env node
/**
 * Print the Travel funnel from Redis day hashes written by lib/metrics.ts.
 *
 *   npm run metrics            # last 7 days
 *   npm run metrics -- 30      # last 30 days
 *
 * Needs KV_REST_API_URL / KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_*), from the shell or .env.local
 * (`vercel env pull .env.local` fetches them). Use the read-only token if you have one.
 */
import { existsSync, readFileSync } from "node:fs"

if (existsSync(".env.local")) {
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2]
  }
}

const url = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL)?.trim().replace(/\/$/, "")
const token = (process.env.KV_REST_API_READ_ONLY_TOKEN || process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN)?.trim()
if (!url || !token) {
  console.error("Missing KV_REST_API_URL / KV_REST_API_TOKEN. Run `vercel env pull .env.local` first.")
  process.exit(1)
}

const days = Math.max(1, Number(process.argv[2]) || 7)
const keys = Array.from({ length: days }, (_, i) => {
  const d = new Date(Date.now() - i * 86_400_000)
  return `travel:ev:${d.toISOString().slice(0, 10)}`
})

const res = await fetch(`${url}/pipeline`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify(keys.map((k) => ["HGETALL", k])),
})
if (!res.ok) {
  console.error(`Redis ${res.status}`)
  process.exit(1)
}
const replies = await res.json()

const totals = new Map()
const perDay = []
keys.forEach((key, i) => {
  const flat = replies[i]?.result ?? []
  const day = {}
  for (let j = 0; j < flat.length; j += 2) {
    const n = Number(flat[j + 1])
    day[flat[j]] = n
    totals.set(flat[j], (totals.get(flat[j]) ?? 0) + n)
  }
  perDay.push([key.slice(-10), day])
})

const t = (f) => totals.get(f) ?? 0
const pct = (a, b) => (b ? `${((a / b) * 100).toFixed(1)}%` : "—")

console.log(`\nXingAI Travel funnel — last ${days} day(s)\n`)
console.log(`Decisions OK      ${t("decision_ok")}  (compare ${t("decision_ok|mode=compare")}, inspire ${t("decision_ok|mode=inspire")})`)
console.log(`Decisions failed  ${t("decision_fail")}   rate-limited ${t("decision_limited")}`)
console.log(`Plans OK / failed ${t("plan_ok")} / ${t("plan_fail")}`)
console.log(`Affiliate clicks  ${t("affiliate_click")}   per decision ${pct(t("affiliate_click"), t("decision_ok"))}`)
console.log(`Result → story    ${t("story_from_result")}   story → decide ${t("story_to_decide")}`)
console.log(`Result → city     ${t("city_from_result")}   route opens ${t("city_route_select")}`)

const breakdown = [...totals].filter(([f]) => f.includes("|")).sort((a, b) => b[1] - a[1])
if (breakdown.length) {
  console.log("\nBreakdowns")
  for (const [f, n] of breakdown) console.log(`  ${f.padEnd(44)} ${n}`)
}

console.log("\nBy day (decision_ok / affiliate_click)")
for (const [day, d] of perDay) console.log(`  ${day}  ${d.decision_ok ?? 0} / ${d.affiliate_click ?? 0}`)
