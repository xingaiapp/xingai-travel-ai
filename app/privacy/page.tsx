import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy principles for XingAI Travel AI, including trip context collection and user control.",
}

export default function Page() {
  return <LegalPage kind="privacy" />
}
