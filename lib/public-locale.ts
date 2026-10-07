/**
 * Public Travel URLs carry the language in the path (same pattern as Invest ADR-059).
 * English stays unprefixed. Session pages (/result, /trips, /s) do not.
 */

export const PUBLIC_LOCALES = ["en", "zh", "ko", "es"] as const
export type PublicLocale = (typeof PUBLIC_LOCALES)[number]

const INDEXABLE_PREFIXES = [
  "/decide",
  "/how-it-works",
  "/faq",
  "/city",
  "/compare",
  "/guides",
  "/stories",
  "/privacy",
  "/terms",
  "/disclaimer",
  "/affiliate-disclosure",
] as const

export function isPublicLocale(value: string | null | undefined): value is PublicLocale {
  return value === "en" || value === "zh" || value === "ko" || value === "es"
}

export function asPublicLocale(lang: string): PublicLocale {
  return isPublicLocale(lang) ? lang : "en"
}

/**
 * Path the page actually renders, plus the locale prefix if one was present.
 * `/en/…` is accepted too: the proxy rewrites bare English URLs to `/en/…`, and that is the
 * pathname `usePathname()` sees while English pages are prerendered. Treating it as bare keeps
 * the static HTML identical to the first client render (no hydration mismatch).
 */
export function stripLocalePrefix(pathname: string): { locale: PublicLocale; path: string } {
  const path = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname || "/"
  const match = path.match(/^\/(en|zh|ko|es)(?=\/|$)/)
  if (!match) return { locale: "en", path }
  const rest = path.slice(match[0].length) || "/"
  return { locale: match[1] as PublicLocale, path: rest }
}

export function isIndexablePublicPath(path: string): boolean {
  if (path === "/") return true
  return INDEXABLE_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))
}

/** Prefix zh/ko/es only on the public indexable set. Everything else stays put. */
export function localizedPublicHref(locale: PublicLocale, path: string): string {
  const bare = path.startsWith("/") ? path : `/${path}`
  if (!isIndexablePublicPath(bare)) return bare
  if (locale === "en") return bare
  if (bare === "/") return `/${locale}`
  return `/${locale}${bare}`
}

export function hreflangPaths(path: string): Record<string, string> {
  return {
    en: localizedPublicHref("en", path),
    "zh-CN": localizedPublicHref("zh", path),
    ko: localizedPublicHref("ko", path),
    es: localizedPublicHref("es", path),
    "x-default": localizedPublicHref("en", path),
  }
}

export function absoluteLocalized(site: string, locale: PublicLocale, path: string): string {
  return `${site.replace(/\/$/, "")}${localizedPublicHref(locale, path)}`
}

export function alternatesFor(site: string, path: string, locale: PublicLocale) {
  const languages: Record<string, string> = {}
  for (const [code, href] of Object.entries(hreflangPaths(path))) {
    languages[code] = `${site.replace(/\/$/, "")}${href}`
  }
  return {
    canonical: absoluteLocalized(site, locale, path),
    languages,
  }
}

export function openGraphLocale(locale: PublicLocale): "en_US" | "zh_CN" | "ko_KR" | "es_ES" {
  if (locale === "zh") return "zh_CN"
  if (locale === "ko") return "ko_KR"
  if (locale === "es") return "es_ES"
  return "en_US"
}

export function htmlLang(locale: PublicLocale): "en" | "zh-Hans" | "ko" | "es" {
  if (locale === "zh") return "zh-Hans"
  if (locale === "ko") return "ko"
  if (locale === "es") return "es"
  return "en"
}
