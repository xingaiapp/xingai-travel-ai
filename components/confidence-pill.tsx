"use client"

import { useLocale } from "@/components/locale-provider"
import type { Confidence } from "@/lib/types"
import { cn } from "@/lib/utils"

export function ConfidencePill({ value }: Readonly<{ value: Confidence }>) {
  const { messages } = useLocale()
  const labels: Record<Confidence, string> = {
    high: messages.result.confidenceHigh,
    medium: messages.result.confidenceMedium,
    low: messages.result.confidenceLow,
  }
  return (
    <span
      title={messages.result.confidenceHelp}
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold",
        value === "high" && "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
        value === "medium" && "bg-amber-500/15 text-amber-700 dark:text-amber-300",
        value === "low" && "bg-muted text-muted-foreground"
      )}
    >
      {labels[value] ?? labels.medium}
    </span>
  )
}
