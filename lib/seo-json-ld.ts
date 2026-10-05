export const seoJsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://travel.xingai.app/#organization",
      name: "XingAI",
      url: "https://xingai.app",
    },
    {
      "@type": "WebSite",
      "@id": "https://travel.xingai.app/#website",
      name: "XingAI Travel",
      url: "https://travel.xingai.app",
      publisher: { "@id": "https://travel.xingai.app/#organization" },
      inLanguage: ["en", "zh-CN", "ko", "es"],
      potentialAction: {
        "@type": "Action",
        name: "Make a travel decision",
        target: "https://travel.xingai.app/decide",
      },
    },
    {
      "@type": "WebApplication",
      "@id": "https://travel.xingai.app/#app",
      name: "XingAI Travel",
      url: "https://travel.xingai.app/",
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
    {
      "@type": "FAQPage",
      "@id": "https://travel.xingai.app/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is XingAI Travel?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "XingAI Travel is an AI travel decision system that compares destinations based on dates, budget, flights, weather, walkability, travel pace, and personal preferences. It recommends one best-fit destination and two alternatives with clear trade-offs instead of a long search list.",
          },
        },
        {
          "@type": "Question",
          name: "How is XingAI Travel different from booking sites?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Booking sites help you buy travel inventory. XingAI Travel helps you decide where to go first by comparing destinations against your constraints. Affiliate or partner search links may appear after the decision.",
          },
        },
        {
          "@type": "Question",
          name: "Do affiliate links affect recommendations?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Destination winners, rankings, confidence, and trade-off explanations are based on trip fit. Affiliate links may appear after the decision.",
          },
        },
        {
          "@type": "Question",
          name: "Should I verify the plan before booking?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Always verify live prices, entry rules, safety conditions, cancellation policies, and availability before booking.",
          },
        },
      ],
    },
    {
      "@type": "HowTo",
      "@id": "https://travel.xingai.app/#howto",
      name: "How to choose a trip with XingAI Travel",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Enter trip context",
          text: "Add dates, origin, budget, travelers, style, pace, and notes on /decide.",
          url: "https://travel.xingai.app/decide",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Compare destinations",
          text: "Review the winner, alternatives, confidence, and trade-offs on the decision result.",
          url: "https://travel.xingai.app/decide",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Book the key pieces first",
          text: "Open partner search links for flights, stays, and activities after checking live availability.",
          url: "https://travel.xingai.app/decide",
        },
      ],
    },
  ],
} as const

export const seoJsonLdHtml = JSON.stringify(seoJsonLdGraph).replace(/</g, "\\u003c")

const site = "https://travel.xingai.app"

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
