import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CityPage } from "@/components/city/city-page"
import { cities, getCity } from "@/lib/cities"
import { cityOgImage } from "@/lib/cities/share-image"
import { localeFromParams } from "@/lib/locale-params"
import { absoluteLocalized } from "@/lib/public-locale"
import { pageMeta } from "@/lib/seo-meta"
import { cityGuideMeta, schemaInLanguage } from "@/lib/seo-page-copy"

type Props = { params: Promise<{ locale: string; slug: string }> }

const SITE = "https://travel.xingai.app"

export const dynamicParams = false

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params)
  const city = getCity((await params).slug)
  if (!city) return {}
  const name = city.name[locale] || city.name.en
  const { title, description } = cityGuideMeta(name, city.places.length, city.routes.length, locale)
  const image = cityOgImage(city.hero.src)
  return pageMeta({
    path: `/city/${city.slug}`,
    title,
    description,
    images: [{ url: image, alt: `${name} city guide` }],
    locale,
  })
}

export default async function CityRoute({ params }: Props) {
  const locale = await localeFromParams(params)
  const city = getCity((await params).slug)
  if (!city) notFound()
  const url = absoluteLocalized(SITE, locale, `/city/${city.slug}`)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: city.name[locale] || city.name.en,
    description: city.intro[locale] || city.intro.en,
    url,
    inLanguage: schemaInLanguage(locale),
    includesAttraction: city.places.map((place) => ({
      "@type": "TouristAttraction",
      name: place.name[locale] || place.name.en,
      description: place.summary[locale] || place.summary.en,
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
