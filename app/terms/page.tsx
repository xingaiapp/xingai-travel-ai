import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for XingAI Travel as a travel decision-support tool.",
  alternates: { canonical: "/terms" },
}

export default function Page() {
  return <LegalPage kind="terms" />
}
