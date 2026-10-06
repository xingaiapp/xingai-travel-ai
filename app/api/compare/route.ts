import { after, NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import OpenAI from "openai"
import { z } from "zod"
import { normalizeCompareResult } from "@/lib/compare-normalize"
import { mockCompareResult } from "@/lib/mock-data"
import { logDecisionModelFailure } from "@/lib/openai-safe-log"
import { buildComparePrompt } from "@/lib/prompts"
import { recordEvent } from "@/lib/metrics"
import { checkDailyLimit, consumeDailyLimit, getClientIp } from "@/lib/rate-limit"
import type { CompareResult, TripContext } from "@/lib/types"

export const runtime = "nodejs"

const tripSchema = z.object({
  dates: z.object({ from: z.string(), to: z.string(), nights: z.number() }),
  origin: z.string().min(1).max(100),
  region: z.enum(["anywhere", "europe", "asia", "north_america", "latin_america", "middle_east", "africa", "oceania"]).default("anywhere"),
  placesInMind: z.string().max(240).optional(),
  budget: z.object({ amount: z.number().min(0).max(1_000_000), currency: z.string().max(10) }),
  travelers: z.object({ count: z.number().min(1).max(20), type: z.enum(["solo", "couple", "family", "group"]) }),
  notes: z.string().max(500).optional(),
  style: z.array(z.enum(["city", "beach", "nature", "culture"])).min(1),
  pace: z.enum(["relaxed", "balanced", "adventure"]),
  avoid: z.string().max(200).optional(),
  locale: z.enum(["en", "zh", "ko", "es"]).optional(),
})

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY?.trim()
  if (!apiKey) return NextResponse.json({ ...normalizeCompareResult(mockCompareResult), demo: true })

  const parsed = tripSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid trip context", code: "BAD_REQUEST" }, { status: 400 })
  }

  const trip = parsed.data as TripContext
  const ip = getClientIp(request)
  const limited = await checkDailyLimit(ip)
  if (limited) {
    after(() => recordEvent("decision_limited", { mode: "compare" }))
    return NextResponse.json(limited, { status: 429 })
  }

  const prompt = buildComparePrompt(trip)
  const model = process.env.OPENAI_TRAVEL_MODEL?.trim() || "gpt-4o-mini"
  const openai = new OpenAI({ apiKey })

  async function callOpenAI(attempt: number): Promise<CompareResult> {
    let completion
    try {
      completion = await openai.chat.completions.create({
        model,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: "You are a travel decision advisor. Return only valid JSON matching the requested structure. No markdown fences.",
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 1800,
        temperature: 0.3,
      })
    } catch (err) {
      logDecisionModelFailure("compare", err, { attempt })
      throw err
    }
    const choice = completion.choices[0]
    const raw = choice?.message?.content ?? ""
    try {
      return normalizeCompareResult(JSON.parse(raw) as CompareResult, trip)
    } catch (err) {
      logDecisionModelFailure("compare", err, {
        finish_reason: choice?.finish_reason,
        content_len: raw.length,
        attempt,
      })
      throw err
    }
  }

  const result = await callOpenAI(1)
    .catch(() => callOpenAI(2))
    .catch(() => null)
  if (!result) {
    after(() => recordEvent("decision_fail", { mode: "compare" }))
    return NextResponse.json({ error: "Decision unavailable", code: "OPENAI_ERROR" }, { status: 502 })
  }
  await consumeDailyLimit(ip)
  after(() => recordEvent("decision_ok", { mode: "compare", locale: parsed.data.locale }))
  return NextResponse.json(result)
}
