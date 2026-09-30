import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { z } from "zod"

const affiliateSchema = z.object({
  platform:    z.string().max(50),
  type:        z.enum(["flight", "hotel", "activity"]),
  destination: z.string().max(100),
})

// Story funnel: result → story, and story → /decide. See ADR 0006.
const storySchema = z.object({
  type:   z.enum(["story_from_result", "story_to_decide"]),
  season: z.string().max(60),
})

// City layer funnel: result → city page, and which reference route people open. See ADR 0008.
const citySchema = z.object({
  type:  z.enum(["city_from_result", "city_route_select"]),
  city:  z.string().max(60),
  route: z.string().max(60).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const json = await request.json()
    const story = storySchema.safeParse(json)
    if (story.success) {
      console.log("[story-click]", { ...story.data, timestamp: new Date().toISOString() })
      return NextResponse.json({ ok: true })
    }

    const city = citySchema.safeParse(json)
    if (city.success) {
      console.log("[city-click]", { ...city.data, timestamp: new Date().toISOString() })
      return NextResponse.json({ ok: true })
    }

    const body = affiliateSchema.safeParse(json)
    if (!body.success) return NextResponse.json({ ok: false }, { status: 400 })

    const { platform, type, destination } = body.data
    console.log("[affiliate-click]", {
      platform,
      type,
      destination,
      timestamp: new Date().toISOString(),
      ua: request.headers.get("user-agent")?.slice(0, 80),
    })
    // TODO: replace with Vercel KV / Supabase / Plausible when ready
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
