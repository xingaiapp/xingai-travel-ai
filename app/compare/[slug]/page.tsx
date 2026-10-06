import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CompareDetailView } from "@/components/content-pages"
import { pickLocalized } from "@/lib/content/types"
import { compares, getCompare } from "@/lib/content/compares"
import { requestLocale } from "@/lib/request-locale"
import { pageMeta } from "@/lib/seo-meta"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return compares.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = getCompare(slug)
  if (!page) return { title: "Compare" }
  const locale = await requestLocale()
  return pageMeta({
    path: `/compare/${slug}`,
    title: pickLocalized(page.title, locale),
    description: pickLocalized(page.oneLiner, locale),
    locale,
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  if (!getCompare(slug)) notFound()
  return <CompareDetailView slug={slug} />
}
