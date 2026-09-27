import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SeasonView } from "@/components/story-view"
import { getSeason, publishedEpisodes, visibleEpisodes, visibleSeasons } from "@/lib/stories"

type Props = { params: Promise<{ season: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return visibleSeasons().map((season) => ({ season: season.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const season = getSeason((await params).season)
  if (!season) return {}
  const title = `${season.title.en} — ${season.subtitle.en}`
  const image = season.cover.src ? `${season.cover.src}-1600.webp` : undefined
  return {
    title,
    description: season.intro.en,
    alternates: { canonical: `/stories/${season.slug}` },
    robots: publishedEpisodes(season).length > 0 ? undefined : { index: false, follow: false },
    openGraph: { title, description: season.intro.en, type: "website", images: image ? [image] : undefined },
  }
}

export default async function SeasonPage({ params }: Props) {
  const season = getSeason((await params).season)
  if (!season || visibleEpisodes(season).length === 0) notFound()
  return <SeasonView season={season} linkable={visibleEpisodes(season).map((episode) => episode.slug)} />
}
