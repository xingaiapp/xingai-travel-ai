import type { Metadata } from "next"
import { HomeLanding } from "@/components/home-landing"
import { homeJsonLdHtml } from "@/lib/content/home-landing"
import { pageMeta } from "@/lib/seo-meta"

const title = "XingAI Travel — Make a better travel decision"
const description =
  "Compare trip options and trade-offs so you can decide. Other sites help you search. You stay in control. Suggestions only — verify before you book."

export async function generateMetadata(): Promise<Metadata> {
  return pageMeta({
  path: "/",
  title,
  description,
  absoluteTitle: true,
})
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: homeJsonLdHtml }} />
      <HomeLanding />
    </>
  )
}
