"use client"

import Link from "next/link"
import { HardDrive, MapPinned } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import { useCityMap } from "@/components/city/use-city-map"
import { cities, fill } from "@/lib/cities"
import { cityMapProgress } from "@/lib/city-map"
import { cn } from "@/lib/utils"

const LIVE_SLUGS = cities.map((city) => city.slug)

type Variant = "home" | "decide" | "index"

/** Compact “your travel map” strip — browser-local, not a global Top 100. */
export function TravelMapProgress({
  variant = "home",
  className,
}: Readonly<{ variant?: Variant; className?: string }>) {
  const { messages } = useLocale()
  const m = messages.city
  const state = useCityMap()
  const progress = cityMapProgress(state, LIVE_SLUGS)
  const hasMarks = progress.wantLive > 0 || progress.beenLive > 0

  if (variant === "decide" && !hasMarks) return null

  const pct =
    progress.totalLive > 0 ? Math.round((progress.beenLive / progress.totalLive) * 100) : 0

  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-card/80 px-4 py-4 shadow-sm sm:px-5",
        className
      )}
      aria-labelledby={`travel-map-${variant}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-primary">
            <MapPinned className="h-3.5 w-3.5" aria-hidden />
            {m.lifeMapEyebrow}
          </p>
          <h2 id={`travel-map-${variant}`} className="mt-1 text-lg font-extrabold tracking-tight sm:text-xl">
            {m.lifeMapTitle}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.lifeMapLead}</p>
        </div>
        {variant !== "index" ? (
          <Link
            href="/city"
            className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-border px-4 text-sm font-bold text-primary hover:border-primary"
          >
            {m.lifeMapBrowseCta}
          </Link>
        ) : null}
      </div>

      <p className="mt-3 text-sm font-semibold text-foreground">
        {hasMarks
          ? fill(m.lifeMapProgress, {
              been: progress.beenLive,
              want: progress.wantLive,
              total: progress.totalLive,
              pct,
            })
          : fill(m.lifeMapEmpty, { total: progress.totalLive })}
      </p>

      {hasMarks ? (
        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={progress.totalLive}
          aria-valuenow={progress.beenLive}
          aria-label={fill(m.lifeMapProgress, {
            been: progress.beenLive,
            want: progress.wantLive,
            total: progress.totalLive,
            pct,
          })}
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      ) : null}

      <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
        <HardDrive className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        <span>{m.lifeMapLocalOnly}</span>
      </p>
    </section>
  )
}
