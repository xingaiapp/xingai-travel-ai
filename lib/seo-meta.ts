import type { Metadata } from "next"
import { DEFAULT_OG_JPG } from "@/lib/cities/share-image"

const DEFAULT_IMAGE = {
  url: DEFAULT_OG_JPG,
  alt: "Traveler overlooking Victoria Harbour at sunset",
} as const

type PageMetaInput = {
  /** Path without origin, e.g. `/city` or `/city/tokyo`. */
  path: string
  title: string
  description: string
  /** When true, skip the root `· XingAI Travel` title template. */
  absoluteTitle?: boolean
  images?: { url: string; alt?: string }[]
  type?: "website" | "article"
  publishedTime?: string
}

/** Shared Metadata for indexable pages: self-canonical + matching OG/Twitter. */
export function pageMeta({
  path,
  title,
  description,
  absoluteTitle = false,
  images = [DEFAULT_IMAGE],
  type = "website",
  publishedTime,
}: PageMetaInput): Metadata {
  const url = path.startsWith("/") ? path : `/${path}`
  const ogImages = images.map((image) =>
    image.alt ? { url: image.url, alt: image.alt } : { url: image.url }
  )
  const imageUrls = images.map((image) => image.url)

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
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
