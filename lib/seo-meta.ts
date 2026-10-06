import type { Metadata } from "next"
import { DEFAULT_OG_JPG } from "@/lib/cities/share-image"
import {
  alternatesFor,
  openGraphLocale,
  type PublicLocale,
} from "@/lib/public-locale"
import { staticPageMetaCopy } from "@/lib/seo-page-copy"

const DEFAULT_IMAGE = {
  url: DEFAULT_OG_JPG,
  alt: "Traveler overlooking Victoria Harbour at sunset",
} as const

const SITE = process.env.NEXT_PUBLIC_APP_URL ?? "https://travel.xingai.app"

type PageMetaInput = {
  /** Bare path without locale prefix, e.g. `/city` or `/city/tokyo`. */
  path: string
  title: string
  description: string
  /** When true, skip the root `· XingAI Travel` title template. */
  absoluteTitle?: boolean
  images?: { url: string; alt?: string }[]
  type?: "website" | "article"
  publishedTime?: string
  locale: PublicLocale
}

/** Shared Metadata for indexable pages: locale-aware canonical + hreflang + OG/Twitter. */
export function pageMeta({
  path,
  title,
  description,
  absoluteTitle = false,
  images = [DEFAULT_IMAGE],
  type = "website",
  publishedTime,
  locale,
}: PageMetaInput): Metadata {
  const bare = path.startsWith("/") ? path : `/${path}`
  const alt = alternatesFor(SITE, bare, locale)
  const ogImages = images.map((image) =>
    image.alt ? { url: image.url, alt: image.alt } : { url: image.url }
  )
  const imageUrls = images.map((image) => image.url)

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: alt,
    openGraph: {
      title,
      description,
      url: alt.canonical,
      locale: openGraphLocale(locale),
      type,
      images: ogImages,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrls,
    },
  }
}

/** Indexable static routes: title/description from the `[locale]` segment. */
export function pageMetaForStaticPath(path: string, locale: PublicLocale): Metadata {
  const copy = staticPageMetaCopy(path, locale)
  if (!copy) {
    throw new Error(`Missing STATIC_PAGE_COPY for ${path}`)
  }
  return pageMeta({
    path,
    title: copy.title,
    description: copy.description,
    absoluteTitle: copy.absoluteTitle,
    locale,
  })
}
