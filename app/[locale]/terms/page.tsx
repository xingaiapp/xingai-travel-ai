import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { localeFromParams } from "@/lib/locale-params"
import { pageMetaForStaticPath } from "@/lib/seo-meta"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params)
  return pageMetaForStaticPath("/terms", locale)
}

export default function Page() {
  return <LegalPage kind="terms" />
}
