"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ArrowRight, Search, X } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { CityMapToggles } from "@/components/city/city-map-toggles"
import { TravelMapProgress } from "@/components/city/travel-map-progress"
import { DecideCta } from "@/components/content-shell"
import { useLocale } from "@/components/locale-provider"
import { listCityCatalog } from "@/lib/cities/catalog"
import { parseIntent, parseRegion, type IntentFilter, type RegionFilter } from "@/lib/cities/filters"
import { cityText, fill } from "@/lib/cities"
import { cn } from "@/lib/utils"

export type { IntentFilter, RegionFilter }

function normalize(value: string) {
  return value.normalize("NFKC").toLowerCase().trim()
}

/**
 * Full city-guide directory. SSR always paints the full catalog (crawlers + CDN).
 * Region/intent filters sync from the URL after mount — never useSearchParams (CSR bailout).
 */
export function CitiesIndexView({
  region: initialRegion = "all",
  intent: initialIntent = "all",
}: Readonly<{ region?: RegionFilter; intent?: IntentFilter }>) {
  const { locale, messages } = useLocale()
  const m = messages.city
  const catalog = listCityCatalog()
  const router = useRouter()
  const pathname = usePathname()

  const [query, setQuery] = useState("")
  const [region, setRegion] = useState<RegionFilter>(initialRegion)
  const [intent, setIntent] = useState<IntentFilter>(initialIntent)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setRegion(parseRegion(params.get("region")))
    setIntent(parseIntent(params.get("intent")))
  }, [])

  function pushFilters(nextRegion: RegionFilter, nextIntent: IntentFilter) {
    setRegion(nextRegion)
    setIntent(nextIntent)
    const params = new URLSearchParams()
    if (nextRegion !== "all") params.set("region", nextRegion)
    if (nextIntent !== "all") params.set("intent", nextIntent)
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const liveCount = catalog.filter((item) => item.status === "live").length
  const soonCount = catalog.length - liveCount

  const regionFilters: { id: RegionFilter; label: string }[] = [
    { id: "all", label: m.filterAll },
    { id: "asia", label: m.filterAsia },
    { id: "europe", label: m.filterEurope },
    { id: "americas", label: m.filterAmericas },
  ]

  const intentFilters: { id: IntentFilter; label: string }[] = [
    { id: "all", label: m.intentAll },
    { id: "first-city", label: m.intentFirstCity },
    { id: "beach", label: m.intentBeach },
    { id: "food", label: m.intentFood },
    { id: "culture", label: m.intentCulture },
  ]

  const filtered = useMemo(() => {
    const q = normalize(query)
    return catalog.filter((item) => {
      if (region !== "all" && item.region !== region) return false
      if (intent !== "all" && !item.intents.includes(intent)) return false
      if (!q) return true
      const haystack = [
        item.slug,
        item.localName,
        ...Object.values(item.name),
        ...Object.values(item.country),
        ...Object.values(item.blurb),
      ]
        .map(normalize)
        .join(" ")
      return haystack.includes(q)
    })
  }, [catalog, query, region, intent])

  return (
    <main className="decision-grid-bg flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary">{m.eyebrow}</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{m.indexTitle}</h1>
          <p className="mt-4 text-lg font-medium leading-relaxed text-muted-foreground">{m.indexLead}</p>
          <p className="mt-3 text-sm font-semibold text-foreground/80">
            {fill(m.indexCount, { live: liveCount, soon: soonCount, total: catalog.length })}
          </p>
        </header>

        <TravelMapProgress variant="index" className="mb-6" />

        <div className="mb-6 flex flex-col gap-3">
          <label className="relative block max-w-xl">
            <span className="sr-only">{m.searchLabel}</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={m.searchPlaceholder}
              autoComplete="off"
              className="h-12 w-full rounded-xl border border-border bg-card pl-10 pr-11 text-sm font-medium text-foreground shadow-sm outline-none ring-primary/30 placeholder:text-muted-foreground focus:border-primary focus:ring-2"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label={m.searchClear}
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            ) : null}
          </label>

          <div className="flex flex-wrap gap-2" role="group" aria-label={m.filterLabel}>
            {regionFilters.map((item) => {
              const active = region === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => pushFilters(item.id, intent)}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition",
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  )}
                  aria-pressed={active}
                >
                  {item.label}
                </button>
              )
            })}
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label={m.intentLabel}>
            {intentFilters.map((item) => {
              const active = intent === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => pushFilters(region, item.id)}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  )}
                  aria-pressed={active}
                >
                  {item.label}
                </button>
              )
            })}
          </div>

          <p className="text-sm font-semibold text-muted-foreground">
            {filtered.length === catalog.length
              ? fill(m.filterShowingAll, { n: filtered.length })
              : fill(m.filterShowing, { n: filtered.length, total: catalog.length })}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/70 px-5 py-10 text-center">
            <p className="text-base font-semibold text-foreground">{m.searchEmpty}</p>
            <button
              type="button"
              onClick={() => {
                setQuery("")
                pushFilters("all", "all")
              }}
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border border-border px-5 text-sm font-bold text-primary hover:border-primary"
            >
              {m.searchReset}
            </button>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => {
              const name = cityText(item.name, locale)
              const country = cityText(item.country, locale)
              const live = item.status === "live"
              const remote = item.image.startsWith("http")
              const body = (
                <>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      quality={90}
                      unoptimized={remote}
                      sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 100vw"
                      className={cn("object-cover", live && "motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.04]")}
                    />
                    {!live ? (
                      <span className="absolute right-3 top-3 rounded-md bg-background/90 px-2 py-1 text-[0.65rem] font-extrabold uppercase tracking-wide text-muted-foreground shadow-sm backdrop-blur">
                        {messages.chrome.soon}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <h2 className="text-lg font-extrabold tracking-tight">
                      {name}
                      {locale !== "zh" && item.localName && item.localName !== name ? (
                        <span className="ml-2 text-sm font-normal text-muted-foreground">{item.localName}</span>
                      ) : null}
                    </h2>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{country}</p>
                    <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{cityText(item.blurb, locale)}</p>
                    {live && item.places != null && item.routes != null ? (
                      <p className="text-xs font-semibold text-foreground/80">
                        {fill(m.indexMeta, { n: item.places, r: item.routes })}
                      </p>
                    ) : null}
                    {live ? (
                      <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-bold text-primary">
                        {fill(m.indexOpen, { city: name })}
                        <ArrowRight className="h-4 w-4 motion-safe:transition group-hover:translate-x-0.5" aria-hidden />
                      </span>
                    ) : (
                      <span className="mt-auto pt-1 text-sm font-semibold text-muted-foreground">{m.indexSoonHint}</span>
                    )}
                  </div>
                </>
              )

              return (
                <li key={item.slug}>
                  {live ? (
                    <article className="card-hover card-hover-media group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                      <Link href={`/city/${item.slug}`} className="flex min-h-0 flex-1 flex-col">
                        {body}
                      </Link>
                      <div className="border-t border-border px-4 py-3">
                        <CityMapToggles slug={item.slug} size="sm" />
                      </div>
                    </article>
                  ) : (
                    <article
                      className="flex h-full flex-col overflow-hidden rounded-2xl border border-dashed border-border bg-card/80"
                      aria-label={`${name} — ${messages.chrome.soon}`}
                    >
                      {body}
                    </article>
                  )}
                </li>
              )
            })}
          </ul>
        )}

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">{m.indexMoreNote}</p>

        <DecideCta />
      </div>
    </main>
  )
}
