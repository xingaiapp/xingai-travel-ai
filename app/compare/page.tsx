import type { Metadata } from "next"
import { CompareIndexView } from "@/components/content-pages"
import { pageMeta } from "@/lib/seo-meta"

export const metadata: Metadata = pageMeta({
  path: "/compare",
  title: "Destination comparisons",
  description:
    "Tokyo vs Seoul, Hong Kong vs Tokyo, Lisbon vs Barcelona, and more — decision-first comparisons with clear verdicts.",
})

export default function Page() {
  return <CompareIndexView />
}
