import type { Metadata } from "next"
import { CitiesIndexView, parseIntent, parseRegion } from "@/components/city/cities-index"
import { pageMeta } from "@/lib/seo-meta"

export const metadata: Metadata = pageMeta({
  path: "/city",
  title: "City guides",
  description:
    "First-visit city guides with sourced places and three day routes — Hong Kong, Tokyo, Seoul, Taipei, Macau, Singapore, Los Cabos, Shanghai, Lisbon, Barcelona, and Xi'an.",
})

type Props = {
  searchParams: Promise<{ region?: string; intent?: string }>
}

export default async function CityIndexPage({ searchParams }: Props) {
  const sp = await searchParams
  return <CitiesIndexView region={parseRegion(sp.region)} intent={parseIntent(sp.intent)} />
}
