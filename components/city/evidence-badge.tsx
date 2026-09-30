"use client"

import { ChevronDown, ShieldCheck } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import { fill } from "@/lib/cities"
import type { Source } from "@/lib/cities/types"

/** "N sources" that opens into each source with its link and read date (No Citation, No Claim). */
export function EvidenceBadge({ sources }: Readonly<{ sources: Source[] }>) {
  const { messages } = useLocale()
  const m = messages.city

  return (
    <details className="group text-xs">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1 min-h-9 rounded-md bg-success/10 px-2.5 font-semibold text-success [&::-webkit-details-marker]:hidden">
        <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
        {fill(sources.length === 1 ? m.sourceCountOne : m.sourceCount, { n: sources.length })}
        <ChevronDown className="h-3 w-3 transition group-open:rotate-180" aria-hidden />
      </summary>
      <ul className="mt-2 space-y-2 text-muted-foreground">
        {sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground underline decoration-border hover:text-primary">
              {source.name}
            </a>{" "}
            · {fill(m.readOn, { date: source.retrievedAt })}
          </li>
        ))}
      </ul>
    </details>
  )
}
