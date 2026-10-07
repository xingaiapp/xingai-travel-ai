import type { Locale } from "@/lib/i18n/types"

export type Localized = Record<Locale, string>

export function pickLocalized(text: Localized, locale: Locale): string {
  return text[locale] || text.en
}

export type FitLabel = "strong" | "good" | "mixed" | "weaker"

export interface CompareFactor {
  name: Localized
  a: FitLabel
  b: FitLabel
}

export interface ComparePage {
  slug: string
  title: Localized
  oneLiner: Localized
  aName: Localized
  bName: Localized
  aBestFor: Localized[]
  bBestFor: Localized[]
  /** Concrete “pick this city when…” cues — more decision-shaped than Best for. */
  pickWhenA: Localized[]
  pickWhenB: Localized[]
  factors: CompareFactor[]
  verdict: Localized
  tradeoffs: Localized
  faq: { q: Localized; a: Localized }[]
  relatedCitySlugs?: string[]
  decideHint?: Localized
}

export interface GuidePage {
  slug: string
  title: Localized
  oneLiner: Localized
  body: Localized[]
  candidates: Localized[]
  faq: { q: Localized; a: Localized }[]
  relatedCompareSlugs?: string[]
}

/** A titled block of decision context (seasons, getting there, base, who should skip). */
export interface ContentSection {
  heading: Localized
  body: Localized
}

export interface FaqItem {
  q: Localized
  a: Localized
}

export interface HowItWorksStep {
  title: Localized
  body: Localized
}
