export type Locale = "en" | "zh" | "ko" | "es"

export interface Messages {
  chrome: {
    brand: string
    decide: string
    trips: string
    saved: string
    profile: string
    settings: string
    language: string
    theme: string
    light: string
    dark: string
    soon: string
    legal: string
    privacy: string
    terms: string
    disclaimer: string
    affiliate: string
  }
  home: {
    eyebrow: string
    headline: string
    sub: string
    compare: string
    helper: string
    heroBadge: string
    primaryCta: string
    secondaryCta: string
    helpTitle: string
    helpSub: string
    helpStep1Title: string
    helpStep1Body: string
    helpStep2Title: string
    helpStep2Body: string
    helpStep3Title: string
    helpStep3Body: string
    trustLine: string
  }
  steps: {
    context: string
    compare: string
    plan: string
  }
  form: {
    title: string
    dates: string
    from: string
    budget: string
    travelers: string
    notes: string
    advanced: string
    avoid: string
  }
  snapshot: {
    title: string
    looksGood: string
    origin: string
    dates: string
    budget: string
    travelers: string
    vibe: string
    avoid: string
    missing: string
  }
  style: {
    title: string
    style: string
    pace: string
    city: string
    beach: string
    nature: string
    culture: string
    relaxed: string
    balanced: string
    adventure: string
  }
  result: {
    breadcrumb: string
    preview: string
    bestFit: string
    confidence: string
    whyNot: string
    seePlan: string
    comparison: string
    bookFirst: string
    itinerary: string
    simple: string
    detailed: string
    replan: string
    save: string
    note: string
  }
}
