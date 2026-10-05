import type { Metadata } from "next"
import { DecidePage } from "@/components/decide-page"

export const metadata: Metadata = {
  title: "Decide your trip",
  description:
    "Describe your real constraints, compare destinations with honest trade-offs, then open partner search links to book the key pieces.",
  alternates: { canonical: "/decide" },
}

export default function Page() {
  return <DecidePage />
}
