import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { pageMeta } from "@/lib/seo-meta"

export async function generateMetadata(): Promise<Metadata> {
  return pageMeta({
  path: "/terms",
  title: "Terms of Use",
  description: "Terms of use for XingAI Travel — suggestions only; you stay responsible for booking and travel decisions.",
})
}

export default function Page() {
  return <LegalPage kind="terms" />
}
