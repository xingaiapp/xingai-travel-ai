import type { Metadata } from "next"
import { HowItWorksView } from "@/components/content-pages"
import { pageMeta } from "@/lib/seo-meta"
import { howToJsonLdHtml } from "@/lib/seo-json-ld"

export async function generateMetadata(): Promise<Metadata> {
  return pageMeta({
  path: "/how-it-works",
  title: "How XingAI Travel chooses your destination",
  description:
    "How the Travel Decision System works: constraints, comparison, one winner, two alternatives, trade-offs, evidence, then booking links.",
})
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: howToJsonLdHtml() }} />
      <HowItWorksView />
    </>
  )
}
