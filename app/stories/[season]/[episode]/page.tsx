import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { EpisodeView } from "@/components/story-view"
import { pageMeta } from "@/lib/seo-meta"
import { toShareJpeg } from "@/lib/cities/share-image"
import { absoluteLocalized } from "@/lib/public-locale"
import { requestLocale } from "@/lib/request-locale"
import { storyArticleJsonLdHtml } from "@/lib/seo-json-ld"
import { schemaInLanguage } from "@/lib/seo-page-copy"
import {
  getEpisode,
  getSeason,
  isVisible,
  pickText,
  visibleEpisodes,
  visibleSeasons,
} from "@/lib/stories"

type Props = { params: Promise<{ season: string; episode: string }> }

const SITE = "https://travel.xingai.app"

export const dynamicParams = false

export function generateStaticParams() {
  return visibleSeasons().flatMap((season) =>
    visibleEpisodes(season).map((episode) => ({ season: season.slug, episode: episode.slug }))
  )
}

async function load(params: Props["params"]) {
  const { season: seasonSlug, episode: episodeSlug } = await params
  const season = getSeason(seasonSlug)
  const episode = season && getEpisode(season, episodeSlug)
  return season && episode && isVisible(episode) ? { season, episode } : null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = await load(params)
  if (!found) return {}
  const { season, episode } = found
  const locale = await requestLocale()
  const title = pickText(episode.title, locale)
  const description = pickText(episode.dek, locale)
  const image = episode.cover.src ? toShareJpeg(episode.cover.src) : undefined
  return {
    ...(await pageMeta({
      path: `/stories/${season.slug}/${episode.slug}`,
      title,
      description,
      type: "article",
      publishedTime: episode.publishedAt,
      images: image ? [{ url: image, alt: title }] : undefined,
      locale,
    })),
    robots: episode.status === "published" ? undefined : { index: false, follow: false },
  }
}

export default async function EpisodePage({ params }: Props) {
  const found = await load(params)
  if (!found) notFound()
  const { season, episode } = found
  const locale = await requestLocale()
  const title = pickText(episode.title, locale)
  const description = pickText(episode.dek, locale)
  const imagePath = episode.cover.src ? toShareJpeg(episode.cover.src) : undefined
  const pageUrl = absoluteLocalized(SITE, locale, `/stories/${season.slug}/${episode.slug}`)
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: storyArticleJsonLdHtml({
            seasonSlug: season.slug,
            episodeSlug: episode.slug,
            title,
            description,
            publishedAt: episode.publishedAt,
            imagePath,
            inLanguage: schemaInLanguage(locale),
            pageUrl,
          }),
        }}
      />
      <EpisodeView season={season} episode={episode} linkable={visibleEpisodes(season).map((item) => item.slug)} />
    </>
  )
}
