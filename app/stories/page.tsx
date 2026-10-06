import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { StoriesIndexView } from "@/components/story-view"
import { pageMeta } from "@/lib/seo-meta"
import { visibleEpisodes, visibleSeasons } from "@/lib/stories"

export const metadata: Metadata = pageMeta({
  path: "/stories",
  title: "Travel Stories",
  description:
    "First-hand travel stories with honest takeaways — then decide whether the destination fits your own trip.",
})

export default function StoriesPage() {
  const seasons = visibleSeasons()
  if (seasons.length === 0) notFound()
  return <StoriesIndexView seasons={seasons.map((season) => ({ season, count: visibleEpisodes(season).length }))} />
}
