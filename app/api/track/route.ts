import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { z } from "zod"

const schema = z.object({
  platform:    z.string().max(50),
  type:        z.enum(["flight", "hotel", "activity"]),
  destination: z.string().max(100),
})

export async function POST(request: NextRequest) {
  try {
    const body = schema.safeParse(await request.json())
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
