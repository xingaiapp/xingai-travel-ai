import type { Metadata } from "next"
import { CitiesIndexView } from "@/components/city/cities-index"

export const metadata: Metadata = {
  title: "City guides",
  description:
    "Browse the XingAI Travel city directory — live first-visit guides for Hong Kong, Tokyo, Seoul, Taipei, and Los Cabos, plus more cities coming soon. Each live guide lists sourced places and three day routes.",
  alternates: { canonical: "/city" },
  openGraph: {
    title: "City guides · XingAI Travel",
    description:
      "Directory of city guides: open live guides or see what is coming next. Sourced places and three reference day routes when published.",
  },
}

export default function CityIndexPage() {
  return <CitiesIndexView />
}
