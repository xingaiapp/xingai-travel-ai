import type { Metadata } from "next"
import { HowItWorksView } from "@/components/content-pages"

export const metadata: Metadata = {
  title: "How XingAI Travel chooses your destination",
  description:
    "How the Travel Decision System works: constraints, comparison, one winner, two alternatives, trade-offs, evidence, then booking links.",
  alternates: { canonical: "/how-it-works" },
}

export default function Page() {
  return <HowItWorksView />
}
