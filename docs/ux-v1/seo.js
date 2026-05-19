;(function () {
  const cfg = window.TRAVEL_UX_SEO_CONFIG || {}
  const baseUrl = (cfg.baseUrl || "").replace(/\/$/, "")
  const siteName = cfg.siteName || "XingAI Travel AI"
  const publisher = cfg.publisher || "XingAI"
  const ogImage = baseUrl + (cfg.ogImagePath || "/docs/ux-v1/assets/hero-photo-light.jpg")

  const PAGE_PATHS = {
    index: "/docs/ux-v1/index.html",
    "mobile-input": "/docs/ux-v1/mobile-input.html",
    "mobile-result": "/docs/ux-v1/mobile-result.html",
    "desktop-input": "/docs/ux-v1/desktop-input.html",
    "desktop-result": "/docs/ux-v1/desktop-result.html",
  }

  const SEO_COPY = {
    en: {
      tagline: "Decide where to go — with honest trade-offs",
      descInput:
        "Describe your trip, pick style and pace, and compare destinations with one bookable itinerary — UX V1 demo.",
      descResult:
        "See your top destination pick, itinerary snapshot, book-first list, and simple or detailed day plan — UX V1 demo.",
      descIndex:
        "Interactive UX gallery for XingAI Travel AI: mobile and desktop mocks with i18n, light/dark theme, and a 3-step travel decision flow.",
      titleInput: "Decide your trip",
      titleResult: "Your travel plan",
      titleIndex: "UX V1 gallery",
    },
    zh: {
      tagline: "用现有食材，更聪明地做饭",
      descInput:
        "扫描冰箱或输入食材，选择餐次与快手模式，获得一道菜、可选购物清单与分步烹饪指引——UX V1 演示。",
      descResult:
        "查看推荐菜品、家中已有与需购买清单，以及简明或详细烹饪步骤——UX V1 演示。",
      descIndex:
        "XingAI Travel AI 交互式 UX 图库：移动与桌面原型，多语言、深浅色与三步烹饪决策流程。",
      titleInput: "决定做什么菜",
      titleResult: "你的餐食方案",
      titleIndex: "UX V1 图库",
    },
    ko: {
      tagline: "집에 있는 재료로 더 똑똑하게 요리",
      descInput:
        "냉장고 스캔 또는 재료 입력, 식사 시간·스피드 모드 선택 후 한 가지 요리와 선택적 장보기·조리 단계를 받아보세요 — UX V1 데모.",
      descResult:
        "추천 요리, 집에 있는 재료 vs 구매 목록, 간단·상세 조리 단계를 확인하세요 — UX V1 데모.",
      descIndex:
        "XingAI Travel AI 인터랙티브 UX 갤러리: 모바일·데스크톱 목업, 다국어, 라이트/다크, 3단계 요리 결정 흐름.",
      titleInput: "무엇을 요리할지 결정",
      titleResult: "식사 계획",
      titleIndex: "UX V1 갤러리",
    },
    es: {
      tagline: "Cocina mejor con lo que ya tienes",
      descInput:
        "Escanea la nevera o escribe ingredientes, elige comida y modo rápido, y obtén un plato con lista de compra opcional y pasos — demo UX V1.",
      descResult:
        "Plato recomendado, lo que tienes en casa vs comprar, y pasos simples o detallados — demo UX V1.",
      descIndex:
        "Galería UX interactiva de XingAI Travel AI: mocks móvil y escritorio, i18n, tema claro/oscuro y flujo de decisión en 3 pasos.",
      titleInput: "Decide qué cocinar",
      titleResult: "Tu plan de comida",
      titleIndex: "Galería UX V1",
    },
  }

  function htmlLang(locale) {
    if (locale === "zh") return "zh-Hans"
    return locale || "en"
  }

  function getPack(locale) {
    return window.TRAVEL_UX_MESSAGES?.[locale] || window.TRAVEL_UX_MESSAGES?.en || {}
  }

  function getSeoCopy(locale) {
    return SEO_COPY[locale] || SEO_COPY.en
  }

  function getPageId() {
    return document.documentElement.getAttribute("data-seo-page") || "index"
  }

  function canonicalUrl(pageId) {
    const path = PAGE_PATHS[pageId] || PAGE_PATHS.index
    return baseUrl ? baseUrl + path : path
  }

  function pageMeta(pageId, locale) {
    const copy = getSeoCopy(locale)
    const isResult = pageId.includes("result")
    const isIndex = pageId === "index"
    const pageLabel = isIndex
      ? copy.titleIndex
      : isResult
        ? copy.titleResult
        : copy.titleInput
    const description = isIndex
      ? copy.descIndex
      : isResult
        ? copy.descResult
        : copy.descInput
    const title = `${pageLabel} — ${siteName}`
    return { title, description, pageLabel }
  }

  function upsertMeta(attr, key, content) {
    if (!content) return
    let el = document.head.querySelector(`meta[${attr}="${key}"]`)
    if (!el) {
      el = document.createElement("meta")
      el.setAttribute(attr, key)
      document.head.appendChild(el)
    }
    el.setAttribute("content", content)
  }

  function upsertLink(rel, href, extra) {
    if (!href) return
    let el = document.head.querySelector(`link[rel="${rel}"]`)
    if (!el) {
      el = document.createElement("link")
      el.rel = rel
      document.head.appendChild(el)
    }
    el.href = href
    if (extra) Object.keys(extra).forEach((k) => el.setAttribute(k, extra[k]))
  }

  function upsertJsonLd(id, data) {
    let el = document.getElementById(id)
    if (!el) {
      el = document.createElement("script")
      el.type = "application/ld+json"
      el.id = id
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(data)
  }

  function buildFaq(locale) {
    const g = getPack(locale).guide || getPack("en").guide || {}
    const items = [
      ["step1Title", "step1Body"],
      ["step2Title", "step2Body"],
      ["step3Title", "step3Body"],
      ["step4Title", "step4Body"],
    ]
    return items
      .map(([qKey, aKey]) => {
        const q = g[qKey]
        const a = g[aKey]
        if (!q || !a) return null
        return {
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        }
      })
      .filter(Boolean)
  }

  function buildHowTo(locale, pageId) {
    const pack = getPack(locale)
    const l = pack.landing || getPack("en").landing || {}
    const r = pack.result || getPack("en").result || {}
    const steps = [
      { name: l.step1Title || "What you have", text: l.step1Desc || "" },
      { name: l.step2Title || "Recommend a destination", text: l.step2Desc || "" },
      {
        name: l.flowStep3 || "Plan it",
        text: r.orderTitle || r.stepsTitle || "Follow the itinerary and day plan on the result screen.",
      },
    ].filter((s) => s.name)
    const url = canonicalUrl(pageId.includes("result") ? "mobile-input" : pageId)
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: getSeoCopy(locale).tagline,
      description: pageMeta(pageId, locale).description,
      step: steps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text,
        url: url + "#section-" + (i === 0 ? "context" : i === 1 ? "destination-pick" : "plan"),
      })),
    }
  }

  function buildGraph(locale, pageId) {
    const { title, description } = pageMeta(pageId, locale)
    const url = canonicalUrl(pageId)
    const copy = getSeoCopy(locale)
    const graph = [
      {
        "@type": "Organization",
        "@id": baseUrl + "#organization",
        name: publisher,
        url: cfg.siteUrl || baseUrl,
      },
      {
        "@type": "WebSite",
        "@id": baseUrl + "#website",
        name: siteName,
        description: copy.tagline,
        publisher: { "@id": baseUrl + "#organization" },
        inLanguage: ["en", "zh-Hans", "ko", "es"],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: siteName,
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Web",
        description,
        url,
        image: ogImage,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: [
          "Habit context and constraint capture",
          "Focus area and cadence recommendations",
          "Week overview and next 48 hours",
          "Simple and detailed next actions with gentle nudges",
        ],
        inLanguage: htmlLang(locale),
      },
      buildHowTo(locale, pageId),
    ]

    const faq = buildFaq(locale)
    if (faq.length && !pageId.includes("result")) {
      graph.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq,
      })
    }

    if (pageId === "index") {
      graph.push({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: title,
        itemListElement: Object.keys(PAGE_PATHS)
          .filter((k) => k !== "index")
          .map((k, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: k,
            url: canonicalUrl(k),
          })),
      })
    }

    return graph
  }

  window.travelUxApplySeo = function applySeo(locale) {
    const loc = locale || localStorage.getItem("travel-ux-locale") || "en"
    const pageId = getPageId()
    const { title, description } = pageMeta(pageId, loc)
    const url = canonicalUrl(pageId)
    const copy = getSeoCopy(loc)

    document.documentElement.lang = htmlLang(loc)
    document.title = title

    upsertMeta("name", "description", description)
    upsertMeta("name", "robots", "index, follow, max-image-preview:large")
    upsertMeta("name", "author", publisher)
    upsertMeta("name", "application-name", siteName)

    upsertMeta("property", "og:type", "website")
    upsertMeta("property", "og:site_name", siteName)
    upsertMeta("property", "og:title", title)
    upsertMeta("property", "og:description", description)
    upsertMeta("property", "og:url", url)
    upsertMeta("property", "og:image", ogImage)
    upsertMeta("property", "og:image:alt", copy.tagline)
    upsertMeta("property", "og:locale", loc === "zh" ? "zh_CN" : loc === "ko" ? "ko_KR" : loc === "es" ? "es_ES" : "en_US")

    upsertMeta("name", "twitter:card", "summary_large_image")
    upsertMeta("name", "twitter:title", title)
    upsertMeta("name", "twitter:description", description)
    upsertMeta("name", "twitter:image", ogImage)

    upsertLink("canonical", url)

    const graph = buildGraph(loc, pageId)
    graph.forEach((node, i) => upsertJsonLd("travel-seo-ld-" + i, node))
  }

  document.addEventListener("DOMContentLoaded", function () {
    window.travelUxApplySeo(localStorage.getItem("travel-ux-locale") || "en")
  })
})()
