import type { Metadata } from "next"
import { PrayerForYouView } from "@/components/prayer-for-you-view"
import { localeFromParams } from "@/lib/locale-params"
import { pageMetaForStaticPath } from "@/lib/seo-meta"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params)
  return pageMetaForStaticPath("/prayer/for-you", locale)
}

export default function Page() {
  return <PrayerForYouView />
}
