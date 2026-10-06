import type { Metadata } from "next"
import { HomeLanding } from "@/components/home-landing"
import { homeJsonLdHtml } from "@/lib/content/home-landing"
import { localeFromParams } from "@/lib/locale-params"
import { pageMetaForStaticPath } from "@/lib/seo-meta"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params)
  return pageMetaForStaticPath("/", locale)
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: homeJsonLdHtml }} />
      <HomeLanding />
    </>
  )
}
