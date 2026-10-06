import type { Metadata } from "next"
import { CitiesIndexView } from "@/components/city/cities-index"
import { pageMetaForStaticPath } from "@/lib/seo-meta"

export async function generateMetadata(): Promise<Metadata> {
  return pageMetaForStaticPath("/city")
}

/** Static SSR of the full directory (best for crawlers). Filters sync from the URL on the client. */
export default function CityIndexPage() {
  return <CitiesIndexView region="all" intent="all" />
}
