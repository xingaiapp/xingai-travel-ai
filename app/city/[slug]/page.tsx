import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CityPage } from "@/components/city/city-page"
import { cities, getCity } from "@/lib/cities"
import { pageMeta } from "@/lib/seo-meta"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCity((await params).slug)
  if (!city) return {}
  const title = `First time in ${city.name.en}?`
  const description = `${city.places.length} sourced places and ${city.routes.length} first-visit day routes for ${city.name.en} — with why, who it suits, and trade-offs.`
  const image = /\.(webp|jpe?g|png)$/i.test(city.hero.src) ? city.hero.src : `${city.hero.src}-1600.webp`
  return pageMeta({
    path: `/city/${city.slug}`,
    title,
    description,
    images: [{ url: image, alt: `${city.name.en} city guide` }],
  })
}

export default async function CityRoute({ params }: Props) {
  const city = getCity((await params).slug)
  if (!city) notFound()
  // Facts only: names, coordinates and the sources behind them. No ratings, hours or prices.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: city.name.en,
    description: city.intro.en,
    url: `https://travel.xingai.app/city/${city.slug}`,
    includesAttraction: city.places.map((place) => ({
      "@type": "TouristAttraction",
      name: place.name.en,
      description: place.summary.en,
      geo: { "@type": "GeoCoordinates", latitude: place.coordinates.lat, longitude: place.coordinates.lng },
      sameAs: place.sources.map((source) => source.url),
    })),
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <CityPage city={city} />
    </>
  )
}
