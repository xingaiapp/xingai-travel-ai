import type { Metadata } from "next"
import { GuidesIndexView } from "@/components/content-pages"

export const metadata: Metadata = {
  title: "Travel decision guides",
  description: "Where to travel in November, warm destinations, walkable cities, trips under $2,000, and food cities — then decide on XingAI Travel.",
  alternates: { canonical: "/guides" },
}

export default function Page() {
  return <GuidesIndexView />
}
