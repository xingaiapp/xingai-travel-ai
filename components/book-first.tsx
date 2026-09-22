"use client"

import { useMemo } from "react"
import { BedDouble, ExternalLink, MapPin, Plane } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import { buildAffiliateLinks, extractOriginCode, guessIata } from "@/lib/affiliate"
import type { PlanResult, TripContext } from "@/lib/types"

interface BookCardProps {
  platform: string
  label: string
  url: string
  note?: string
  badge?: string
  icon: React.ReactNode
  onClick?: () => void
}

function BookCard({ platform, label, url, note, badge, icon, onClick }: BookCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer sponsored nofollow"
      onClick={onClick}
      className="flex items-center gap-3 rounded-md border border-border bg-background p-3 transition hover:border-primary/40 hover:bg-primary/5 group"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{platform}{note ? ` · ${note}` : ""}</p>
      </div>
      {badge ? (
        <span className="shrink-0 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">{badge}</span>
      ) : null}
      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden />
    </a>
  )
}

function trackClick(platform: string, type: string, destination: string) {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ platform, type, destination }),
  }).catch(() => {})
}

interface BookFirstProps {
  plan: PlanResult
  /** Null on shared links: no origin or dates, so flights are skipped. */
  trip: TripContext | null
}

export function BookFirst({ plan, trip }: BookFirstProps) {
  const { messages } = useLocale()
  const winner = plan.destination

  const affiliateLinks = useMemo(() => {
    const originCode = trip ? extractOriginCode(trip.origin) : ""
    const destCode = guessIata(winner)
    return buildAffiliateLinks({
      originCode,
      destinationCity: winner.split(",")[0].trim(),
      destinationCode: destCode,
      dates: { checkIn: trip?.dates.from ?? "", checkOut: trip?.dates.to ?? "" },
    })
  }, [trip, winner])

  return (
    <div className="space-y-4">
      {trip ? (
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
          {messages.result.bookFlights}
        </p>
        <div className="space-y-2">
          {affiliateLinks.flights.map((link) => (
            <BookCard
              key={link.url}
              {...link}
              icon={<Plane className="h-4 w-4" />}
              onClick={() => trackClick(link.platform, "flight", winner)}
            />
          ))}
        </div>
      </div>
      ) : null}

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
          {messages.result.bookHotels}
        </p>
        <div className="space-y-2">
          {affiliateLinks.hotels.map((link) => (
            <BookCard
              key={link.url}
              {...link}
              icon={<BedDouble className="h-4 w-4" />}
              onClick={() => trackClick(link.platform, "hotel", winner)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
          {messages.result.bookActivities}
        </p>
        <div className="space-y-2">
          {affiliateLinks.activities.map((link) => (
            <BookCard
              key={link.url}
              {...link}
              icon={<MapPin className="h-4 w-4" />}
              onClick={() => trackClick(link.platform, "activity", winner)}
            />
          ))}
        </div>
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">
        {messages.result.affiliateDisclosure}
      </p>
    </div>
  )
}
