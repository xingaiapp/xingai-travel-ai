import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CompareDetailView } from "@/components/content-pages"
import { pickLocalized } from "@/lib/content/types"
import { compares, getCompare } from "@/lib/content/compares"
import { localeFromParams } from "@/lib/locale-params"
import { compareFaqJsonLdHtml } from "@/lib/seo-json-ld"
import { pageMeta } from "@/lib/seo-meta"

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return compares.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params)
  const { slug } = await params
  const page = getCompare(slug)
  if (!page) return { title: "Compare" }
  return pageMeta({
    path: `/compare/${slug}`,
    title: pickLocalized(page.title, locale),
    description: pickLocalized(page.oneLiner, locale),
    locale,
  })
}

export default async function Page({ params }: Props) {
  const locale = await localeFromParams(params)
  const { slug } = await params
  const page = getCompare(slug)
  if (!page) notFound()
  const faqLd = compareFaqJsonLdHtml(
    slug,
    locale,
    page.faq.map((item) => ({
      q: pickLocalized(item.q, locale),
      a: pickLocalized(item.a, locale),
    }))
  )
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />
      <CompareDetailView slug={slug} />
    </>
  )
}
