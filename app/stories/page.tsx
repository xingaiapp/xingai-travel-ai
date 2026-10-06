import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { StoriesIndexView } from "@/components/story-view"
import { pageMetaForStaticPath } from "@/lib/seo-meta"
import { visibleEpisodes, visibleSeasons } from "@/lib/stories"

export async function generateMetadata(): Promise<Metadata> {
  return pageMetaForStaticPath("/stories")
}

export default function StoriesPage() {
  const seasons = visibleSeasons()
  if (seasons.length === 0) notFound()
  return <StoriesIndexView seasons={seasons.map((season) => ({ season, count: visibleEpisodes(season).length }))} />
}
