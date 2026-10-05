import type { Metadata } from "next"
import { SharedTripView } from "@/components/shared-trip-view"
import { decodeSharedTrip } from "@/lib/share-codec"

type Props = { searchParams: Promise<{ d?: string | string[] }> }

function param(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const d = param((await searchParams).d)
  const trip = await decodeSharedTrip(d)
  // Shared links are personal results: preview cards yes, search index no.
  const robots = { index: false, follow: true }
  if (!trip) return { title: "Shared trip plan", robots }
  const winner = trip.c.destinations.find((x) => x.isWinner) ?? trip.c.destinations[0]
  const title = `${winner.name}, ${winner.country}`
  const description = `${winner.whyWins.slice(0, 2).join(" · ")}`.slice(0, 180) || "Trip plan from XingAI Travel"
  const image = `/api/og?d=${d}`
  return {
    title,
    description,
    robots,
    alternates: { canonical: "/decide" },
    openGraph: { title, description, type: "article", images: [{ url: image, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  }
}

export default async function SharedTripPage({ searchParams }: Props) {
  const trip = await decodeSharedTrip(param((await searchParams).d))
  return <SharedTripView trip={trip} />
}
