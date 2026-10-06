import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { pageMeta } from "@/lib/seo-meta"

export async function generateMetadata(): Promise<Metadata> {
  return pageMeta({
  path: "/privacy",
  title: "Privacy Policy",
  description: "What XingAI Travel collects and processes: trip inputs, OpenAI generation, IP rate limits, analytics, browser storage, and share links.",
})
}

export default function Page() {
  return <LegalPage kind="privacy" />
}
