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
  const image = /\.(webp|jpe?g|png)$/i.test(city.hero.src) ? city.hero.src : `${city.hero.src}-1600.webp`
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
