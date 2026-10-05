import type { Metadata } from "next"
import { CompareIndexView } from "@/components/content-pages"

export const metadata: Metadata = {
  title: "Destination comparisons",
  description: "Tokyo vs Seoul, Hong Kong vs Tokyo, Lisbon vs Barcelona, and more — decision-first comparisons with clear verdicts.",
  alternates: { canonical: "/compare" },
}

export default function Page() {
  return <CompareIndexView />
}
