import { en } from "@/lib/i18n/en"
import { es } from "@/lib/i18n/es"
import { ko } from "@/lib/i18n/ko"
import { zh } from "@/lib/i18n/zh"
import type { Locale, Messages } from "@/lib/i18n/types"

export const LOCALES: Locale[] = ["en", "zh", "ko", "es"]
export const messagesByLocale: Record<Locale, Messages> = { en, zh, ko, es }

export const LOCALE_NAMES: Record<Locale, string> = { en: "English", zh: "中文", ko: "한국어", es: "Español" }

/** Model returns fixed English rating words (see prompts); show them in the UI language, pass anything else through. */
export function localizeRating(value: string, messages: Messages) {
  const key = value.trim().toLowerCase()
  const map: Record<string, string> = {
    excellent: messages.result.ratingExcellent,
    good: messages.result.ratingGood,
    moderate: messages.result.ratingModerate,
  }
  return map[key] ?? value
}

export function resolveMessages(locale: Locale) {
  return messagesByLocale[locale] ?? en
}
