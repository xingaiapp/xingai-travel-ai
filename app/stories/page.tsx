import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { StoriesIndexView } from "@/components/story-view"
import { pageMeta } from "@/lib/seo-meta"
import { visibleEpisodes, visibleSeasons } from "@/lib/stories"

export const metadata: Metadata = pageMeta({
  path: "/stories",
  title: "Travel Stories",
  description:
    "First-hand Travel Stories from Hong Kong and Macau — honest takeaways from the publisher, then Decide whether the place fits your own trip. Not a user-submitted feed.",
})

export default function StoriesPage() {
  const seasons = visibleSeasons()
  if (seasons.length === 0) notFound()
  return <StoriesIndexView seasons={seasons.map((season) => ({ season, count: visibleEpisodes(season).length }))} />
}
