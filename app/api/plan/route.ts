import { NextResponse } from "next/server"
import { z } from "zod"
import { mockPlanResult } from "@/lib/mock-data"
import { buildPlanPrompt } from "@/lib/prompts"
import type { PlanResult, TripContext } from "@/lib/types"

const tripSchema = z.object({
  dates: z.object({ from: z.string(), to: z.string(), nights: z.number() }),
  origin: z.string(),
  budget: z.object({ amount: z.number(), currency: z.string() }),
  travelers: z.object({ count: z.number(), type: z.enum(["solo", "couple", "family", "group"]) }),
  notes: z.string().optional(),
  style: z.array(z.enum(["city", "beach", "nature", "culture"])),
  pace: z.enum(["relaxed", "balanced", "adventure"]),
  avoid: z.string().optional(),
  locale: z.enum(["en", "zh", "ko", "es"]).optional(),
})

const bodySchema = z.object({
  destination: z.string(),
  tripContext: tripSchema,
})

async function callClaude(prompt: string): Promise<PlanResult> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-5",
      max_tokens: 2200,
      temperature: 0.35,
      messages: [{ role: "user", content: prompt }],
    }),
  })
  if (!response.ok) throw new Error("Claude request failed")
  const data = await response.json()
  const text = data?.content?.find?.((item: { type: string }) => item.type === "text")?.text
  if (!text) throw new Error("Claude returned no text")
  return JSON.parse(text) as PlanResult
}

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid plan request", issues: parsed.error.flatten() }, { status: 400 })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(mockPlanResult)
  }

  const prompt = buildPlanPrompt(parsed.data.destination, parsed.data.tripContext as TripContext)
  try {
    const result = await callClaude(prompt)
    return NextResponse.json(result)
  } catch {
    try {
      const retry = await callClaude(`${prompt}\n\nYour previous response was invalid. Return valid JSON only.`)
      return NextResponse.json(retry)
    } catch {
      return NextResponse.json({ message: "Could not build the itinerary right now." }, { status: 500 })
    }
  }
}
