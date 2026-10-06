import { faqItems, howItWorksSteps, howItWorksTitle } from "@/lib/content/how-faq"

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
export const decideJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${site}/decide#webpage`,
      url: `${site}/decide`,
      name: "Decide your trip · XingAI Travel",
      description:
        "Describe your real constraints, compare destinations with honest trade-offs, then open partner search links to book the key pieces.",
      isPartOf: { "@id": `${site}/#website` },
      about: { "@id": `${site}/#app` },
      inLanguage: "en",
      primaryImageOfPage: `${site}/assets/home-hero-hong-kong.webp`,
    },
    {
      "@type": "WebApplication",
      "@id": `${site}/decide#app`,
      name: "XingAI Travel Decision Tool",
      url: `${site}/decide`,
      applicationCategory: "TravelApplication",
      operatingSystem: "Web",
      description:
        "Enter dates, origin, budget, travelers, and style. XingAI Travel compares destinations, names one winner and two alternatives with trade-offs, then shows book-first partner search links.",
      isPartOf: { "@id": `${site}/#website` },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      inLanguage: ["en", "zh-CN", "ko", "es"],
    },
  ],
} as const

export const decideJsonLdHtml = JSON.stringify(decideJsonLd).replace(/</g, "\\u003c")

/** FAQPage for /faq — matches visible FAQ copy (English for schema). */
export function faqPageJsonLdHtml(): string {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${site}/faq#faq`,
    url: `${site}/faq`,
    isPartOf: { "@id": `${site}/#website` },
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q.en,
      acceptedAnswer: { "@type": "Answer", text: item.a.en },
    })),
  }
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

/** HowTo for /how-it-works — matches visible steps. */
export function howToJsonLdHtml(): string {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${site}/how-it-works#howto`,
    name: howItWorksTitle.en,
    url: `${site}/how-it-works`,
    isPartOf: { "@id": `${site}/#website` },
    step: howItWorksSteps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title.en,
      text: step.body.en,
      url: `${site}/decide`,
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
}

/** Article + Person author for Travel Stories episodes. */
export function storyArticleJsonLdHtml(input: StoryArticleInput): string {
  const url = `${site}/stories/${input.seasonSlug}/${input.episodeSlug}`
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
    inLanguage: "en",
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
