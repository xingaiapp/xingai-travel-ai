import type { Metadata } from "next"
import { FaqView } from "@/components/content-pages"

export const metadata: Metadata = {
  title: "FAQ — Travel Decision System",
  description:
    "Answers about XingAI Travel: how destinations are chosen, affiliate links, November travel, and verifying plans before booking.",
  alternates: { canonical: "/faq" },
}

export default function Page() {
  return <FaqView />
}
