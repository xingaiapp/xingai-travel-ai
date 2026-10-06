"use client"

import { CalendarDays, ChevronDown, DollarSign, Globe2, MapPin, Plane, UsersRound } from "lucide-react"
import type { TripContext, TripRegion } from "@/lib/types"
import type { Messages } from "@/lib/i18n/types"
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
  "h-11 w-full rounded-md border border-input bg-background px-3 text-sm font-medium outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"

type TripFormMessages = Messages["form"]

const regionOptions: Array<{ value: TripRegion; labelKey: keyof TripFormMessages["regions"] }> = [
  { value: "anywhere", labelKey: "anywhere" },
  { value: "europe", labelKey: "europe" },
  { value: "asia", labelKey: "asia" },
  { value: "north_america", labelKey: "northAmerica" },
  { value: "latin_america", labelKey: "latinAmerica" },
  { value: "middle_east", labelKey: "middleEast" },
  { value: "africa", labelKey: "africa" },
  { value: "oceania", labelKey: "oceania" },
]

function regionLabelKey(region: TripRegion): keyof TripFormMessages["regions"] {
  return regionOptions.find((option) => option.value === region)?.labelKey ?? "anywhere"
}

export function TripForm({ value, onChange }: TripFormProps) {
  const { messages } = useLocale()

  function patch(next: Partial<TripContext>) {
    onChange({ ...value, ...next })
  }

  function changeRegion(region: TripRegion) {
    // Region examples stay in the placeholder only — never overwrite the field as a fake answer.
    patch({ region })
  }

  return (
    <section className="rounded-md border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
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
              min={new Date().toISOString().slice(0, 10)}
              value={value.dates.from}
              onChange={(event) => {
                const from = event.target.value
                const nights = value.dates.to
                  ? Math.max(1, Math.round((new Date(value.dates.to).getTime() - new Date(from).getTime()) / 86400000))
                  : value.dates.nights
                patch({ dates: { ...value.dates, from, nights } })
              }}
            />
            <span className="text-muted-foreground">-</span>
            <input
              className={inputClass}
              type="date"
              min={value.dates.from || new Date().toISOString().slice(0, 10)}
              value={value.dates.to}
              onChange={(event) => {
                const to = event.target.value
                const nights = value.dates.from
                  ? Math.max(1, Math.round((new Date(to).getTime() - new Date(value.dates.from).getTime()) / 86400000))
                  : value.dates.nights
                patch({ dates: { ...value.dates, to, nights } })
              }}
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

        <div className="sm:col-span-2">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-xs font-bold text-foreground">
              <Globe2 className="h-4 w-4 text-primary" aria-hidden />
              {messages.form.region}
            </span>
            <span className="text-xs text-muted-foreground">{messages.form.regionHint}</span>
          </div>
          <div className="relative sm:hidden">
            <select
              className={cn(inputClass, "appearance-none pr-10 font-bold")}
              value={value.region}
              onChange={(event) => changeRegion(event.target.value as TripRegion)}
              aria-label={messages.form.region}
            >
              {regionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {messages.form.regions[option.labelKey]}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          </div>
          <div className="hidden gap-2 sm:grid sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
            {regionOptions.map((option) => {
              const selected = value.region === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  className={cn(
                    "h-10 rounded-md border px-3 text-sm font-bold transition",
                    selected
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-input bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground",
                  )}
                  aria-pressed={selected}
                  onClick={() => changeRegion(option.value)}
                >
                  {messages.form.regions[option.labelKey]}
                </button>
              )
            })}
          </div>
        </div>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-bold text-foreground">{messages.form.placesInMind}</span>
          <input
            className={inputClass}
            value={value.placesInMind ?? ""}
            onChange={(event) => patch({ placesInMind: event.target.value })}
            placeholder={messages.form.regionExamples[regionLabelKey(value.region)] || messages.form.placesPlaceholder}
          />
        </label>

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
              <option>EUR</option>
              <option>GBP</option>
              <option>CAD</option>
              <option>AUD</option>
              <option>CNY</option>
              <option>JPY</option>
              <option>KRW</option>
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
              <option value="solo">{messages.travelers.solo}</option>
              <option value="couple">{messages.travelers.couple}</option>
              <option value="family">{messages.travelers.family}</option>
              <option value="group">{messages.travelers.group}</option>
            </select>
          </div>
        </FieldShell>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-bold text-foreground">{messages.form.notes}</span>
          <textarea
            className="min-h-20 w-full resize-none rounded-md border border-input bg-background px-3 py-3 text-sm font-medium outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
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
