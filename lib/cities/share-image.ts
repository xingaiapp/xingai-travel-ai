/**
 * City hero / card image URL helpers.
 * Story-style local bases get `-1600.webp` for on-page display.
 * Open Graph / Twitter always prefer JPEG — many crawlers still mishandle webp.
 */

/** 2400×1260 JPEG share card (fallback for remote Unsplash heroes). */
export const DEFAULT_OG_JPG = "/assets/og-travel-decision-2400.jpg"

/** Resolve a display src for directory cards and page heroes. */
export function resolveCityImageSrc(src: string): string {
  if (/^https?:\/\//i.test(src)) return src
  if (/\.(webp|jpe?g|png)(\?|$)/i.test(src)) return src
  return `${src}-1600.webp`
}

/**
 * Stable `/assets/og/{stem}.jpg` path for a local webp/png (or story base without extension).
 * Remote http(s) URLs fall back to {@link DEFAULT_OG_JPG}.
 */
export function toShareJpeg(src: string): string {
  if (/^https?:\/\//i.test(src)) return DEFAULT_OG_JPG
  if (/\.jpe?g(\?|$)/i.test(src)) return src
  let key = src
  if (!/\.(webp|png|jpe?g)(\?|$)/i.test(key)) key = `${key}-1600.webp`
  const stem = key
    .replace(/^\//, "")
    .replace(/\.(webp|png)$/i, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  return `/assets/og/${stem}.jpg`
}

/**
 * Open Graph / Twitter image for a city page.
 * Remote Unsplash URLs must not get `-1600.webp` appended — that corrupts query strings.
 * Local heroes use generated JPEG crops under `/assets/og/`.
 */
export function cityOgImage(heroSrc: string): string {
  return toShareJpeg(heroSrc)
}
