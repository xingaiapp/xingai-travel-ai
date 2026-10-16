import type { Metadata } from "next"
import { HomeLanding } from "@/components/home-landing"
import { homeJsonLdHtml } from "@/lib/content/home-landing"
import { localeFromParams } from "@/lib/locale-params"
import { pageMetaForStaticPath } from "@/lib/seo-meta"
import { getLatestVideos } from "@/lib/youtube-latest"

/** Refresh the "Latest from the channel" section with the page (ISR). */
export const revalidate = 1800

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params)
  return pageMetaForStaticPath("/", locale)
}

export default async function Page() {
  const latestVideos = await getLatestVideos(3)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: homeJsonLdHtml }} />
      <HomeLanding latestVideos={latestVideos} />
    </>
  )
}
