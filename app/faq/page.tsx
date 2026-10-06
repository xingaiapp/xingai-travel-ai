import type { Metadata } from "next"
import { FaqView } from "@/components/content-pages"
import { pageMeta } from "@/lib/seo-meta"
import { faqPageJsonLdHtml } from "@/lib/seo-json-ld"

export async function generateMetadata(): Promise<Metadata> {
  return pageMeta({
  path: "/faq",
  title: "FAQ — Travel Decision System",
  description:
    "Answers about XingAI Travel: how destinations are chosen, affiliate links, November travel, and verifying plans before booking.",
})
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqPageJsonLdHtml() }} />
      <FaqView />
    </>
  )
}
