import type { Metadata } from "next"
import { DecidePage } from "@/components/decide-page"
import { decideJsonLdHtml } from "@/lib/seo-json-ld"
import { pageMetaForStaticPath } from "@/lib/seo-meta"
import { requestLocale } from "@/lib/request-locale"

export async function generateMetadata(): Promise<Metadata> {
  return pageMetaForStaticPath("/decide")
}

export default async function Page() {
  const locale = await requestLocale()
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: decideJsonLdHtml(locale) }} />
      <DecidePage />
    </>
  )
}
