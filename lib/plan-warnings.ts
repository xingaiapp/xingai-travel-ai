import type { Locale } from "@/lib/i18n/types"
import type { TripWarning } from "@/lib/types"

/**
 * The Decide form never asks for nationality, so a warning such as "U.S. citizens can enter
 * visa-free for 90 days" is a guess about the reader. The prompt forbids it; this is the backstop.
 */
const NATIONALITY_CLAIM =
  /citizens?\b|passport holders?|nationals\b|公民|国民|國民|护照持有|護照持有|시민권자|국민|여권 소지자|ciudadan[oa]s?\b|nacionales\b/i

const NEUTRAL: Record<Locale, { title: string; body: string }> = {
  en: {
    title: "Check entry rules",
    body: "Visa and entry rules depend on your nationality and passport. Check the destination's official government site before you book.",
  },
  zh: {
    title: "核实入境规定",
    body: "签证和入境规定取决于你的国籍和护照。预订前请到目的地政府官方网站核实。",
  },
  ko: {
    title: "입국 규정 확인",
    body: "비자와 입국 규정은 국적과 여권에 따라 다릅니다. 예약 전에 목적지 정부 공식 사이트에서 확인하세요.",
  },
  es: {
    title: "Revisa los requisitos de entrada",
    body: "Los requisitos de visado y entrada dependen de tu nacionalidad y pasaporte. Consulta el sitio oficial del gobierno del destino antes de reservar.",
  },
}

/** Replace any warning that assumes a nationality with a neutral entry-rules note. */
export function neutralizeNationalityClaims(
  warnings: TripWarning[] | undefined,
  locale: Locale = "en"
): TripWarning[] | undefined {
  if (!Array.isArray(warnings)) return warnings
  const neutral = NEUTRAL[locale] ?? NEUTRAL.en
  return warnings.map((warning) => {
    const text = `${warning?.title ?? ""} ${warning?.body ?? ""}`
    if (!NATIONALITY_CLAIM.test(text)) return warning
    return { type: "visa", severity: "info", title: neutral.title, body: neutral.body }
  })
}
