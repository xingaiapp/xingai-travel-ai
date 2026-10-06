"use client"

import { Check, Heart } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import { useCityMark, useToggleCityMark } from "@/components/city/use-city-map"
import { cn } from "@/lib/utils"

type Size = "sm" | "md"

/** Want / Been toggles — local only, never affects Decide ranking. */
export function CityMapToggles({
  slug,
  size = "md",
  className,
}: Readonly<{ slug: string; size?: Size; className?: string }>) {
  const { messages } = useLocale()
  const m = messages.city
  const current = useCityMark(slug)
  const toggle = useToggleCityMark(slug)

  const btn =
    size === "sm"
      ? "inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-full border px-3 text-xs font-bold transition"
      : "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border px-4 text-sm font-bold transition"

  return (
    <div
      className={cn("flex flex-wrap gap-2", className)}
      role="group"
      aria-label={m.mapGroupLabel}
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => toggle("want")}
        className={cn(
          btn,
          current === "want"
            ? "border-primary bg-primary/15 text-primary"
            : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
        )}
        aria-pressed={current === "want"}
      >
        <Heart className={cn("h-4 w-4", current === "want" && "fill-current")} aria-hidden />
        {m.mapWant}
      </button>
      <button
        type="button"
        onClick={() => toggle("been")}
        className={cn(
          btn,
          current === "been"
            ? "border-emerald-600/50 bg-emerald-500/15 text-emerald-800 dark:text-emerald-200"
            : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
        )}
        aria-pressed={current === "been"}
      >
        <Check className="h-4 w-4" aria-hidden />
        {m.mapBeen}
      </button>
    </div>
  )
}
