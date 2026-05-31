import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import OpenAI from "openai"
import { z } from "zod"
import { mockCompareResult } from "@/lib/mock-data"
import { buildInspirePrompt } from "@/lib/prompts"
import { checkDailyLimit, getClientIp } from "@/lib/rate-limit"
import type { CompareResult, InspireContext } from "@/lib/types"

export const runtime = "nodejs"

const schema = z.object({
  vibe: z.enum(["recharge", "explore", "culture", "adventure"]),
  flightRange: z.enum(["short", "medium", "long"]),
  priority: z.enum(["food", "history", "nature", "nightlife", "family"]),
  budget: z.object({ amount: z.number().min(0).max(1_000_000), currency: z.string().max(10) }),
  travelers: z.object({ count: z.number().min(1).max(20), type: z.enum(["solo", "couple", "family", "group"]) }),
  dates: z.object({ from: z.string(), to: z.string(), nights: z.number() }).optional(),
  origin: z.string().max(100).optional(),
  locale: z.enum(["en", "zh", "ko", "es"]).optional(),
})

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY?.trim()
  if (!apiKey) return NextResponse.json({ ...mockCompareResult, inspireMode: true })

  const limited = checkDailyLimit(getClientIp(request))
  if (limited) return NextResponse.json(limited, { status: 429 })

  const parsed = schema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", code: "BAD_REQUEST" }, { status: 400 })
  }

  const prompt = buildInspirePrompt(parsed.data as InspireContext)
  const model = process.env.OPENAI_TRAVEL_MODEL?.trim() || "gpt-4o-mini"
  const openai = new OpenAI({ apiKey })

  async function callOpenAI(): Promise<CompareResult> {
    const completion = await openai.chat.completions.create({
      model,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "You are a travel inspiration advisor. Return only valid JSON matching the requested structure. No markdown fences.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 1800,
      temperature: 0.5,
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
