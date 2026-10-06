"use client"

import { Check, Clock, MapPin } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import { CityPhoto } from "@/components/city/city-photo"
import { cityText, fill, formatMinutes } from "@/lib/cities"
import type { City, TravelRoute } from "@/lib/cities/types"
import { cn } from "@/lib/utils"

/** Cluster names in visiting order, without repeats (routes never backtrack). */
export function routeAreas(city: City, route: TravelRoute): string[] {
  const clusterOf = new Map(city.places.map((place) => [place.id, place.clusterId]))
  const ids = route.stops.map((stop) => clusterOf.get(stop.placeId)).filter((id): id is string => !!id)
  return ids.filter((id, index) => ids.indexOf(id) === index)
}

/** One of the "3 ways" options. Deliberately no ranking, score or "best" badge (ADR 0008). */
export function RouteCard({
  city,
  route,
  selected,
  onSelect,
}: Readonly<{ city: City; route: TravelRoute; selected: boolean; onSelect: () => void }>) {
  const { locale, messages } = useLocale()
  const m = messages.city
  const clusterName = new Map(city.clusters.map((cluster) => [cluster.id, cityText(cluster.name, locale)]))
  const areas = routeAreas(city, route).map((id) => clusterName.get(id) ?? id)

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "card-hover card-hover-media group flex h-full flex-col overflow-hidden rounded-md border bg-card text-left shadow-sm",
        selected ? "border-primary ring-2 ring-primary" : "border-border"
      )}
    >
      {route.photo && (
        <CityPhoto
          photo={route.photo}
          hires
          className="aspect-[16/10] w-full"
          sizes="(min-width: 1024px) 28rem, 100vw"
          showCredit={false}
        />
      )}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-xl font-bold leading-tight">{cityText(route.name, locale)}</h3>
          {selected && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
              <Check className="h-3.5 w-3.5" aria-hidden />
              {m.selected}
            </span>
          )}
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{cityText(route.description, locale)}</p>
        <p className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs font-semibold text-foreground/80">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-primary" aria-hidden />
            {fill(m.about, { d: formatMinutes(route.estimatedDurationMinutes, messages) })}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
            {fill(m.stops, { n: route.stops.length })}
          </span>
        </p>
        <p className="text-xs text-muted-foreground">{areas.join(" → ")}</p>
        {!selected && (
          <span className="text-xs font-bold text-primary group-hover:underline">{m.showRoute} →</span>
        )}
      </div>
    </button>
  )
}
