import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { EpisodeView } from "@/components/story-view"
import { pageMeta } from "@/lib/seo-meta"
import { toShareJpeg } from "@/lib/cities/share-image"
import { storyArticleJsonLdHtml } from "@/lib/seo-json-ld"
import { getEpisode, getSeason, isVisible, visibleEpisodes, visibleSeasons } from "@/lib/stories"

type Props = { params: Promise<{ season: string; episode: string }> }

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
  // Keep document title under ~70 chars (template adds " · XingAI Travel").
  const title = episode.title.en
  const image = episode.cover.src ? toShareJpeg(episode.cover.src) : undefined
  return {
    ...(await pageMeta({
      path: `/stories/${season.slug}/${episode.slug}`,
      title,
      description: episode.dek.en,
      type: "article",
      publishedTime: episode.publishedAt,
      images: image ? [{ url: image, alt: episode.title.en }] : undefined,
    })),
    robots: episode.status === "published" ? undefined : { index: false, follow: false },
  }
}

export default async function EpisodePage({ params }: Props) {
  const found = await load(params)
  if (!found) notFound()
  const { season, episode } = found
  const imagePath = episode.cover.src ? toShareJpeg(episode.cover.src) : undefined
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: storyArticleJsonLdHtml({
            seasonSlug: season.slug,
            episodeSlug: episode.slug,
            title: episode.title.en,
            description: episode.dek.en,
            publishedAt: episode.publishedAt,
            imagePath,
          }),
        }}
      />
      <EpisodeView season={season} episode={episode} linkable={visibleEpisodes(season).map((item) => item.slug)} />
    </>
  )
}
