import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { pageMeta } from "@/lib/seo-meta"

export const metadata: Metadata = pageMeta({
  path: "/disclaimer",
  title: "Travel Disclaimer",
  description:
    "XingAI Travel provides suggestions and estimates, not professional advice. Verify prices, rules, and safety before you book.",
})

export default function Page() {
  return <LegalPage kind="disclaimer" />
}
