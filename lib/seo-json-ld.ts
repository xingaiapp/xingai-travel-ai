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
      name: "XingAI Travel AI",
      url: "https://travel.xingai.app",
      publisher: { "@id": "https://travel.xingai.app/#organization" },
      inLanguage: ["en", "zh-Hans", "ko"],
    },
    {
      "@type": "WebApplication",
      "@id": "https://travel.xingai.app/#app",
      name: "XingAI Travel AI",
      url: "https://travel.xingai.app/decide",
      applicationCategory: "TravelApplication",
      operatingSystem: "Web",
      description:
        "AI travel decision tool that compares destinations with honest trade-offs and gives one bookable itinerary.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Trip context capture",
        "Destination comparison with honest trade-offs",
        "Best-fit destination recommendation",
        "Book-first checklist",
        "Simple and detailed itinerary",
        "Light and dark themes",
        "English, Chinese, and Korean language support",
      ],
      inLanguage: ["en", "zh-Hans", "ko"],
    },
    {
      "@type": "FAQPage",
      "@id": "https://travel.xingai.app/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How is XingAI Travel AI different from booking sites?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Booking sites help you buy travel inventory. XingAI Travel AI helps you decide where to go first by comparing destinations against your constraints.",
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
      name: "How to choose a trip with XingAI Travel AI",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Enter trip context",
          text: "Add dates, origin, budget, travelers, style, pace, and notes.",
          url: "https://travel.xingai.app/decide",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Compare destinations",
          text: "Review the winner, alternatives, confidence, and trade-offs.",
          url: "https://travel.xingai.app/result",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Use the book-first plan",
          text: "Book flights, hotel area, and key activities after checking live availability.",
          url: "https://travel.xingai.app/result#full-plan",
        },
      ],
    },
  ],
} as const

export const seoJsonLdHtml = JSON.stringify(seoJsonLdGraph)
