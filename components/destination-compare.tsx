"use client"

import Image from "next/image"
import { CheckCircle2, Star } from "lucide-react"
import { useState } from "react"
import { ConfidencePill } from "@/components/confidence-pill"
import { useLocale } from "@/components/locale-provider"
import { localizeRating } from "@/lib/i18n"
import {
  computeMatchScore,
  matchScoreLabelBand,
  overallTenths,
  rankedAlternatives,
  walkabilityTenths,
} from "@/lib/match-score"
import type { CompareResult, Destination } from "@/lib/types"
import { cn, getCityImage } from "@/lib/utils"

function destinationKey(item: Destination) {
  return `${item.name}-${item.country}`
}

function FactorBar({
  label,
  value,
  detail,
}: Readonly<{ label: string; value: number; detail?: string }>) {
  const clamped = Math.max(0, Math.min(10, value))
  return (
    <div className="grid gap-1">
      <div className="flex items-baseline justify-between gap-2 text-xs">
        <span className="font-semibold text-foreground">{label}</span>
        <span className="tabular-nums text-muted-foreground">
          {clamped}/10{detail ? ` · ${detail}` : ""}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted" aria-hidden>
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500"
          style={{ width: `${clamped * 10}%` }}
        />
      </div>
    </div>
  )
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
  const winnerScore = computeMatchScore(winner.scores.overall, winner.confidence)
  const scoreBand = matchScoreLabelBand(winnerScore)
  const scoreBandLabel =
    scoreBand === "excellent"
      ? messages.result.matchExcellent
      : scoreBand === "strong"
        ? messages.result.matchStrong
        : messages.result.matchFair
  const walkTenths = walkabilityTenths(winner.scores.walkability)
  const alternatives = rankedAlternatives(result.destinations)

  const tableRows: [string, (item: Destination) => string][] = [
    [messages.result.tableOverall, (item) => starRating(item.scores.overall)],
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
            quality={90}
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

          <div className="mb-4 grid gap-3 rounded-md border border-primary/25 bg-primary/5 p-3 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-5 sm:p-4">
            <div className="text-center sm:min-w-[7.5rem] sm:text-left">
              <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-primary">
                {messages.result.matchScore}
              </p>
              <p className="mt-1 flex items-baseline justify-center gap-1 sm:justify-start">
                <span className="text-4xl font-black tabular-nums tracking-tight text-foreground">{winnerScore}</span>
                <span className="text-sm font-semibold text-muted-foreground">{messages.result.matchScoreOutOf}</span>
              </p>
              <p className="mt-0.5 text-xs font-bold text-primary">{scoreBandLabel}</p>
            </div>
            <div className="grid gap-2.5">
              <FactorBar label={messages.result.factorOverall} value={overallTenths(winner.scores.overall)} />
              {walkTenths != null ? (
                <FactorBar
                  label={messages.result.factorWalkability}
                  value={walkTenths}
                  detail={localizeRating(winner.scores.walkability, messages)}
                />
              ) : null}
              <div className="grid gap-1 text-xs text-muted-foreground sm:grid-cols-2">
                <p>
                  <span className="font-semibold text-foreground">{messages.result.factorWeather}: </span>
                  {winner.scores.weather}
                </p>
                <p>
                  <span className="font-semibold text-foreground">{messages.result.factorFlight}: </span>
                  {winner.scores.flightTime}
                </p>
              </div>
            </div>
          </div>
          <p className="mb-3 text-[0.7rem] leading-relaxed text-muted-foreground">{messages.result.matchHelp}</p>

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
              <h4 className="text-sm font-extrabold">{messages.result.alternativesTitle}</h4>
              <ul className="mt-2 space-y-3">
                {alternatives.map(({ item, score }, index) => (
                  <li key={item.name} className="card-hover rounded-md border border-border/80 bg-muted/20 px-3 py-2.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-sm font-extrabold text-foreground">
                        #{index + 2} {item.name}
                        <span className="ml-1 font-semibold text-muted-foreground">— {score}/100</span>
                      </p>
                    </div>
                    <p className="mt-1 text-xs font-extrabold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                      {messages.result.whyNotCity.replace("{city}", item.name)}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {item.tradeoffs[0] || result.whyNotOthers || "—"}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            {showPlanLink ? (
              <a href="#full-plan" className="inline-flex h-10 items-center justify-center self-start rounded-md border border-border px-4 text-sm font-bold text-primary hover:bg-primary/10">
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
                        <span className="text-[0.65rem] font-semibold tabular-nums text-muted-foreground">
                          {computeMatchScore(item.scores.overall, item.confidence)}/100
                        </span>
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
            <p className="text-center">{messages.result.tapCityTradeoffs}</p>
          </div>
        </div>
      ) : null}

      <div className="mt-4 grid gap-4 rounded-md border border-border bg-muted/30 p-4 sm:grid-cols-2">
        <div>
          <h4 className="text-sm font-extrabold">
            {messages.result.focusedWins}
            <span className="ml-1 font-semibold text-primary">· {focused.name}</span>
          </h4>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {focused.whyWins.length > 0 ? (
              focused.whyWins.map((reason) => <li key={reason}>• {reason}</li>)
            ) : (
              <li>• {focused.name}, {focused.country}</li>
            )}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-extrabold">
            {messages.result.focusedTradeoffs}
            <span className="ml-1 font-semibold text-muted-foreground">· {focused.name}</span>
          </h4>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {focused.tradeoffs.length > 0 ? (
              focused.tradeoffs.map((item) => <li key={item}>• {item}</li>)
            ) : (
              <li>• —</li>
            )}
          </ul>
        </div>
      </div>
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

/**
 * Five-star string for the overall score. Clamped here as well as in compare-normalize / share-codec,
 * because results restored from sessionStorage skip both: an out-of-range value made repeat() throw.
 */
function starRating(overall: number): string {
  const stars = Math.max(0, Math.min(5, Math.round(Number(overall) || 0)))
  return "★".repeat(stars) + "☆".repeat(5 - stars)
}
