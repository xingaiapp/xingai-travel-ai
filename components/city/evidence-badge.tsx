"use client"

import { ChevronDown, ShieldCheck } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import { fill } from "@/lib/cities"
import type { Source } from "@/lib/cities/types"

/** "N sources" chip → expandable list with link + read date (No Citation, No Claim). */
export function EvidenceBadge({ sources }: Readonly<{ sources: Source[] }>) {
  const { messages } = useLocale()
  const m = messages.city

  return (
    <details className="group min-w-0 text-xs">
      <summary className="inline-flex min-h-9 cursor-pointer list-none items-center gap-1.5 rounded-md border border-success/35 bg-success/10 px-2.5 font-bold text-success shadow-[0_0_0_1px_color-mix(in_oklch,var(--success)_12%,transparent)] transition hover:border-success/55 hover:bg-success/15 [&::-webkit-details-marker]:hidden">
        <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span>{fill(sources.length === 1 ? m.sourceCountOne : m.sourceCount, { n: sources.length })}</span>
        <ChevronDown className="h-3 w-3 shrink-0 opacity-90 transition group-open:rotate-180" aria-hidden />
      </summary>
      <ul className="mt-2 space-y-2 rounded-md border border-border/80 bg-muted/30 px-3 py-2.5 text-muted-foreground">
        {sources.map((source) => (
          <li key={source.url} className="leading-snug">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground underline decoration-border underline-offset-2 hover:text-primary"
            >
              {source.name}
            </a>
            <span className="text-muted-foreground"> · {fill(m.readOn, { date: source.retrievedAt })}</span>
          </li>
        ))}
      </ul>
    </details>
  )
}
