"use client"

import { Bus, Car, ExternalLink, Footprints, ListOrdered, Mountain, Ship, TrainFront, TramFront } from "lucide-react"
import { EvidenceBadge } from "@/components/city/evidence-badge"
import { useLocale } from "@/components/locale-provider"
import { cityText, fill, formatMinutes, mapsUrl } from "@/lib/cities"
import type { City, TransportMode, TravelRoute } from "@/lib/cities/types"
import { cn } from "@/lib/utils"

const modeIcon: Record<TransportMode, typeof Footprints> = {
  walk: Footprints,
  mtr: TrainFront,
  tram: TramFront,
  peak_tram: Mountain,
  ferry: Ship,
  bus: Bus,
  taxi: Car,
}

/** Stop-by-stop list. Selecting a stop highlights it on the map, and the map does the same back. */
export function RouteTimeline({
  city,
  route,
  activeStop,
  onActivate,
}: Readonly<{ city: City; route: TravelRoute; activeStop: string | null; onActivate: (placeId: string) => void }>) {
  const { locale, messages } = useLocale()
  const m = messages.city
  const placeById = new Map(city.places.map((place) => [place.id, place]))
  const clusterName = new Map(city.clusters.map((cluster) => [cluster.id, cityText(cluster.name, locale)]))

  return (
    <section className="rounded-md border border-border bg-card p-4 shadow-sm sm:p-5" aria-labelledby="timeline-heading">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ListOrdered className="h-5 w-5 text-primary" aria-hidden />
          <h3 id="timeline-heading" className="text-base font-extrabold">
            {m.timelineTitle}
          </h3>
        </div>
        <p className="text-xs text-muted-foreground">{m.estimatesNote}</p>
      </div>
      <ol className="space-y-1">
        {route.stops.map((stop) => {
          const place = placeById.get(stop.placeId)
          if (!place) return null
          const active = activeStop === place.id
          const ModeIcon = stop.transportMode ? modeIcon[stop.transportMode] : null
          return (
            <li key={place.id} id={`stop-${place.id}`} className="scroll-mt-24">
              {ModeIcon && stop.transportMode && (
                <p className="flex items-center gap-2 py-1.5 pl-3 text-xs text-muted-foreground">
                  <ModeIcon className="h-3.5 w-3.5" aria-hidden />
                  {fill(m.travelAbout, {
                    m: formatMinutes(stop.estimatedTravelMinutesFromPrevious, messages),
                    mode: m.modes[stop.transportMode],
                  })}
                </p>
              )}
              <div
                className={cn(
                  "rounded-md border p-3 transition",
                  active ? "border-primary bg-primary/5" : "border-border bg-background"
                )}
              >
                <button
                  type="button"
                  onClick={() => onActivate(place.id)}
                  aria-pressed={active}
                  className="flex w-full items-start gap-3 text-left"
                >
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-extrabold",
                      active ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                    )}
                  >
                    {stop.order}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold leading-snug">
                      {cityText(place.name, locale)}
                      {locale !== "zh" && <span className="ml-1.5 text-sm font-normal text-muted-foreground">{place.localName}</span>}
                    </span>
                    <span className="block text-xs text-muted-foreground">{clusterName.get(place.clusterId)}</span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-foreground/90">{cityText(stop.reason, locale)}</span>
                  </span>
                </button>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 pl-10 text-xs">
                  <span className="text-muted-foreground">
                    {fill(m.visitAbout, { m: formatMinutes(stop.estimatedVisitMinutes, messages) })}
                  </span>
                  <a
                    href={mapsUrl(place)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-9 items-center gap-1 rounded-md border border-border px-2.5 font-semibold text-primary hover:border-primary/60"
                  >
                    {m.openInMaps}
                    <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>
                  {place.coordinates.precision === "area" && (
                    <span className="text-muted-foreground">{m.approxPoint}</span>
                  )}
                </div>
                {/* The reason above is editorial; the facts behind the place are sourced. */}
                <details className="mt-2 pl-10 text-sm">
                  <summary className="cursor-pointer py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground">
                    {m.aboutPlace}
                  </summary>
                  <p className="mt-1.5 leading-relaxed text-foreground/90">{cityText(place.summary, locale)}</p>
                  <div className="mt-1.5">
                    <EvidenceBadge sources={place.sources} />
                  </div>
                </details>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
