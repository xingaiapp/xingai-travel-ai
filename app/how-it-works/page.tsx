import type { Metadata } from "next"
import { HowItWorksView } from "@/components/content-pages"
import { pageMetaForStaticPath } from "@/lib/seo-meta"
import { howToJsonLdHtml } from "@/lib/seo-json-ld"
import { requestLocale } from "@/lib/request-locale"

export async function generateMetadata(): Promise<Metadata> {
  return pageMetaForStaticPath("/how-it-works")
}

export default async function Page() {
  const locale = await requestLocale()
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: howToJsonLdHtml(locale) }} />
      <HowItWorksView />
    </>
  )
}
