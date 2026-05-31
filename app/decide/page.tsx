import type { Metadata } from "next"
import { DecidePage } from "@/components/decide-page"

export const metadata: Metadata = {
  title: "Decide your trip",
  description:
    "Describe your real constraints, compare destinations with honest trade-offs, and get one trip you can actually book.",
}

export default function Page() {
  return <DecidePage />
}
