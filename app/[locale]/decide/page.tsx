import type { Metadata } from "next"
import { DecidePage } from "@/components/decide-page"
import { decideJsonLdHtml } from "@/lib/seo-json-ld"
import { localeFromParams } from "@/lib/locale-params"
import { pageMetaForStaticPath } from "@/lib/seo-meta"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params)
  return pageMetaForStaticPath("/decide", locale)
}

export default async function Page({ params }: Props) {
  const locale = await localeFromParams(params)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: decideJsonLdHtml(locale) }} />
      <DecidePage />
    </>
  )
}
