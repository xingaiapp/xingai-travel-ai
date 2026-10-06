"use client"

import { CheckCircle2, CircleHelp, ShieldCheck } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import type { BudgetEstimate } from "@/lib/budget"
import { localizeRating } from "@/lib/i18n"
import { computeMatchScore } from "@/lib/match-score"
import type { Destination } from "@/lib/types"

type EvidenceKind = "estimate" | "derived" | "plan"

interface EvidenceRow {
  id: string
  label: string
  claim: string
  kind: EvidenceKind
}

function formatMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `${currency} ${amount}`
  }
}

/**
 * Honest evidence for the winner — only fields we actually have.
 * No invented decimals, no fake source URLs.
 */
export function DecisionEvidence({
  winner,
  budgetEstimate,
}: Readonly<{
  winner: Destination
  budgetEstimate?: BudgetEstimate | null
}>) {
  const { messages } = useLocale()
  const r = messages.result
  const score = computeMatchScore(winner.scores.overall, winner.confidence, winner.scores.walkability)

  const rows: EvidenceRow[] = [
    {
      id: "weather",
      label: r.factorWeather,
      claim: winner.scores.weather,
      kind: "estimate",
    },
    {
      id: "flight",
      label: r.factorFlight,
      claim: winner.scores.flightTime,
      kind: "estimate",
    },
    {
      id: "walk",
      label: r.factorWalkability,
      claim: localizeRating(winner.scores.walkability, messages),
      kind: "estimate",
    },
  ]

  if (budgetEstimate) {
    const range = `${formatMoney(budgetEstimate.totalLow, budgetEstimate.currency)} – ${formatMoney(budgetEstimate.totalHigh, budgetEstimate.currency)}`
    const verdict =
      budgetEstimate.verdict === "within"
        ? r.verdictWithin
        : budgetEstimate.verdict === "tight"
          ? r.verdictTight
          : budgetEstimate.verdict === "over"
            ? r.verdictOver
            : null
    rows.push({
      id: "budget",
      label: r.budgetTitle,
      claim: verdict ? `${range} · ${verdict}` : range,
      kind: "plan",
    })
  }

  rows.push({
    id: "match",
    label: r.matchScore,
    claim: `${score}/100 · ${r.evidenceMatchNote}`,
    kind: "derived",
  })

  function kindLabel(kind: EvidenceKind) {
    if (kind === "plan") return r.evidenceKindPlan
    if (kind === "derived") return r.evidenceKindDerived
    return r.evidenceKindEstimate
  }

  return (
    <section
      className="rounded-md border border-border bg-card p-4 shadow-sm sm:p-5"
      aria-labelledby="decision-evidence-heading"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-primary" aria-hidden />
        <h2 id="decision-evidence-heading" className="text-base font-extrabold">
          {r.evidenceTitle}
        </h2>
        <span className="rounded-md bg-muted px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-muted-foreground">
          {r.evidenceBadge}
        </span>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">{r.evidenceLead}</p>

      <ul className="space-y-3">
        {rows.map((row) => (
          <li
            key={row.id}
            className="card-hover grid gap-1 rounded-md border border-border/80 bg-muted/20 px-3 py-2.5 sm:grid-cols-[7.5rem_1fr_auto] sm:items-start sm:gap-3"
          >
            <span className="text-xs font-extrabold uppercase tracking-wide text-foreground">{row.label}</span>
            <span className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
              <span>{row.claim}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[0.65rem] font-semibold text-muted-foreground">
              <CircleHelp className="h-3 w-3 shrink-0" aria-hidden />
              {kindLabel(row.kind)}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{r.evidenceFootnote}</p>
    </section>
  )
}
