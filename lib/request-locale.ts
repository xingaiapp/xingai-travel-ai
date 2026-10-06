import { headers } from "next/headers"
import { isPublicLocale, type PublicLocale } from "@/lib/public-locale"

/** Locale middleware wrote onto the rewritten request. Missing header means English. */
export async function requestLocale(): Promise<PublicLocale> {
  const h = await headers()
  const raw = h.get("x-xingai-locale")
  return isPublicLocale(raw) ? raw : "en"
}
