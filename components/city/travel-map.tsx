"use client"

import { Map as MapIcon } from "lucide-react"
import { useMemo, useSyncExternalStore } from "react"
import { useLocale } from "@/components/locale-provider"
import { cityText } from "@/lib/cities"
import type { City, TravelRoute } from "@/lib/cities/types"
import { cn } from "@/lib/utils"

/** Wide on tablets and desktops; taller on phones so markers and labels stay readable. */
const WIDE = { width: 800, height: 500 }
const TALL = { width: 480, height: 560 }
const MARKER_R = 17
/** Smallest area the map shows, in degrees, so the harbour stays in view on compact routes. */
const MIN_SPAN_LAT = 0.018
const PADDING = 0.22

type Point = { x: number; y: number }

/**
 * Schematic route map (ADR 0008 §5): inline SVG, no tiles, no API key.
 * It fits the selected route, draws the harbour for orientation, and syncs with the timeline.
 */
export function TravelMap({
  city,
  route,
  activeStop,
  onActivate,
}: Readonly<{ city: City; route: TravelRoute; activeStop: string | null; onActivate: (placeId: string) => void }>) {
  const { locale, messages } = useLocale()
  const m = messages.city
  const placeById = useMemo(() => new Map(city.places.map((place) => [place.id, place])), [city])
  const { width: WIDTH, height: HEIGHT } = useNarrow() ? TALL : WIDE

  const layout = useMemo(() => {
    const stops = route.stops.flatMap((stop) => {
      const place = placeById.get(stop.placeId)
      return place ? [{ stop, place }] : []
    })
    const lats = stops.map(({ place }) => place.coordinates.lat)
    const lngs = stops.map(({ place }) => place.coordinates.lng)
    const midLat = (Math.min(...lats) + Math.max(...lats)) / 2
    const cos = Math.cos((midLat * Math.PI) / 180)

    // Work in "flat degrees" (longitude scaled by cos(lat)) so distances look right.
    let minX = Math.min(...lngs) * cos
    let maxX = Math.max(...lngs) * cos
    let minY = Math.min(...lats)
    let maxY = Math.max(...lats)
    const padX = Math.max(maxX - minX, MIN_SPAN_LAT) * PADDING
    const padY = Math.max(maxY - minY, MIN_SPAN_LAT) * PADDING
    minX -= padX
    maxX += padX
    minY -= padY
    maxY += padY
    let spanX = Math.max(maxX - minX, MIN_SPAN_LAT)
    let spanY = Math.max(maxY - minY, MIN_SPAN_LAT)
    const aspect = WIDTH / HEIGHT
    if (spanX / spanY < aspect) spanX = spanY * aspect
    else spanY = spanX / aspect
    const cx = (minX + maxX) / 2
    const cy = (minY + maxY) / 2
    const scale = WIDTH / spanX

    const project = (lng: number, lat: number): Point => ({
      x: (lng * cos - (cx - spanX / 2)) * scale,
      y: (cy + spanY / 2 - lat) * scale,
    })

    const truePoints = stops.map(({ place }) => project(place.coordinates.lng, place.coordinates.lat))
    // Nudge markers apart when stops sit a few metres from each other; a leader line keeps the true spot.
    const shown = truePoints.map((point) => ({ ...point }))
    for (let pass = 0; pass < 40; pass++) {
      for (let i = 0; i < shown.length; i++) {
        for (let j = i + 1; j < shown.length; j++) {
          const dx = shown[j].x - shown[i].x
          const dy = shown[j].y - shown[i].y
          const dist = Math.hypot(dx, dy) || 0.01
          const min = MARKER_R * 2 + 4
          if (dist < min) {
            const push = (min - dist) / 2
            const ux = dist === 0.01 ? 1 : dx / dist
            const uy = dist === 0.01 ? 0 : dy / dist
            shown[i].x -= ux * push
            shown[i].y -= uy * push
            shown[j].x += ux * push
            shown[j].y += uy * push
          }
        }
      }
    }

    const water = city.map.water.map(([lng, lat]) => project(lng, lat))
    const waterLabel = project(...city.map.waterLabelAt)
    const routeIds = new Set(stops.map(({ place }) => place.id))
    const others = city.places
      .filter((place) => !routeIds.has(place.id))
      .map((place) => ({ place, point: project(place.coordinates.lng, place.coordinates.lat) }))
      .filter(({ point }) => point.x > 0 && point.x < WIDTH && point.y > 0 && point.y < HEIGHT)
    const clusters = city.clusters
      .map((cluster) => {
        const members = city.places.filter((place) => place.clusterId === cluster.id)
        const lng = members.reduce((sum, place) => sum + place.coordinates.lng, 0) / members.length
        const lat = members.reduce((sum, place) => sum + place.coordinates.lat, 0) / members.length
        return { cluster, point: project(lng, lat) }
      })
      .filter(({ point }) => point.x > 40 && point.x < WIDTH - 40 && point.y > 20 && point.y < HEIGHT - 20)

    return { stops, truePoints, shown, water, waterLabel, others, clusters }
  }, [city, route, placeById, WIDTH, HEIGHT])

  const activate = (placeId: string) => () => onActivate(placeId)
  const activeIndex = layout.stops.findIndex(({ place }) => place.id === activeStop)

  return (
    <section className="card-hover rounded-md border border-border bg-card p-4 shadow-sm sm:p-5" aria-labelledby="map-heading">
      <div className="mb-3 flex items-center gap-2">
        <MapIcon className="h-5 w-5 text-primary" aria-hidden />
        <h3 id="map-heading" className="text-base font-extrabold">
          {m.mapTitle}
        </h3>
      </div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-auto w-full rounded-md border border-border bg-muted"
        role="group"
        aria-label={`${m.mapTitle}: ${cityText(route.name, locale)}`}
      >
        <polygon
          points={layout.water.map((p) => `${p.x},${p.y}`).join(" ")}
          className="fill-primary/15"
        />
        <text
          x={Math.min(Math.max(layout.waterLabel.x, 110), WIDTH - 110)}
          y={Math.min(Math.max(layout.waterLabel.y, 30), HEIGHT - 16)}
          textAnchor="middle"
          className="fill-primary/60 text-[22px] font-semibold italic"
        >
          {cityText(city.map.waterLabel, locale)}
        </text>

        {layout.clusters.map(({ cluster, point }) => (
          <text
            key={cluster.id}
            x={point.x}
            y={point.y - 26}
            textAnchor="middle"
            className="fill-muted-foreground/70 text-[17px] font-bold uppercase tracking-wider"
          >
            {cityText(cluster.name, locale)}
          </text>
        ))}

        {layout.others.map(({ place, point }) => (
          <circle key={place.id} cx={point.x} cy={point.y} r={4} className="fill-muted-foreground/40">
            <title>{cityText(place.name, locale)}</title>
          </circle>
        ))}

        {layout.shown.slice(1).map((point, index) => {
          const previous = layout.shown[index]
          const mode = layout.stops[index + 1].stop.transportMode
          return (
            <line
              key={layout.stops[index + 1].place.id}
              x1={previous.x}
              y1={previous.y}
              x2={point.x}
              y2={point.y}
              className="stroke-primary"
              strokeWidth={4}
              strokeLinecap="round"
              strokeDasharray={mode === "walk" ? undefined : "10 8"}
            />
          )
        })}

        {layout.stops.map(({ stop, place }, index) => {
          const shown = layout.shown[index]
          const actual = layout.truePoints[index]
          const active = index === activeIndex
          return (
            <g
              key={place.id}
              role="button"
              tabIndex={0}
              aria-pressed={active}
              aria-label={`${stop.order}. ${cityText(place.name, locale)}`}
              onClick={activate(place.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  onActivate(place.id)
                }
              }}
              className="cursor-pointer outline-none [&:focus-visible>circle.marker]:stroke-foreground"
            >
              {(shown.x !== actual.x || shown.y !== actual.y) && (
                <>
                  <line x1={actual.x} y1={actual.y} x2={shown.x} y2={shown.y} className="stroke-foreground/40" strokeWidth={1.5} />
                  <circle cx={actual.x} cy={actual.y} r={3} className="fill-foreground/60" />
                </>
              )}
              <circle
                cx={shown.x}
                cy={shown.y}
                r={active ? MARKER_R + 4 : MARKER_R}
                strokeWidth={3}
                className={cn(
                  "marker stroke-background transition-all",
                  active ? "fill-primary" : "fill-card stroke-primary"
                )}
              />
              <text
                x={shown.x}
                y={shown.y + 6}
                textAnchor="middle"
                className={cn("pointer-events-none text-[17px] font-extrabold", active ? "fill-primary-foreground" : "fill-primary")}
              >
                {stop.order}
              </text>
            </g>
          )
        })}

        {activeIndex >= 0 && (
          <text
            x={Math.min(Math.max(layout.shown[activeIndex].x, 120), WIDTH - 120)}
            y={layout.shown[activeIndex].y < 60 ? layout.shown[activeIndex].y + 48 : layout.shown[activeIndex].y - 28}
            textAnchor="middle"
            paintOrder="stroke"
            strokeWidth={6}
            strokeLinejoin="round"
            className="pointer-events-none fill-foreground stroke-background text-[22px] font-extrabold"
          >
            {cityText(layout.stops[activeIndex].place.name, locale)}
          </text>
        )}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">{m.mapNote}</p>
    </section>
  )
}

const NARROW_QUERY = "(max-width: 639px)"

function subscribeNarrow(onChange: () => void) {
  const query = window.matchMedia(NARROW_QUERY)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

/** Server and first paint use the wide layout; phones switch right after hydration. */
function useNarrow() {
  return useSyncExternalStore(
    subscribeNarrow,
    () => window.matchMedia(NARROW_QUERY).matches,
    () => false
  )
}
