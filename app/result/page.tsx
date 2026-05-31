import type { Metadata } from "next"
import { ResultPage } from "@/components/result-page"

export const metadata: Metadata = {
  title: "Your travel decision",
  description: "See the best-fit destination, comparison, book-first checklist, and itinerary.",
}

export default function Page() {
  return <ResultPage />
}
