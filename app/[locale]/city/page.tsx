import type { Metadata } from "next"
import { CitiesIndexView } from "@/components/city/cities-index"
import { localeFromParams } from "@/lib/locale-params"
import { pageMetaForStaticPath } from "@/lib/seo-meta"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params)
  return pageMetaForStaticPath("/city", locale)
}

/** Static SSR of the full directory (best for crawlers). Filters sync from the URL on the client. */
export default function CityIndexPage() {
  return <CitiesIndexView region="all" intent="all" />
}
