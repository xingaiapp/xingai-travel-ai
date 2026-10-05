import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Travel Disclaimer",
  description: "Travel disclaimer for prices, entry rules, AI limitations, and safety verification.",
  alternates: { canonical: "/disclaimer" },
}

export default function Page() {
  return <LegalPage kind="disclaimer" />
}
