import type { Metadata } from "next"
import { HowItWorksView } from "@/components/content-pages"
import { pageMeta } from "@/lib/seo-meta"

export const metadata: Metadata = pageMeta({
  path: "/how-it-works",
  title: "How XingAI Travel chooses your destination",
  description:
    "How the Travel Decision System works: constraints, comparison, one winner, two alternatives, trade-offs, evidence, then booking links.",
})

export default function Page() {
  return <HowItWorksView />
}
