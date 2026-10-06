import type { Metadata } from "next"
import { FaqView } from "@/components/content-pages"
import { pageMetaForStaticPath } from "@/lib/seo-meta"
import { faqPageJsonLdHtml } from "@/lib/seo-json-ld"
import { requestLocale } from "@/lib/request-locale"

export async function generateMetadata(): Promise<Metadata> {
  return pageMetaForStaticPath("/faq")
}

export default async function Page() {
  const locale = await requestLocale()
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqPageJsonLdHtml(locale) }} />
      <FaqView />
    </>
  )
}
