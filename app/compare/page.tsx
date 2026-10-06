import type { Metadata } from "next"
import { CompareIndexView } from "@/components/content-pages"
import { pageMetaForStaticPath } from "@/lib/seo-meta"

export async function generateMetadata(): Promise<Metadata> {
  return pageMetaForStaticPath("/compare")
}

export default function Page() {
  return <CompareIndexView />
}