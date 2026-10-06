import type { Metadata } from "next"
import { Suspense } from "react"
import { CitiesIndexView } from "@/components/city/cities-index"

export const metadata: Metadata = {
  title: "City guides",
  description:
    "Browse XingAI Travel city guides — Hong Kong, Tokyo, Seoul, Taipei, Macau, Singapore, Los Cabos, Shanghai, Lisbon, Barcelona, Xi'an, and more. Each live guide lists sourced places and three day routes.",
  alternates: { canonical: "/city" },
  openGraph: {
    title: "City guides · XingAI Travel",
    description:
      "Search and filter first-visit city guides with sourced places and three reference day routes.",
  },
}

export default function CityIndexPage() {
  return (
    <Suspense fallback={<main className="flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-10" />}>
      <CitiesIndexView />
    </Suspense>
  )
}
