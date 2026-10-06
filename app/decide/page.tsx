import type { Metadata } from "next"
import { DecidePage } from "@/components/decide-page"
import { decideJsonLdHtml } from "@/lib/seo-json-ld"
import { pageMeta } from "@/lib/seo-meta"

const title = "Decide your trip · XingAI Travel"
const description =
  "Describe your real constraints, compare destinations with honest trade-offs, then open partner search links to book the key pieces."

export const metadata: Metadata = pageMeta({
  path: "/decide",
  title,
  description,
  absoluteTitle: true,
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: decideJsonLdHtml }} />
      <DecidePage />
    </>
  )
}
