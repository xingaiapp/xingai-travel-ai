import type { TripContext } from "@/lib/types"

export const BUDGET_CATEGORIES = ["flights", "lodging", "food", "activities", "local_transport"] as const
export type BudgetCategory = (typeof BUDGET_CATEGORIES)[number]

export interface BudgetLine {
  category: BudgetCategory
  low: number
  high: number
  /** The model's stated assumption, e.g. "2 round-trip economy tickets". */
  note?: string
}

export type BudgetVerdict = "within" | "tight" | "over"

/** Server-normalized estimate: totals and verdict are computed here, never taken from the model. */
export interface BudgetEstimate {
  currency: string
  lines: BudgetLine[]
  totalLow: number
  totalHigh: number
  budget: number
  /** Absent when the model answered in another currency or no budget was given. */
  verdict?: BudgetVerdict
  estimatedAt: string
}

function amount(value: unknown): number | null {
  const n = typeof value === "string" ? Number(value.replace(/[^0-9.]/g, "")) : value
  return typeof n === "number" && Number.isFinite(n) && n >= 0 ? Math.round(n) : null
}

/**
 * Validate the model's raw `budgetEstimate` and derive totals + verdict.
 * Returns undefined when it is unusable, so the UI simply hides the section.
 */
export function normalizeBudget(
  raw: unknown,
  ctx: Pick<TripContext, "budget">,
  now: Date = new Date()
): BudgetEstimate | undefined {
  if (!raw || typeof raw !== "object") return undefined
  const { currency, lines } = raw as { currency?: unknown; lines?: unknown }
  if (!Array.isArray(lines)) return undefined

  const seen = new Set<BudgetCategory>()
  const clean: BudgetLine[] = []
  for (const item of lines) {
    if (!item || typeof item !== "object") continue
    const { category, low, high, note } = item as Record<string, unknown>
    if (!BUDGET_CATEGORIES.includes(category as BudgetCategory) || seen.has(category as BudgetCategory)) continue
    let lo = amount(low)
    let hi = amount(high)
    if (lo === null && hi === null) continue
    lo ??= hi!
    hi ??= lo
    if (lo > hi) [lo, hi] = [hi, lo]
    seen.add(category as BudgetCategory)
    clean.push({
      category: category as BudgetCategory,
      low: lo,
      high: hi,
      ...(typeof note === "string" && note.trim() ? { note: note.trim().slice(0, 160) } : {}),
    })
  }
  // Without flights and lodging the total would look misleadingly cheap.
  if (!seen.has("flights") || !seen.has("lodging")) return undefined
  clean.sort((a, b) => BUDGET_CATEGORIES.indexOf(a.category) - BUDGET_CATEGORIES.indexOf(b.category))

  const totalLow = clean.reduce((sum, l) => sum + l.low, 0)
  const totalHigh = clean.reduce((sum, l) => sum + l.high, 0)
  const tripCurrency = ctx.budget.currency.trim().toUpperCase()
  const modelCurrency = typeof currency === "string" ? currency.trim().toUpperCase() : tripCurrency
  const budget = ctx.budget.amount

  let verdict: BudgetVerdict | undefined
  if (budget > 0 && modelCurrency === tripCurrency) {
    verdict = totalHigh <= budget ? "within" : totalLow <= budget ? "tight" : "over"
  }

  return { currency: modelCurrency, lines: clean, totalLow, totalHigh, budget, verdict, estimatedAt: now.toISOString() }
}
