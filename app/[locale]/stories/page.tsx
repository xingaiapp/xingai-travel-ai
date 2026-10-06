import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { StoriesIndexView } from "@/components/story-view"
import { localeFromParams } from "@/lib/locale-params"
import { pageMetaForStaticPath } from "@/lib/seo-meta"
import { visibleEpisodes, visibleSeasons } from "@/lib/stories"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params)
  return pageMetaForStaticPath("/stories", locale)
}

export default function StoriesPage() {
  const seasons = visibleSeasons()
  if (seasons.length === 0) notFound()
  return <StoriesIndexView seasons={seasons.map((season) => ({ season, count: visibleEpisodes(season).length }))} />
}
