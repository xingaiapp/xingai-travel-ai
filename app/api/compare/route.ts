import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import OpenAI from "openai"
import { z } from "zod"
import { mockCompareResult } from "@/lib/mock-data"
import { buildComparePrompt } from "@/lib/prompts"
import { checkDailyLimit, getClientIp } from "@/lib/rate-limit"
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
  if (!apiKey) return NextResponse.json(mockCompareResult)

  const limited = checkDailyLimit(getClientIp(request))
  if (limited) return NextResponse.json(limited, { status: 429 })

  const parsed = tripSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid trip context", code: "BAD_REQUEST" }, { status: 400 })
  }

  const prompt = buildComparePrompt(parsed.data as TripContext)
  const model = process.env.OPENAI_TRAVEL_MODEL?.trim() || "gpt-4o-mini"
  const openai = new OpenAI({ apiKey })

  async function callOpenAI(): Promise<CompareResult> {
    const completion = await openai.chat.completions.create({
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
    const raw = completion.choices[0]?.message?.content ?? ""
    return JSON.parse(raw) as CompareResult
  }

  try {
    return NextResponse.json(await callOpenAI())
  } catch {
    try {
      return NextResponse.json(await callOpenAI())
    } catch (e) {
      const msg = e instanceof Error ? e.message : "OpenAI request failed"
      return NextResponse.json({ error: msg, code: "OPENAI_ERROR" }, { status: 502 })
    }
  }
}
