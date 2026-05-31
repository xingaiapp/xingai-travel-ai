import type { Confidence } from "@/lib/types"
import { cn } from "@/lib/utils"

const labels: Record<Confidence, string> = {
  high: "High confidence",
  medium: "Medium confidence",
  low: "Low confidence",
}

export function ConfidencePill({ value }: Readonly<{ value: Confidence }>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold",
        value === "high" && "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
        value === "medium" && "bg-amber-500/15 text-amber-700 dark:text-amber-300",
        value === "low" && "bg-muted text-muted-foreground"
      )}
    >
      {labels[value]}
    </span>
  )
}
