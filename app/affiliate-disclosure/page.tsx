import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { pageMeta } from "@/lib/seo-meta"

export const metadata: Metadata = pageMeta({
  path: "/affiliate-disclosure",
  title: "Affiliate Disclosure",
  description:
    "How XingAI Travel may earn from partner search links after a decision — affiliates never influence destination ranking.",
})

export default function Page() {
  return <LegalPage kind="affiliate" />
}
