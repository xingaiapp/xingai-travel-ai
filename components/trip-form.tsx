"use client"

import { CalendarDays, ChevronDown, DollarSign, MapPin, Plane, UsersRound } from "lucide-react"
import type { TripContext } from "@/lib/types"
import { useLocale } from "@/components/locale-provider"
import { cn } from "@/lib/utils"

interface TripFormProps {
  value: TripContext
  onChange: (value: TripContext) => void
}

function FieldShell({
  icon: Icon,
  label,
  children,
}: Readonly<{
  icon: typeof CalendarDays
  label: string
  children: React.ReactNode
}>) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-2 text-xs font-bold text-foreground">
        <Icon className="h-4 w-4 text-primary" aria-hidden />
        {label}
      </span>
      {children}
    </label>
  )
}

const inputClass =
  "h-11 w-full rounded-xl border border-input bg-background px-3 text-sm font-medium outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"

export function TripForm({ value, onChange }: TripFormProps) {
  const { messages } = useLocale()

  function patch(next: Partial<TripContext>) {
    onChange({ ...value, ...next })
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Plane className="h-4 w-4" aria-hidden />
        </span>
        <h2 className="text-base font-extrabold">1 · {messages.form.title}</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldShell icon={CalendarDays} label={messages.form.dates}>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <input
              className={inputClass}
              type="date"
              value={value.dates.from}
              onChange={(event) => patch({ dates: { ...value.dates, from: event.target.value } })}
            />
            <span className="text-muted-foreground">-</span>
            <input
              className={inputClass}
              type="date"
              value={value.dates.to}
              onChange={(event) => patch({ dates: { ...value.dates, to: event.target.value } })}
            />
          </div>
        </FieldShell>

        <FieldShell icon={MapPin} label={messages.form.from}>
          <input
            className={inputClass}
            value={value.origin}
            onChange={(event) => patch({ origin: event.target.value })}
            placeholder="San Francisco (SFO)"
          />
        </FieldShell>

        <FieldShell icon={DollarSign} label={messages.form.budget}>
          <div className="grid grid-cols-[1fr_5.25rem] gap-2">
            <input
              className={inputClass}
              type="number"
              min={0}
              value={value.budget.amount}
              onChange={(event) => patch({ budget: { ...value.budget, amount: Number(event.target.value) } })}
            />
            <select
              className={cn(inputClass, "appearance-none")}
              value={value.budget.currency}
              onChange={(event) => patch({ budget: { ...value.budget, currency: event.target.value } })}
            >
              <option>USD</option>
              <option>CAD</option>
              <option>EUR</option>
              <option>CNY</option>
            </select>
          </div>
        </FieldShell>

        <FieldShell icon={UsersRound} label={messages.form.travelers}>
          <div className="grid grid-cols-[5rem_1fr] gap-2">
            <input
              className={inputClass}
              type="number"
              min={1}
              value={value.travelers.count}
              onChange={(event) => patch({ travelers: { ...value.travelers, count: Number(event.target.value) } })}
            />
            <select
              className={cn(inputClass, "appearance-none")}
              value={value.travelers.type}
              onChange={(event) =>
                patch({ travelers: { ...value.travelers, type: event.target.value as TripContext["travelers"]["type"] } })
              }
            >
              <option value="solo">Solo</option>
              <option value="couple">Couple</option>
              <option value="family">Family</option>
              <option value="group">Group</option>
            </select>
          </div>
        </FieldShell>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-bold text-foreground">{messages.form.notes}</span>
          <textarea
            className="min-h-20 w-full resize-none rounded-xl border border-input bg-background px-3 py-3 text-sm font-medium outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
            value={value.notes ?? ""}
            onChange={(event) => patch({ notes: event.target.value })}
            placeholder="Warm weather, walkable cities, great food, minimal driving."
          />
        </label>

        <details className="group sm:col-span-2">
          <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-bold text-primary">
            {messages.form.advanced}
            <ChevronDown className="h-4 w-4 transition group-open:rotate-180" aria-hidden />
          </summary>
          <label className="mt-3 block">
            <span className="mb-1.5 block text-xs font-bold text-foreground">{messages.form.avoid}</span>
            <input
              className={inputClass}
              value={value.avoid ?? ""}
              onChange={(event) => patch({ avoid: event.target.value })}
              placeholder="Long flights, extreme heat, heavy crowds"
            />
          </label>
        </details>
      </div>
    </section>
  )
}
