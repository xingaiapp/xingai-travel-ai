import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SeasonView } from "@/components/story-view"
import { toShareJpeg } from "@/lib/cities/share-image"
import { localeFromParams } from "@/lib/locale-params"
import { pageMeta } from "@/lib/seo-meta"
import {
  getSeason,
  pickText,
  publishedEpisodes,
  visibleEpisodes,
  visibleSeasons,
} from "@/lib/stories"

type Props = { params: Promise<{ locale: string; season: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return visibleSeasons().map((season) => ({ season: season.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params)
  const season = getSeason((await params).season)
  if (!season) return {}
  const titleText = pickText(season.title, locale)
  const subtitle = pickText(season.subtitle, locale)
  const title = `${titleText} — ${subtitle}`
  const intro = pickText(season.intro, locale)
  const description = intro.length > 160 ? `${intro.slice(0, 157).trimEnd()}…` : intro
  const image = season.cover.src ? toShareJpeg(season.cover.src) : undefined
  return {
    ...pageMeta({
      path: `/stories/${season.slug}`,
      title,
      description,
      images: image ? [{ url: image, alt: titleText }] : undefined,
      locale,
    }),
    robots: publishedEpisodes(season).length > 0 ? undefined : { index: false, follow: false },
  }
}

export default async function SeasonPage({ params }: Props) {
  const season = getSeason((await params).season)
  if (!season || visibleEpisodes(season).length === 0) notFound()
  return <SeasonView season={season} linkable={visibleEpisodes(season).map((episode) => episode.slug)} />
}
