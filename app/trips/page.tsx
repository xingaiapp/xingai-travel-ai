import type { Metadata } from "next"
import { TripsPage } from "@/components/trips-page"

export const metadata: Metadata = {
  title: "Your trips",
  description: "Recent travel decisions saved in this browser, ready to reopen.",
  // Per-browser content (localStorage), nothing to crawl — excluded from the sitemap like /result.
  robots: { index: false, follow: false },
}

export default function Page() {
  return <TripsPage />
}
