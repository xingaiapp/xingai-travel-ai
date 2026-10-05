import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import OpenAI from "openai"
import { z } from "zod"
import { normalizeCompareResult } from "@/lib/compare-normalize"
import { mockCompareResult } from "@/lib/mock-data"
import { inspireViolations } from "@/lib/inspire-validate"
import { buildInspirePrompt } from "@/lib/prompts"
import { checkDailyLimit, getClientIp } from "@/lib/rate-limit"
import type { CompareResult, InspireContext } from "@/lib/types"

export const runtime = "nodejs"

const schema = z.object({
  vibe: z.enum(["recharge", "explore", "culture", "adventure"]),
  flightRange: z.enum(["short", "medium", "long"]),
  priority: z.enum(["food", "history", "nature", "nightlife", "family", "kids_friendly"]),
  budget: z.object({ amount: z.number().min(0).max(1_000_000), currency: z.string().max(10) }),
  travelers: z.object({ count: z.number().min(1).max(20), type: z.enum(["solo", "couple", "family", "group"]) }),
  dates: z.object({ from: z.string(), to: z.string(), nights: z.number() }).optional(),
  origin: z.string().max(100).optional(),
  locale: z.enum(["en", "zh", "ko", "es"]).optional(),
})

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY?.trim()
  if (!apiKey) return NextResponse.json({ ...normalizeCompareResult(mockCompareResult), inspireMode: true, demo: true })

  const parsed = schema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", code: "BAD_REQUEST" }, { status: 400 })
  }

  const limited = await checkDailyLimit(getClientIp(request))
  if (limited) return NextResponse.json(limited, { status: 429 })

  const prompt = buildInspirePrompt(parsed.data as InspireContext)
  const model = process.env.OPENAI_TRAVEL_MODEL?.trim() || "gpt-4o-mini"
  const openai = new OpenAI({ apiKey })

  async function callOpenAI(feedback: string[]): Promise<CompareResult> {
    const retryNote = feedback.length
      ? `\n\nYour previous answer broke these hard constraints — fix all of them:\n- ${feedback.join("\n- ")}`
      : ""
    const completion = await openai.chat.completions.create({
      model,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "You are a travel inspiration advisor. Return only valid JSON matching the requested structure. No markdown fences.",
        },
        { role: "user", content: prompt + retryNote },
      ],
      max_tokens: 1800,
      temperature: 0.5,
    })
    const raw = completion.choices[0]?.message?.content ?? ""
    return JSON.parse(raw) as CompareResult
  }

  // A suggestion that breaks the user's hard limits is worse than none: validate, retry with feedback, else fail.
  const MAX_ATTEMPTS = 3
  let feedback: string[] = []
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      const result = normalizeCompareResult(await callOpenAI(feedback))
      const problems = inspireViolations(result, parsed.data.flightRange)
      if (problems.length === 0) return NextResponse.json(result)
      feedback = problems
    } catch {
      feedback = feedback.length ? feedback : ["Return a result that satisfies every hard constraint."]
    }
  }
  return NextResponse.json({ error: "Decision unavailable", code: "INSPIRE_CONSTRAINTS" }, { status: 502 })
}
