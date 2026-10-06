"use client"

import Link from "next/link"
import { ArrowRight, Compass, Info } from "lucide-react"
import { useMemo, useRef, useState } from "react"
import { useLocale } from "@/components/locale-provider"
import { AdjustPanel } from "@/components/city/adjust-panel"
import { CityPhoto } from "@/components/city/city-photo"
import { PlaceCard } from "@/components/city/place-card"
import { RouteCard } from "@/components/city/route-card"
import { RouteExplanation } from "@/components/city/route-explanation"
import { RouteTimeline } from "@/components/city/route-timeline"
import { TravelMap } from "@/components/city/travel-map"
import { UncertaintyNotes } from "@/components/uncertainty-notes"
import { cityDecideHref, cityText, fill, trackCityEvent } from "@/lib/cities"
import { adjustRoute, type AdjustToggle } from "@/lib/cities/adjust"
import type { City, PlaceCategory } from "@/lib/cities/types"
import { cn } from "@/lib/utils"

const FILTERS: (PlaceCategory | "all")[] = ["iconic", "photo", "local", "food", "culture", "night", "nature", "all"]

/** City layer page (ADR 0008): places → 3 routes → selected route (why, map, stops). */
export function CityPage({ city }: Readonly<{ city: City }>) {
  const { locale, messages } = useLocale()
  const m = messages.city
  const name = cityText(city.name, locale)
  const clusterName = new Map(city.clusters.map((cluster) => [cluster.id, cityText(cluster.name, locale)]))

  const [filter, setFilter] = useState<PlaceCategory | "all">("iconic")
  const [routeId, setRouteId] = useState(city.routes[0]?.id)
  const [activeStop, setActiveStop] = useState<string | null>(null)
  const [toggles, setToggles] = useState<ReadonlySet<AdjustToggle>>(new Set())
  const detailRef = useRef<HTMLDivElement>(null)

  const route = city.routes.find((item) => item.id === routeId) ?? city.routes[0]
  const adjusted = useMemo(() => adjustRoute(city, route, toggles), [city, route, toggles])
  const shownRoute = adjusted.route
  const filters = FILTERS.filter((key) => key === "all" || city.places.some((place) => place.categories.includes(key)))
  const places = filter === "all" ? city.places : city.places.filter((place) => place.categories.includes(filter))

  const selectRoute = (id: string) => {
    if (id !== routeId) trackCityEvent("city_route_select", city.slug, id)
    setRouteId(id)
    setActiveStop(null)
    setToggles(new Set())
    requestAnimationFrame(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }))
  }

  const toggle = (key: AdjustToggle) => {
    setActiveStop(null)
    setToggles((current) => {
      const next = new Set(current)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const activateFromMap = (placeId: string) => {
    setActiveStop(placeId)
    document.getElementById(`stop-${placeId}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }

  return (
    <main className="flex-1 pb-28 lg:pb-12">
      <header className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 lg:px-10">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">{m.eyebrow}</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {name}
          {locale !== "zh" && <span className="ml-3 text-2xl font-normal text-muted-foreground sm:text-3xl">{city.localName}</span>}
        </h1>
      </header>

      {/* Full-bleed hero — same edge-to-edge stage as Home / Decide */}
      <CityPhoto
        photo={city.hero}
        priority
        hires
        className="page-hero-full mt-5 w-full rounded-none [&_img]:object-[72%_48%]"
        sizes="100vw"
      />

      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 lg:px-10">
        <section className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start" aria-labelledby="first-time-heading">
          <div>
            <h2 id="first-time-heading" className="text-xl font-extrabold">
              {fill(m.firstTimeTitle, { city: name })}
            </h2>
            <p className="mt-2 max-w-3xl text-base leading-relaxed text-foreground/90">{cityText(city.intro, locale)}</p>
            <p className="mt-3 flex max-w-3xl gap-2 text-sm text-muted-foreground">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              {m.notCovered}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:items-stretch">
            <a
              href="#routes"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              <Compass className="h-4 w-4" aria-hidden />
              {fill(m.routesTitle, { city: name })}
            </a>
            <Link
              href={cityDecideHref(city)}
              onClick={() => trackCityEvent("city_to_decide", city.slug)}
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-bold text-foreground transition hover:border-primary/50"
            >
              {fill(m.decideCta, { city: name })}
              <ArrowRight className="h-4 w-4 text-primary" aria-hidden />
            </Link>
          </div>
        </section>

        <section className="mt-10" aria-labelledby="places-heading">
          <h2 id="places-heading" className="font-display text-2xl font-bold">
            {m.placesTitle}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {fill(m.placesLead, { n: city.places.length, m: city.clusters.length })}
          </p>
          <div className="-mx-4 mt-4 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="toolbar" aria-label={m.placesTitle}>
            <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
              {filters.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  aria-pressed={filter === key}
                  className={cn(
                    "rounded-md border px-3 py-1.5 text-sm font-bold transition",
                    filter === key
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/60"
                  )}
                >
                  {key === "all" ? m.filterAll : m.categories[key]}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {places.map((place) => (
              <PlaceCard key={place.id} place={place} clusterName={clusterName.get(place.clusterId) ?? ""} />
            ))}
          </div>
        </section>

        <section id="routes" className="mt-12 scroll-mt-20" aria-labelledby="routes-heading">
          <h2 id="routes-heading" className="font-display text-2xl font-bold">
            {fill(m.routesTitle, { city: name })}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{m.routesLead}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {city.routes.map((item) => (
              <RouteCard
                key={item.id}
                city={city}
                route={item}
                selected={item.id === route.id}
                onSelect={() => selectRoute(item.id)}
              />
            ))}
          </div>
        </section>

        {route && (
          <div ref={detailRef} className="mt-8 scroll-mt-20" aria-live="polite">
            <h2 className="flex flex-wrap items-center gap-2 font-display text-2xl font-bold">
              {cityText(route.name, locale)}
              {toggles.size > 0 && !adjusted.rejected && adjusted.changes.length > 0 && (
                <span className="rounded-md bg-warning/20 px-2 py-0.5 font-sans text-xs font-bold text-foreground">{m.adjusted}</span>
              )}
            </h2>
            <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{cityText(route.description, locale)}</p>
            {/* Phone: why → map → stops, so the decision reasons come first. Desktop: map across the top. */}
            <div className="mt-4 grid gap-4 lg:grid-cols-2 lg:items-start">
              <div className="grid gap-4 lg:order-2">
                <RouteExplanation route={route} />
                <AdjustPanel
                  city={city}
                  active={toggles}
                  onToggle={toggle}
                  onReset={() => setToggles(new Set())}
                  result={adjusted}
                />
              </div>
              <div className="lg:order-1 lg:col-span-2">
                <TravelMap city={city} route={shownRoute} activeStop={activeStop} onActivate={activateFromMap} />
              </div>
              <div className="lg:order-3">
                <RouteTimeline city={city} route={shownRoute} activeStop={activeStop} onActivate={setActiveStop} />
              </div>
            </div>
          </div>
        )}

        <section className="card-hover mt-12 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6" aria-labelledby="city-decide-heading">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{m.decideEyebrow}</p>
          <h2 id="city-decide-heading" className="mt-2 hero-display-title text-2xl font-semibold tracking-tight sm:text-3xl">
            {fill(m.decideTitle, { city: name })}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {fill(m.decideBody, { city: name })}
          </p>
          <Link
            href={cityDecideHref(city)}
            onClick={() => trackCityEvent("city_to_decide", city.slug)}
            className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-[0_8px_20px_color-mix(in_oklch,var(--primary)_28%,transparent)]"
          >
            {fill(m.decideCta, { city: name })}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>

        <div className="mt-8">
          <UncertaintyNotes
            title={m.notCoveredTitle}
            lead={m.notCoveredLead}
            items={[m.notCoveredItems.hours, m.notCoveredItems.prices, m.notCoveredItems.events, m.notCoveredItems.live]}
          />
        </div>
      </div>
    </main>
  )
}
