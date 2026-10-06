import type { Metadata } from "next"
import { FaqView } from "@/components/content-pages"
import { localeFromParams } from "@/lib/locale-params"
import { pageMetaForStaticPath } from "@/lib/seo-meta"
import { faqPageJsonLdHtml } from "@/lib/seo-json-ld"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params)
  return pageMetaForStaticPath("/faq", locale)
}

export default async function Page({ params }: Props) {
  const locale = await localeFromParams(params)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqPageJsonLdHtml(locale) }} />
      <FaqView />
    </>
  )
}
