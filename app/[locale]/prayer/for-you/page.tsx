import type { Metadata } from "next"
import { PrayerForYouView } from "@/components/prayer-for-you-view"
import { prayerSituations } from "@/lib/content/prayer-for-you"
import { localeFromParams } from "@/lib/locale-params"
import { getPrayerFeedVideos } from "@/lib/prayer-for-you-feed"
import { buildPrayerPageData } from "@/lib/prayer-match"
import { pageMetaForStaticPath } from "@/lib/seo-meta"

/**
 * The page grows with the channel: every ISR refresh re-reads the public
 * feeds and files new "A Prayer For You" films into their situation cells
 * (see lib/prayer-match.ts). If the feeds are unreachable the page renders
 * the curated static cells alone — it must never break over YouTube.
 */
export const revalidate = 1800

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params)
  return pageMetaForStaticPath("/prayer/for-you", locale)
}

export default async function Page() {
  const feed = await getPrayerFeedVideos()
  const data = buildPrayerPageData(prayerSituations, feed)
  return <PrayerForYouView cells={data.cells} latest={data.latest} />
}
