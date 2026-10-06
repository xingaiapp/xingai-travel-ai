import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { pageMeta } from "@/lib/seo-meta"

export const metadata: Metadata = pageMeta({
  path: "/privacy",
  title: "Privacy Policy",
  description: "Privacy principles for XingAI Travel, including trip context collection and user control.",
})

export default function Page() {
  return <LegalPage kind="privacy" />
}
