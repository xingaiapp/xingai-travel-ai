"use client"

import Image from "next/image"
import { CheckCircle2, Star } from "lucide-react"
import { ConfidencePill } from "@/components/confidence-pill"
import { useLocale } from "@/components/locale-provider"
import type { CompareResult } from "@/lib/types"
import { cn } from "@/lib/utils"

export function DestinationCompare({ result, compact = false }: Readonly<{ result: CompareResult; compact?: boolean }>) {
  const { messages } = useLocale()
  const winner = result.destinations.find((item) => item.isWinner) ?? result.destinations[0]

  return (
    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <Star className="h-5 w-5 text-primary" aria-hidden />
        <h2 className="text-base font-extrabold">{messages.result.preview}</h2>
      </div>

      <div className={cn("grid gap-5", compact ? "md:grid-cols-[12rem_1fr]" : "lg:grid-cols-[18rem_1fr]")}>
        <div className="relative min-h-40 overflow-hidden rounded-xl bg-muted">
          <Image src="/assets/context-mock.jpg" alt="Lisbon travel preview" fill className="object-cover" sizes="(max-width: 768px) 100vw, 18rem" />
          <span className="absolute right-3 top-3 rounded-lg bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">Top pick</span>
        </div>

        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-extrabold tracking-tight">
              {messages.result.bestFit}: <span className="text-primary">{winner.name}, {winner.country}</span>
            </h3>
            <ConfidencePill value={winner.confidence} />
          </div>

          <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
            {winner.whyWins.map((reason) => (
              <li key={reason} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                <span>{reason}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 grid gap-4 border-t border-border pt-4 lg:grid-cols-[1fr_auto]">
            <div>
              <h4 className="text-sm font-extrabold">{messages.result.whyNot}</h4>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {result.destinations.filter((item) => !item.isWinner).map((item) => (
                  <li key={item.name}>• {item.name}: {item.tradeoffs[0]}</li>
                ))}
              </ul>
            </div>
            <a href="#full-plan" className="inline-flex h-10 items-center justify-center rounded-xl border border-border px-4 text-sm font-bold text-primary hover:bg-primary/10">
              {messages.result.seePlan}
            </a>
          </div>
        </div>
      </div>

      {!compact ? (
        <div className="mt-5 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[44rem] border-collapse text-sm">
            <thead className="bg-muted/70 text-xs text-muted-foreground">
              <tr>
                <th className="p-3 text-left">Destination</th>
                {result.destinations.map((item) => (
                  <th key={item.name} className={cn("p-3 text-center", item.isWinner && "bg-primary/10 text-primary")}>
                    {item.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Overall fit", (item: typeof winner) => "★".repeat(item.scores.overall) + "☆".repeat(5 - item.scores.overall)],
                ["Budget fit", (item: typeof winner) => item.scores.budget],
                ["Weather", (item: typeof winner) => item.scores.weather],
                ["Flight time", (item: typeof winner) => item.scores.flightTime],
                ["Walkability", (item: typeof winner) => item.scores.walkability],
              ].map(([label, getValue]) => (
                <tr key={String(label)} className="border-t border-border">
                  <td className="p-3 font-semibold text-muted-foreground">{String(label)}</td>
                  {result.destinations.map((item) => (
                    <td key={item.name} className={cn("p-3 text-center font-medium", item.isWinner && "bg-primary/5 text-primary")}>
                      {(getValue as (item: typeof winner) => string)(item)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  )
}
