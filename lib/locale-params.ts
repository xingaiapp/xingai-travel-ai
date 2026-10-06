import { notFound } from "next/navigation"
import { isPublicLocale, type PublicLocale } from "@/lib/public-locale"

/** Resolve and validate the `[locale]` route param (no `headers()`). */
export async function localeFromParams(params: Promise<{ locale: string }>): Promise<PublicLocale> {
  const { locale } = await params
  if (!isPublicLocale(locale)) notFound()
  return locale
}
