import type { Metadata } from "next"
import { HomeLanding } from "@/components/home-landing"
import { homeJsonLdHtml } from "@/lib/content/home-landing"
import { pageMetaForStaticPath } from "@/lib/seo-meta"

export async function generateMetadata(): Promise<Metadata> {
  return pageMetaForStaticPath("/")
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: homeJsonLdHtml }} />
      <HomeLanding />
    </>
  )
}
