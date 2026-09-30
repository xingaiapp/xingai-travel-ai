"use client"

import { ShieldAlert } from "lucide-react"
import { useLocale } from "@/components/locale-provider"

/**
 * Honest soft spots vs chatbot travel agents that overclaim live inventory.
 * Defaults to the /result copy; other pages (e.g. the city layer) pass their own.
 */
export function UncertaintyNotes({
  title,
  lead,
  items,
}: Readonly<{ title?: string; lead?: string; items?: string[] }> = {}) {
  const { messages } = useLocale()
  const u = messages.result.uncertainty
  const lines = items ?? [u.prices, u.flights, u.itinerary, u.booking]

  return (
    <section
      className="rounded-md border border-border bg-card p-4 shadow-sm sm:p-5"
      aria-labelledby="uncertainty-heading"
    >
      <div className="mb-3 flex items-center gap-2">
        <ShieldAlert className="h-5 w-5 text-primary" aria-hidden />
        <h2 id="uncertainty-heading" className="text-base font-extrabold">
          {title ?? u.title}
        </h2>
      </div>
      <p className="mb-3 text-sm text-muted-foreground">{lead ?? u.lead}</p>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {lines.map((line) => (
          <li key={line} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" aria-hidden />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
