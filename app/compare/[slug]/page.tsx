import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CompareDetailView } from "@/components/content-pages"
import { compares, getCompare } from "@/lib/content/compares"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return compares.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = getCompare(slug)
  if (!page) return { title: "Compare" }
  return {
    title: page.title.en,
    description: page.oneLiner.en,
    alternates: { canonical: `/compare/${slug}` },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  if (!getCompare(slug)) notFound()
  return <CompareDetailView slug={slug} />
}
