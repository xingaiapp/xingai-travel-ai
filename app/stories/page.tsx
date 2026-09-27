import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { StoriesIndexView } from "@/components/story-view"
import { visibleEpisodes, visibleSeasons } from "@/lib/stories"

export const metadata: Metadata = {
  title: "Travel Stories",
  description: "First-hand travel stories with honest takeaways — then decide whether the destination fits your own trip.",
  alternates: { canonical: "/stories" },
}

export default function StoriesPage() {
  const seasons = visibleSeasons()
  if (seasons.length === 0) notFound()
  return <StoriesIndexView seasons={seasons.map((season) => ({ season, count: visibleEpisodes(season).length }))} />
}
