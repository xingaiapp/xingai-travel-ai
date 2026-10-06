import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { GuideDetailView } from "@/components/content-pages"
import { pickLocalized } from "@/lib/content/types"
import { getGuide, guides } from "@/lib/content"
import { requestLocale } from "@/lib/request-locale"
import { pageMeta } from "@/lib/seo-meta"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return guides.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = getGuide(slug)
  if (!page) return { title: "Guide" }
  const locale = await requestLocale()
  return pageMeta({
    path: `/guides/${slug}`,
    title: pickLocalized(page.title, locale),
    description: pickLocalized(page.oneLiner, locale),
    locale,
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  if (!getGuide(slug)) notFound()
  return <GuideDetailView slug={slug} />
}
