/**
 * Shareable trip links: /s?d=<payload>.
 *
 * The comparison and plan travel inside the URL (deflate-raw + base64url), so
 * sharing needs no database and stores nothing about the user. TripContext is
 * never encoded: origin, dates, budget, party size and notes stay on the
 * sharer's device. Booking links on the shared page are built without them.
 */
import { z } from "zod"
import type { CompareResult, PlanResult } from "@/lib/types"

const text = (max: number) => z.string().max(max)
const list = (item: number, count: number) => z.array(text(item)).max(count)

const DestinationSchema = z.object({
  name: text(80),
  country: text(80),
  isWinner: z.boolean(),
  confidence: z.enum(["high", "medium", "low"]),
  whyWins: list(300, 8),
  tradeoffs: list(300, 8),
  scores: z.object({
    overall: z.number().int().min(0).max(5), // stars; the table renders "☆".repeat(5 - overall)
    budget: text(40).optional(), // legacy links only; no longer encoded
    weather: text(80),
    flightTime: text(60),
    walkability: text(60),
  }),
})

const CompareSchema = z.object({
  winner: text(80),
  confidence: z.enum(["high", "medium", "low"]),
  destinations: z.array(DestinationSchema).min(1).max(5),
  whyNotOthers: text(1200),
})

const PlanSchema = z.object({
  destination: text(120),
  itinerary: z
    .array(z.object({ day: z.number().int().min(1).max(60), title: text(160), simple: text(600), detailed: list(400, 12) }))
    .max(21),
  bookFirst: z.array(z.object({ type: z.enum(["flight", "hotel", "activity"]), label: text(160), note: text(300).optional() })).max(12),
  tradeoffNote: text(1200),
  warnings: z
    .array(
      z.object({
        type: z.enum(["weather", "security", "visa", "crowds", "health"]),
        severity: z.enum(["info", "caution", "warning"]),
        title: text(160),
        body: text(600),
      })
    )
    .max(8)
    .optional(),
})

export const SharedTripSchema = z.object({
  v: z.literal(1),
  c: CompareSchema,
  p: PlanSchema.nullable(),
})

export type SharedTrip = { v: 1; c: CompareResult; p: PlanResult | null }

export const MAX_ENCODED_LENGTH = 12_000

function toBase64Url(bytes: Uint8Array): string {
  let binary = ""
  for (const b of bytes) binary += String.fromCharCode(b)
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function fromBase64Url(value: string): Uint8Array {
  const b64 = value.replace(/-/g, "+").replace(/_/g, "/")
  const binary = atob(b64 + "===".slice((b64.length + 3) % 4))
  return Uint8Array.from(binary, (c) => c.charCodeAt(0))
}

async function pipe(bytes: Uint8Array, stream: CompressionStream | DecompressionStream): Promise<Uint8Array> {
  const out = new Blob([bytes as BlobPart]).stream().pipeThrough(stream)
  return new Uint8Array(await new Response(out).arrayBuffer())
}

const clip = (s: string, max: number) => (s.length > max ? `${s.slice(0, max - 1)}…` : s)
const clipList = (items: string[], item: number, count: number) => items.slice(0, count).map((x) => clip(x, item))

/** Fit model output to the schema caps so a long answer shortens instead of failing to share. */
function fitTrip(compare: CompareResult, plan: PlanResult | null) {
  return {
    v: 1 as const,
    c: {
      winner: clip(compare.winner, 80),
      confidence: compare.confidence,
      whyNotOthers: clip(compare.whyNotOthers, 1200),
      destinations: compare.destinations.slice(0, 5).map((d) => ({
        name: clip(d.name, 80),
        country: clip(d.country, 80),
        isWinner: d.isWinner,
        confidence: d.confidence,
        whyWins: clipList(d.whyWins, 300, 8),
        tradeoffs: clipList(d.tradeoffs, 300, 8),
        scores: {
          overall: Math.max(0, Math.min(5, Math.round(d.scores.overall))),
          weather: clip(d.scores.weather, 80),
          flightTime: clip(d.scores.flightTime, 60),
          walkability: clip(d.scores.walkability, 60),
        },
      })),
    },
    p: plan
      ? {
          destination: clip(plan.destination, 120),
          itinerary: plan.itinerary.slice(0, 21).map((d) => ({
            day: d.day,
            title: clip(d.title, 160),
            simple: clip(d.simple, 600),
            detailed: clipList(d.detailed, 400, 12),
          })),
          // Flight items name the sharer's origin ("SFO → LIS"); the shared page has no flights anyway.
          bookFirst: plan.bookFirst.filter((b) => b.type !== "flight").slice(0, 12).map((b) => ({
            type: b.type,
            label: clip(b.label, 160),
            ...(b.note ? { note: clip(b.note, 300) } : {}),
          })),
          tradeoffNote: clip(plan.tradeoffNote, 1200),
          ...(plan.warnings
            ? {
                warnings: plan.warnings.slice(0, 8).map((w) => ({
                  type: w.type,
                  severity: w.severity,
                  title: clip(w.title, 160),
                  body: clip(w.body, 600),
                })),
              }
            : {}),
        }
      : null,
  }
}

/** Browser and Node 18+ (both ship CompressionStream). */
export async function encodeSharedTrip(compare: CompareResult, plan: PlanResult | null): Promise<string> {
  const payload = SharedTripSchema.parse(fitTrip(compare, plan))
  const json = new TextEncoder().encode(JSON.stringify(payload))
  return toBase64Url(await pipe(json, new CompressionStream("deflate-raw")))
}

export async function decodeSharedTrip(value: string | undefined | null): Promise<SharedTrip | null> {
  if (!value || value.length > MAX_ENCODED_LENGTH || !/^[A-Za-z0-9_-]+$/.test(value)) return null
  try {
    const bytes = await pipe(fromBase64Url(value), new DecompressionStream("deflate-raw"))
    if (bytes.length > 64_000) return null
    const parsed = SharedTripSchema.safeParse(JSON.parse(new TextDecoder().decode(bytes)))
    return parsed.success ? (parsed.data as SharedTrip) : null
  } catch {
    return null
  }
}
