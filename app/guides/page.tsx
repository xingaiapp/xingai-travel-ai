import type { Metadata } from "next"
import { GuidesIndexView } from "@/components/content-pages"
import { pageMeta } from "@/lib/seo-meta"

export const metadata: Metadata = pageMeta({
  path: "/guides",
  title: "Travel decision guides",
  description:
    "Where to travel in November, warm destinations, walkable cities, trips under $2,000, and food cities — then decide on XingAI Travel.",
})

export default function Page() {
  return <GuidesIndexView />
}
