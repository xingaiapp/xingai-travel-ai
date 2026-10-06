import { isPastDate } from "@/lib/mock-data"

/** Client Decide form checks shared with tests (not API validation). */
export type DecideFormIssue = "origin" | "dates_past" | "dates_order" | null

export function decideCompareFormIssue(input: {
  origin: string
  from: string
  to: string
}): DecideFormIssue {
  if (!input.origin.trim()) return "origin"
  if (!input.from || !input.to || isPastDate(input.from) || isPastDate(input.to)) return "dates_past"
  if (new Date(input.to).getTime() < new Date(input.from).getTime()) return "dates_order"
  return null
}
