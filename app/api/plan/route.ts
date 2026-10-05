import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import OpenAI from "openai"
import { z } from "zod"
import { normalizeBudget } from "@/lib/budget"
import { mockPlanResult, mockRawBudget } from "@/lib/mock-data"
import { buildPlanPrompt } from "@/lib/prompts"
import { peekDailyLimit, getClientIp } from "@/lib/rate-limit"
import type { PlanResult, TripContext } from "@/lib/types"

export const runtime = "nodejs"

const tripSchema = z.object({
  dates: z.object({ from: z.string(), to: z.string(), nights: z.number() }),
  origin: z.string().min(1).max(100),
  region: z.enum(["anywhere", "europe", "asia", "north_america", "latin_america", "middle_east", "africa", "oceania"]).default("anywhere"),
  placesInMind: z.string().max(240).optional(),
  budget: z.object({ amount: z.number().min(0).max(1_000_000), currency: z.string().max(10) }),
  travelers: z.object({ count: z.number().min(1).max(20), type: z.enum(["solo", "couple", "family", "group"]) }),
  notes: z.string().max(500).optional(),
  style: z.array(z.enum(["city", "beach", "nature", "culture"])),
  pace: z.enum(["relaxed", "balanced", "adventure"]),
  avoid: z.string().max(200).optional(),
  locale: z.enum(["en", "zh", "ko", "es"]).optional(),
})

const bodySchema = z.object({
  destination: z.string().min(1).max(100),
  tripContext: tripSchema,
})

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY?.trim()
  if (!apiKey) {
    const preview = bodySchema.safeParse(await request.json().catch(() => null))
    const budgetEstimate = preview.success ? normalizeBudget(mockRawBudget(), preview.data.tripContext) : mockPlanResult.budgetEstimate
    return NextResponse.json({ ...mockPlanResult, budgetEstimate, demo: true })
  }

  // Plan does NOT increment the daily limit — it fires automatically after compare.
  // Use peek (read-only) to block extreme abuse without double-counting.
  const limited = peekDailyLimit(getClientIp(request))
  if (limited) return NextResponse.json(limited, { status: 429 })

  const parsed = bodySchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid plan request", code: "BAD_REQUEST" }, { status: 400 })
  }

  const { destination, tripContext } = parsed.data
  const prompt = buildPlanPrompt(destination, tripContext as TripContext)
  const model = process.env.OPENAI_TRAVEL_MODEL?.trim() || "gpt-4o-mini"
  const openai = new OpenAI({ apiKey })

  async function callOpenAI(): Promise<PlanResult> {
    const completion = await openai.chat.completions.create({
      model,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "You are a travel planning advisor. Return only valid JSON matching the requested structure. No markdown fences.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 2200,
      temperature: 0.35,
    })
    const raw = completion.choices[0]?.message?.content ?? ""
    const plan = JSON.parse(raw) as PlanResult & { budgetEstimate?: unknown }
    // Totals and the fits/over verdict are arithmetic on validated lines — never the model's own sums.
    return { ...plan, budgetEstimate: normalizeBudget(plan.budgetEstimate, tripContext) }
  }

  try {
    return NextResponse.json(await callOpenAI())
  } catch {
    try {
      return NextResponse.json(await callOpenAI())
    } catch {
      return NextResponse.json({ error: "Decision unavailable", code: "OPENAI_ERROR" }, { status: 502 })
    }
  }
}
