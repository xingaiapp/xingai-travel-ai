"use client"

import { Building2, Mountain, Palmtree, SlidersHorizontal, Umbrella, Waves } from "lucide-react"
import type { TripContext, TripPace, TripStyle } from "@/lib/types"
import { useLocale } from "@/components/locale-provider"
import { cn } from "@/lib/utils"

interface StylePaceSelectorProps {
  value: TripContext
  onChange: (value: TripContext) => void
}

const styles: { key: TripStyle; icon: typeof Building2 }[] = [
  { key: "city", icon: Building2 },
  { key: "beach", icon: Palmtree },
  { key: "nature", icon: Mountain },
  { key: "culture", icon: Umbrella },
]

const paces: { key: TripPace; icon: typeof Building2 }[] = [
  { key: "relaxed", icon: Waves },
  { key: "balanced", icon: SlidersHorizontal },
  { key: "adventure", icon: Mountain },
]

export function StylePaceSelector({ value, onChange }: StylePaceSelectorProps) {
  const { messages } = useLocale()

  function toggleStyle(style: TripStyle) {
    const selected = value.style.includes(style)
    const next = selected ? value.style.filter((item) => item !== style) : [...value.style, style].slice(0, 2)
    onChange({ ...value, style: next.length ? next : [style] })
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
        </span>
        <h2 className="text-base font-extrabold">2 · {messages.style.title}</h2>
      </div>

      <div className="space-y-4">
        <div>
          <p className="mb-2 text-xs font-bold text-foreground">{messages.style.style} <span className="font-medium text-muted-foreground">(up to 2)</span></p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {styles.map(({ key, icon: Icon }) => {
              const active = value.style.includes(key)
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleStyle(key)}
                  className={cn(
                    "flex h-11 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-bold transition",
                    active ? "border-primary bg-primary/10 text-primary ring-4 ring-primary/10" : "border-border bg-background text-foreground hover:border-primary/40"
                  )}
                  aria-pressed={active}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {messages.style[key]}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-foreground">{messages.style.pace}</p>
          <div className="grid grid-cols-3 gap-2">
            {paces.map(({ key, icon: Icon }) => {
              const active = value.pace === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onChange({ ...value, pace: key })}
                  className={cn(
                    "flex h-11 items-center justify-center gap-2 rounded-xl border px-2 text-sm font-bold transition",
                    active ? "border-primary bg-primary/10 text-primary ring-4 ring-primary/10" : "border-border bg-background text-foreground hover:border-primary/40"
                  )}
                  aria-pressed={active}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {messages.style[key]}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
