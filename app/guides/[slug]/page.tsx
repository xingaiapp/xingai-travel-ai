import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { GuideDetailView } from "@/components/content-pages"
import { getGuide, guides } from "@/lib/content"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return guides.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = getGuide(slug)
  if (!page) return { title: "Guide" }
  return {
    title: page.title.en,
    description: page.oneLiner.en,
    alternates: { canonical: `/guides/${slug}` },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  if (!getGuide(slug)) notFound()
  return <GuideDetailView slug={slug} />
}
