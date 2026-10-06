import type { Metadata } from "next"
import { GuidesIndexView } from "@/components/content-pages"
import { pageMetaForStaticPath } from "@/lib/seo-meta"

export async function generateMetadata(): Promise<Metadata> {
  return pageMetaForStaticPath("/guides")
}

export default function Page() {
  return <GuidesIndexView />
}
