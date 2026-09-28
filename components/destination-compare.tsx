"use client"

import Image from "next/image"
import { CheckCircle2, Star } from "lucide-react"
import { useState } from "react"
import { ConfidencePill } from "@/components/confidence-pill"
import { useLocale } from "@/components/locale-provider"
import { localizeRating } from "@/lib/i18n"
import type { CompareResult, Destination } from "@/lib/types"
import { cn, getCityImage } from "@/lib/utils"

function destinationKey(item: Destination) {
  return `${item.name}-${item.country}`
}

// Inner component keyed by result so focused resets when result changes
function DestinationCompareInner({
  result,
  compact,
  showPlanLink,
}: { result: CompareResult; compact: boolean; showPlanLink: boolean }) {
  const { messages } = useLocale()
  const winner = result.destinations.find((item) => item.isWinner) ?? result.destinations[0]
  const [focused, setFocused] = useState(winner)

  const focusedImage = getCityImage(focused.name)
  const isWinnerFocused = focused.isWinner

  const tableRows: [string, (item: Destination) => string][] = [
    [messages.result.tableOverall, (item) => "★".repeat(item.scores.overall) + "☆".repeat(5 - item.scores.overall)],
    [messages.result.tableWeather, (item) => item.scores.weather],
    [messages.result.tableFlight, (item) => item.scores.flightTime],
    [messages.result.tableWalkability, (item) => localizeRating(item.scores.walkability, messages)],
  ]

  function columnClass(item: Destination) {
    const selected = destinationKey(focused) === destinationKey(item)
    return cn(
      selected && "bg-primary/10 text-primary",
      !selected && item.isWinner && "text-primary/70"
    )
  }

  return (
    <section className="rounded-md border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <Star className="h-5 w-5 text-primary" aria-hidden />
        <h2 className="text-base font-extrabold">{messages.result.preview}</h2>
      </div>

      <div className={cn("grid gap-5", compact ? "md:grid-cols-[12rem_1fr]" : "lg:grid-cols-[18rem_1fr]")}>
        <div className="relative min-h-44 overflow-hidden rounded-md bg-muted shadow-inner lg:min-h-52">
          <Image
            key={focused.name}
            src={focusedImage}
            alt={`${focused.name} travel photo`}
            fill
            className="object-cover object-center transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, 18rem"
            unoptimized={focusedImage.startsWith("https://images.unsplash.com")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
          <span
            className={cn(
              "absolute right-3 top-3 rounded-md px-2.5 py-1 text-xs font-bold",
              isWinnerFocused
                ? "bg-primary text-primary-foreground"
                : "border border-white/30 bg-slate-950/55 text-white backdrop-blur-sm"
            )}
          >
            {isWinnerFocused ? messages.result.topPick : messages.result.previewBadge}
          </span>
          {!isWinnerFocused ? (
            <span className="absolute bottom-3 left-3 rounded-md bg-slate-950/55 px-2 py-1 text-xs font-bold text-white backdrop-blur-sm">
              {focused.name}, {focused.country}
            </span>
          ) : null}
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
            {showPlanLink ? (
              <a href="#full-plan" className="inline-flex h-10 items-center justify-center rounded-md border border-border px-4 text-sm font-bold text-primary hover:bg-primary/10">
                {messages.result.seePlan}
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {!compact ? (
        <div className="mt-5 overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[44rem] border-collapse text-sm">
            <caption className="sr-only">{messages.result.comparison}</caption>
            <thead className="bg-muted/70 text-xs text-muted-foreground">
              <tr>
                <th className="p-3 text-left">{messages.result.tableDestination}</th>
                {result.destinations.map((item) => {
                  const selected = destinationKey(focused) === destinationKey(item)
                  return (
                    <th key={item.name} className={cn("p-0 text-center", columnClass(item))}>
                      <button
                        type="button"
                        onClick={() => setFocused(item)}
                        aria-pressed={selected}
                        className={cn(
                          "flex w-full flex-col items-center gap-0.5 px-3 py-3 text-center font-bold transition hover:bg-primary/5",
                          selected && "bg-primary/10 text-primary"
                        )}
                      >
                        <span>{item.name}</span>
                        {item.isWinner ? (
                          <span className={cn("text-[0.65rem] font-semibold uppercase tracking-wide", selected ? "text-primary" : "text-primary/60")}>
                            {messages.result.topPick}
                          </span>
                        ) : null}
                      </button>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {tableRows.map(([label, getValue]) => (
                <tr key={label} className="border-t border-border">
                  <td className="p-3 font-semibold text-muted-foreground">{label}</td>
                  {result.destinations.map((item) => (
                    <td key={item.name} className={cn("p-3 text-center font-medium", columnClass(item))}>
                      {getValue(item)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="space-y-1 border-t border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
            <p>{messages.result.confidenceHelp}</p>
            <p>{messages.result.costSeePlan}</p>
            <p className="text-center">{messages.result.tapCityPreview}</p>
          </div>
        </div>
      ) : null}
    </section>
  )
}

// Public wrapper — keyed by result.winner so focused state resets when a new result arrives
export function DestinationCompare({
  result,
  compact = false,
  showPlanLink = true,
}: Readonly<{ result: CompareResult; compact?: boolean; showPlanLink?: boolean }>) {
  return (
    <DestinationCompareInner
      key={result.winner}
      result={result}
      compact={compact}
      showPlanLink={showPlanLink}
    />
  )
}
