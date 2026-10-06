import { pickLocalized } from "@/lib/content/types"
import { faqItems, howItWorksSteps, howItWorksTitle } from "@/lib/content/how-faq"
import type { Locale } from "@/lib/i18n/types"
import { absoluteLocalized, type PublicLocale } from "@/lib/public-locale"
import { schemaInLanguage, staticPageMetaCopy } from "@/lib/seo-page-copy"

const site = "https://travel.xingai.app"

/** Sitewide graph only — Organization / WebSite / WebApplication. FAQPage and HowTo belong on pages that show them. */
export const seoJsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site}/#organization`,
      name: "XingAI",
      url: "https://xingai.app",
    },
    {
      "@type": "WebSite",
      "@id": `${site}/#website`,
      name: "XingAI Travel",
      url: site,
      publisher: { "@id": `${site}/#organization` },
      inLanguage: ["en", "zh-CN", "ko", "es"],
      potentialAction: {
        "@type": "Action",
        name: "Make a travel decision",
        target: `${site}/decide`,
      },
    },
    {
      "@type": "WebApplication",
      "@id": `${site}/#app`,
      name: "XingAI Travel",
      url: `${site}/`,
      applicationCategory: "TravelApplication",
      operatingSystem: "Web",
      description:
        "XingAI Travel is an AI travel decision system. It compares destinations against your dates, budget, flights, weather, walkability, and travel style, then names one winner and two alternatives with clear trade-offs. Partner booking links appear after the decision.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Product home that explains the decision system",
        "Trip context capture on /decide",
        "Destination comparison with honest trade-offs",
        "One best-fit recommendation plus two alternatives",
        "Book-first checklist after the decision",
        "Light and dark themes",
        "English, Chinese, Korean, and Spanish",
      ],
      inLanguage: ["en", "zh-CN", "ko", "es"],
    },
  ],
} as const

export const seoJsonLdHtml = JSON.stringify(seoJsonLdGraph).replace(/</g, "\\u003c")

/** Page-level JSON-LD for /decide — SSR with the decision tool route. */
export function decideJsonLdHtml(locale: Locale | PublicLocale = "en"): string {
  const copy = staticPageMetaCopy("/decide", locale)!
  const url = absoluteLocalized(site, locale as PublicLocale, "/decide")
  const lang = schemaInLanguage(locale)
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: copy.title,
        description: copy.description,
        isPartOf: { "@id": `${site}/#website` },
        about: { "@id": `${site}/#app` },
        inLanguage: lang,
        primaryImageOfPage: `${site}/assets/og-travel-decision-2400.jpg`,
      },
      {
        "@type": "WebApplication",
        "@id": `${url}#app`,
        name: copy.title,
        url,
        applicationCategory: "TravelApplication",
        operatingSystem: "Web",
        description: copy.description,
        isPartOf: { "@id": `${site}/#website` },
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        inLanguage: lang,
      },
    ],
  }
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

/** FAQPage for /faq — matches visible FAQ copy in the page locale. */
export function faqPageJsonLdHtml(locale: Locale | PublicLocale = "en"): string {
  const L = locale as Locale
  const url = absoluteLocalized(site, locale as PublicLocale, "/faq")
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    inLanguage: schemaInLanguage(locale),
    isPartOf: { "@id": `${site}/#website` },
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: pickLocalized(item.q, L),
      acceptedAnswer: { "@type": "Answer", text: pickLocalized(item.a, L) },
    })),
  }
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

/** HowTo for /how-it-works — matches visible steps in the page locale. */
export function howToJsonLdHtml(locale: Locale | PublicLocale = "en"): string {
  const L = locale as Locale
  const url = absoluteLocalized(site, locale as PublicLocale, "/how-it-works")
  const decideUrl = absoluteLocalized(site, locale as PublicLocale, "/decide")
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${url}#howto`,
    name: pickLocalized(howItWorksTitle, L),
    url,
    inLanguage: schemaInLanguage(locale),
    isPartOf: { "@id": `${site}/#website` },
    step: howItWorksSteps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: pickLocalized(step.title, L),
      text: pickLocalized(step.body, L),
      url: decideUrl,
    })),
  }
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

export type StoryArticleInput = {
  seasonSlug: string
  episodeSlug: string
  title: string
  description: string
  publishedAt?: string
  imagePath?: string
  /** Schema language tag, e.g. en / zh-CN / ko / es */
  inLanguage?: string
  /** Canonical page URL including locale prefix when present. */
  pageUrl?: string
}

/** Article + Person author for Travel Stories episodes. */
export function storyArticleJsonLdHtml(input: StoryArticleInput): string {
  const url =
    input.pageUrl ?? `${site}/stories/${input.seasonSlug}/${input.episodeSlug}`
  const image = input.imagePath
    ? input.imagePath.startsWith("http")
      ? input.imagePath
      : `${site}${input.imagePath.startsWith("/") ? "" : "/"}${input.imagePath}`
    : undefined
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: input.title,
    description: input.description,
    url,
    datePublished: input.publishedAt,
    inLanguage: input.inLanguage ?? "en",
    isPartOf: { "@id": `${site}/#website` },
    author: {
      "@type": "Person",
      "@id": `${site}/#author-xing`,
      name: "Xing",
      url: "https://xingai.app",
    },
    publisher: { "@id": `${site}/#organization` },
    ...(image ? { image: [image] } : {}),
  }
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
