import type { Metadata } from "next"
import { CitiesIndexView } from "@/components/city/cities-index"
import { pageMeta } from "@/lib/seo-meta"

export const metadata: Metadata = pageMeta({
  path: "/city",
  title: "City guides",
  description:
    "First-visit city guides with sourced places and three day routes: Hong Kong, Tokyo, Seoul, Taipei, Macau, Singapore, Los Cabos, Shanghai, Lisbon, Barcelona, Xi'an.",
})

/** Static SSR of the full directory (best for crawlers). Filters sync from the URL on the client. */
export default function CityIndexPage() {
  return <CitiesIndexView region="all" intent="all" />
}
