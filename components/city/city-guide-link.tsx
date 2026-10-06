"use client"

import Link from "next/link"
import { Map as MapIcon } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import { citiesForDestinations, cityText, fill, trackCityEvent } from "@/lib/cities"

/**
 * Optional next step after the decision (ADR 0008 §1.2): shown for any compared destination
 * that has a city page, in comparison order. It never feeds back into the comparison.
 */
export function CityGuideLink({ destinations }: Readonly<{ destinations: string[] }>) {
  const { locale, messages } = useLocale()
  const m = messages.city
  const matches = citiesForDestinations(destinations)
  if (matches.length === 0) return null

  return (
    <section className="card-hover rounded-md border border-border bg-card p-4 shadow-sm sm:p-5">
      {matches.map((city) => {
        const name = cityText(city.name, locale)
        return (
          <div key={city.slug} className="not-first:mt-4 not-first:border-t not-first:border-border not-first:pt-4">
            <h2 className="text-base font-extrabold">{fill(m.fromResultTitle, { city: name })}</h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{m.fromResultBody}</p>
            <Link
              href={`/city/${city.slug}`}
              onClick={() => trackCityEvent("city_from_result", city.slug)}
              className="mt-3 inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-extrabold transition hover:border-primary/40"
            >
              <MapIcon className="h-4 w-4 text-primary" aria-hidden />
              {fill(m.fromResultCta, { city: name })} →
            </Link>
          </div>
        )
      })}
    </section>
  )
}
