import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "Affiliate disclosure for XingAI Travel AI: decision quality first, affiliate links after the decision.",
}

export default function Page() {
  return <LegalPage kind="affiliate" />
}
