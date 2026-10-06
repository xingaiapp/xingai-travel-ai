import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { pageMetaForStaticPath } from "@/lib/seo-meta"

export async function generateMetadata(): Promise<Metadata> {
  return pageMetaForStaticPath("/disclaimer")
}

export default function Page() {
  return <LegalPage kind="disclaimer" />
}
