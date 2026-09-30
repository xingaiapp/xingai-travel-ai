"use client"

import { ExternalLink } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import { cityText, fill, mapsUrl } from "@/lib/cities"
import type { Place } from "@/lib/cities/types"

/** A place with stable facts only, and the sources behind them (No Citation, No Claim). */
export function PlaceCard({ place, clusterName }: Readonly<{ place: Place; clusterName: string }>) {
  const { locale, messages } = useLocale()
  const m = messages.city

  return (
    <article className="flex h-full flex-col rounded-md border border-border bg-card p-4 shadow-sm">
      <h3 className="font-bold leading-snug">
        {cityText(place.name, locale)}
        {locale !== "zh" && <span className="ml-1.5 text-sm font-normal text-muted-foreground">{place.localName}</span>}
      </h3>
      <p className="text-xs text-muted-foreground">{clusterName}</p>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {place.categories.map((category) => (
          <li key={category} className="rounded bg-secondary px-1.5 py-0.5 text-[0.6875rem] font-bold text-secondary-foreground">
            {m.categories[category]}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-sm leading-relaxed text-foreground/90">{cityText(place.summary, locale)}</p>
      <p className="mb-3 mt-2 text-xs text-muted-foreground">
        {m.setting[place.setting]} · {m.bestTime[place.bestTime]} ·{" "}
        {fill(m.visitRange, { min: place.visitMinutes.min, max: place.visitMinutes.max })}
      </p>
      <div className="mt-auto flex flex-wrap items-end justify-between gap-2 border-t border-border pt-2">
        <p className="text-[0.6875rem] leading-relaxed text-muted-foreground">
          <span className="font-semibold">{m.sources}:</span>{" "}
          {place.sources.map((source, index) => (
            <span key={source.url}>
              {index > 0 && " · "}
              <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline decoration-border hover:text-primary">
                {source.name}
              </a>
            </span>
          ))}{" "}
          ({fill(m.readOn, { date: place.sources[0].retrievedAt })})
        </p>
        <a
          href={mapsUrl(place)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          {m.openInMaps}
          <ExternalLink className="h-3 w-3" aria-hidden />
        </a>
      </div>
    </article>
  )
}
