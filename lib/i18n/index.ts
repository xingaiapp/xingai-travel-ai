import { en } from "@/lib/i18n/en"
import { es } from "@/lib/i18n/es"
import { ko } from "@/lib/i18n/ko"
import { zh } from "@/lib/i18n/zh"
import type { Locale, Messages } from "@/lib/i18n/types"

export const LOCALES: Locale[] = ["en", "zh", "ko", "es"]
export const messagesByLocale: Record<Locale, Messages> = { en, zh, ko, es }

export function resolveMessages(locale: Locale) {
  return messagesByLocale[locale] ?? en
}
