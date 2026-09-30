"use client"

import { AlertTriangle, CloudRain, Footprints, SlidersHorizontal, Timer, UtensilsCrossed } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import { cityText, fill, formatMinutes } from "@/lib/cities"
import { ADJUST_TOGGLES, type AdjustedRoute, type AdjustToggle, type RouteChange } from "@/lib/cities/adjust"
import type { City } from "@/lib/cities/types"
import { cn } from "@/lib/utils"

const toggleIcon: Record<AdjustToggle, typeof CloudRain> = {
  rain: CloudRain,
  easier: Footprints,
  food: UtensilsCrossed,
  shorter: Timer,
}

/** Deterministic toggles (ADR 0008 §4) and the list of what they changed, each with its reason. */
export function AdjustPanel({
  city,
  active,
  onToggle,
  onReset,
  result,
}: Readonly<{
  city: City
  active: ReadonlySet<AdjustToggle>
  onToggle: (toggle: AdjustToggle) => void
  onReset: () => void
  result: AdjustedRoute
}>) {
  const { locale, messages } = useLocale()
  const m = messages.city
  const name = (id: string) => {
    const place = city.places.find((item) => item.id === id)
    return place ? cityText(place.name, locale) : id
  }

  const describe = (change: RouteChange): string => {
    switch (change.kind) {
      case "swap":
        return fill(m.change.swapRain, { from: name(change.from), to: name(change.to) })
      case "remove":
        if (change.toggle === "rain") return fill(m.change.removeRain, { from: name(change.from) })
        if (change.toggle === "easier") return fill(m.change.removeEasier, { from: name(change.from) })
        return fill(m.change.removeShorter, { from: name(change.from) })
      case "taxi":
        return fill(m.change.taxi, { to: name(change.to), m: formatMinutes(change.walkMinutes, messages) })
      case "add":
        return fill(m.change.addFood, { to: name(change.to), near: name(change.near) })
      case "noFood":
        return m.change.noFood
    }
  }

  return (
    <section className="rounded-md border border-border bg-card p-4 shadow-sm sm:p-5" aria-labelledby="adjust-heading">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-primary" aria-hidden />
          <h3 id="adjust-heading" className="text-base font-extrabold">
            {m.adjustTitle}
          </h3>
        </div>
        {active.size > 0 && (
          <button type="button" onClick={onReset} className="min-h-9 rounded-md px-2.5 text-xs font-bold text-primary hover:bg-secondary">
            {m.reset}
          </button>
        )}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{m.adjustLead}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {ADJUST_TOGGLES.map((toggle) => {
          const Icon = toggleIcon[toggle]
          const on = active.has(toggle)
          return (
            <button
              key={toggle}
              type="button"
              onClick={() => onToggle(toggle)}
              aria-pressed={on}
              className={cn(
                "inline-flex min-h-10 items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-bold transition",
                on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/60"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {m.toggles[toggle]}
            </button>
          )
        })}
      </div>

      {active.size > 0 && (
        <div className="mt-4 border-t border-border pt-3" aria-live="polite">
          {result.rejected ? (
            <p className="text-sm text-muted-foreground">{m.rejected}</p>
          ) : (
            <>
              <p className="text-sm font-extrabold">
                {m.changesTitle}{" "}
                <span className="font-semibold text-muted-foreground">
                  · {fill(m.about, { d: formatMinutes(result.route.estimatedDurationMinutes, messages) })} ·{" "}
                  {fill(m.stops, { n: result.route.stops.length })}
                </span>
              </p>
              {result.unworkable && (
                <p className="mt-2 flex gap-2 rounded-md bg-warning/15 p-2 text-sm">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden />
                  {m.unworkable}
                </p>
              )}
              {result.changes.length === 0 ? (
                <p className="mt-1 text-sm text-muted-foreground">{m.noChanges}</p>
              ) : (
                <ul className="mt-2 space-y-1.5 text-sm">
                  {result.changes.map((change, index) => (
                    <li key={index}>• {describe(change)}</li>
                  ))}
                </ul>
              )}
              <p className="mt-2 text-xs text-muted-foreground">{m.adjustedNote}</p>
            </>
          )}
        </div>
      )}
    </section>
  )
}
