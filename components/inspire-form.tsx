"use client"

import {
  Baby, BookOpen, DollarSign, Flame, Leaf, Moon, Plane,
  Sparkles, TreePine, Utensils, Users2, Waves,
} from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import type { InspireContext, InspireFlightRange, InspirePriority, InspireVibe, TripContext } from "@/lib/types"
import { cn } from "@/lib/utils"

interface InspireFormProps {
  value: InspireContext
  onChange: (value: InspireContext) => void
  tripBudget: TripContext["budget"]
  tripTravelers: TripContext["travelers"]
}

type ChipOption<T> = { key: T; label: string; icon: React.ReactNode }
type PriorityOption = { key: InspirePriority; labelKey: keyof ReturnType<typeof useLocale>["messages"]["inspire"]["priorities"]; icon: React.ReactNode }

function ChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: ChipOption<T>[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold text-foreground">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map(({ key, label: lbl, icon }) => {
          const active = value === key
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              aria-pressed={active}
              className={cn(
                "inline-flex h-10 items-center gap-1.5 rounded-md border px-3 text-sm font-bold transition",
                active
                  ? "border-primary bg-primary/10 text-primary ring-4 ring-primary/10"
                  : "border-border bg-background text-foreground hover:border-primary/40"
              )}
            >
              {icon}
              {lbl}
            </button>
          )
        })}
      </div>
    </div>
  )
}

const VIBES: ChipOption<InspireVibe>[] = [
  { key: "recharge",  label: "Recharge",  icon: <Waves className="h-4 w-4" aria-hidden /> },
  { key: "explore",   label: "Explore",   icon: <Sparkles className="h-4 w-4" aria-hidden /> },
  { key: "culture",   label: "Culture",   icon: <BookOpen className="h-4 w-4" aria-hidden /> },
  { key: "adventure", label: "Adventure", icon: <Flame className="h-4 w-4" aria-hidden /> },
]

const FLIGHT_RANGES: ChipOption<InspireFlightRange>[] = [
  { key: "short",  label: "< 4h",   icon: <Plane className="h-4 w-4" aria-hidden /> },
  { key: "medium", label: "4–9h",   icon: <Plane className="h-4 w-4" aria-hidden /> },
  { key: "long",   label: "9h+",    icon: <Plane className="h-4 w-4" aria-hidden /> },
]

const PRIORITIES: PriorityOption[] = [
  { key: "food",          labelKey: "food",          icon: <Utensils className="h-4 w-4" aria-hidden /> },
  { key: "history",       labelKey: "history",       icon: <BookOpen className="h-4 w-4" aria-hidden /> },
  { key: "nature",        labelKey: "nature",        icon: <TreePine className="h-4 w-4" aria-hidden /> },
  { key: "nightlife",     labelKey: "nightlife",     icon: <Moon className="h-4 w-4" aria-hidden /> },
  { key: "family",        labelKey: "family",        icon: <Users2 className="h-4 w-4" aria-hidden /> },
  { key: "kids_friendly", labelKey: "kidsFriendly",  icon: <Baby className="h-4 w-4" aria-hidden /> },
]

export function InspireForm({ value, onChange, tripBudget, tripTravelers }: InspireFormProps) {
  const { messages } = useLocale()

  function patch(next: Partial<InspireContext>) {
    onChange({ ...value, ...next })
  }

  return (
    <section className="rounded-md border border-amber-400/35 bg-amber-50/40 p-4 dark:border-amber-600/35 dark:bg-amber-950/20 sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="surprise-tab-active flex h-8 w-8 items-center justify-center rounded-md">
          <Sparkles className="h-4 w-4" aria-hidden />
        </span>
        <div>
          <h2 className="text-base font-extrabold">{messages.inspire.title}</h2>
          <p className="text-xs text-muted-foreground">{messages.inspire.subtitle}</p>
        </div>
      </div>

      <div className="space-y-4">
        <ChipGroup<InspireVibe>
          label={messages.inspire.vibeLabel}
          options={VIBES}
          value={value.vibe}
          onChange={(v) => patch({ vibe: v })}
        />

        <ChipGroup<InspireFlightRange>
          label={messages.inspire.flightLabel}
          options={FLIGHT_RANGES}
          value={value.flightRange}
          onChange={(v) => patch({ flightRange: v })}
        />

        <ChipGroup<InspirePriority>
          label={messages.inspire.priorityLabel}
          options={PRIORITIES.map((option) => ({ ...option, label: messages.inspire.priorities[option.labelKey] }))}
          value={value.priority}
          onChange={(v) => patch({ priority: v })}
        />

        <div className="flex items-center gap-3 rounded-md border border-border bg-background p-3 text-sm">
          <DollarSign className="h-4 w-4 shrink-0 text-primary" aria-hidden />
          <span className="text-muted-foreground">{messages.inspire.budgetNote}</span>
          <span className="ml-auto font-bold text-foreground">
            {tripBudget.currency} {tripBudget.amount.toLocaleString()} · {tripTravelers.count} {messages.travelers[tripTravelers.type]}
          </span>
        </div>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Leaf className="h-3.5 w-3.5 text-emerald-500" aria-hidden />
          {messages.inspire.gemNote}
        </p>
      </div>
    </section>
  )
}
