import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CityPage } from "@/components/city/city-page"
import { cities, getCity } from "@/lib/cities"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCity((await params).slug)
  if (!city) return {}
  const title = `First time in ${city.name.en}? Places and 3 ways to spend the day`
  const description = `${city.places.length} places worth knowing and ${city.routes.length} reference routes for a first visit to ${city.name.en}, each with why, who it suits and trade-offs. Every fact is sourced.`
  const image = `${city.hero.src}-1600.webp`
  return {
    title,
    description,
    alternates: { canonical: `/city/${city.slug}` },
    openGraph: { title, description, type: "website", images: [image] },
  }
}

export default async function CityRoute({ params }: Props) {
  const city = getCity((await params).slug)
  if (!city) notFound()
  return <CityPage city={city} />
}
