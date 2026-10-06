import { after, NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { z } from "zod"
import { recordEvent } from "@/lib/metrics"

const affiliateSchema = z.object({
  platform:    z.string().max(50),
  type:        z.enum(["flight", "hotel", "activity"]),
  destination: z.string().max(100),
})

// Story funnel: result → story, story → /decide, interest in reader stories (mailto). See ADR 0006 / 0017.
const storySchema = z.object({
  type:   z.enum(["story_from_result", "story_to_decide", "story_submit_interest"]),
  season: z.string().max(60),
})

// City layer funnel: result → city, route open, city → /decide. See ADR 0008.
const citySchema = z.object({
  type:  z.enum(["city_from_result", "city_route_select", "city_to_decide"]),
  city:  z.string().max(60),
  route: z.string().max(60).optional(),
})

export async function POST(request: NextRequest) {
  const json = await request.json().catch(() => null)

  const story = storySchema.safeParse(json)
  if (story.success) {
    after(() => recordEvent(story.data.type, { season: story.data.season }))
    return NextResponse.json({ ok: true })
  }

  const city = citySchema.safeParse(json)
  if (city.success) {
    after(() => recordEvent(city.data.type, { city: city.data.city, route: city.data.route }))
    return NextResponse.json({ ok: true })
  }

  const body = affiliateSchema.safeParse(json)
  if (!body.success) return NextResponse.json({ ok: false }, { status: 400 })

  // Destination is free text from the model, so it stays out of the counters (log only).
  const { platform, type, destination } = body.data
  console.log("[affiliate-click]", { platform, type, destination })
  after(() => recordEvent("affiliate_click", { platform, type }))
  return NextResponse.json({ ok: true })
}
