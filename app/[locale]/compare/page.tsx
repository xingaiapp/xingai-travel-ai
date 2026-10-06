import type { Metadata } from "next"
import { CompareIndexView } from "@/components/content-pages"
import { localeFromParams } from "@/lib/locale-params"
import { pageMetaForStaticPath } from "@/lib/seo-meta"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params)
  return pageMetaForStaticPath("/compare", locale)
}

export default function Page() {
  return <CompareIndexView />
}