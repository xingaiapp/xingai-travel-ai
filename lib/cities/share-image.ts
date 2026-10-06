/**
 * City hero / card image URL helpers.
 * Story-style local bases get `-1600.webp`; http(s) and already-suffixed files stay intact.
 * OG for remote Unsplash heroes uses a first-party PNG (WeChat + no query-string mangling).
 */

const FIRST_PARTY_OG = "/assets/hero-travel-decision.png"

/** Resolve a display src for directory cards and page heroes. */
export function resolveCityImageSrc(src: string): string {
  if (/^https?:\/\//i.test(src)) return src
  if (/\.(webp|jpe?g|png)(\?|$)/i.test(src)) return src
  return `${src}-1600.webp`
}

/**
 * Open Graph / Twitter image for a city page.
 * Remote Unsplash (and similar) URLs must not get `-1600.webp` appended — that corrupts
 * query strings (`…fit=crop-1600.webp`). Prefer a first-party PNG for share previews.
 */
export function cityOgImage(heroSrc: string): string {
  if (/^https?:\/\//i.test(heroSrc)) return FIRST_PARTY_OG
  return resolveCityImageSrc(heroSrc)
}
