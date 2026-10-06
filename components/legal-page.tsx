import Link from "next/link"
import { ShieldCheck } from "lucide-react"

export type LegalPageKind = "privacy" | "terms" | "disclaimer" | "affiliate"

type LegalCopy = {
  title: string
  summary: string
  zhBlurb: string
  koBlurb: string
  sections: [string, string][]
  effectiveDate: string
}

const copy: Record<LegalPageKind, LegalCopy> = {
  privacy: {
    title: "Privacy Policy",
    summary:
      "XingAI Travel collects only the trip context needed to compare destinations and build a practical itinerary. This page explains what leaves your browser, what stays local, and how to reach us.",
    zhBlurb:
      "本页说明 XingAI Travel 如何处理行程输入、AI 处理、限流、分析和本机存储。隐私问题请发邮件至 contact@xingai.app。",
    koBlurb:
      "이 페이지는 여행 입력, AI 처리, 속도 제한, 분석, 기기 저장을 어떻게 다루는지 설명합니다. 문의: contact@xingai.app.",
    effectiveDate: "Effective date: 2026-10-06",
    sections: [
      [
        "What you type into Decide",
        "Trip inputs such as dates, origin, region, budget, travelers, style, pace, notes, and Avoid text are sent to our servers only when you run Compare or Inspire, so we can return a recommendation and (when available) a plan.",
      ],
      [
        "AI processing (OpenAI)",
        "When an API key is configured, those trip inputs are sent to OpenAI to generate the comparison and plan JSON. Treat the model as a processor for that request. Do not put passwords, payment card numbers, or other highly sensitive personal data in trip notes.",
      ],
      [
        "Rate limits and IP address",
        "We use your IP address (from request headers) to enforce a daily demo quota for successful decisions. Counts are stored in Redis for the UTC calendar day when Redis is configured; otherwise a per-instance memory fallback is used in development.",
      ],
      [
        "Analytics",
        "We may use Vercel Analytics (or similar first-party / host analytics) for aggregated traffic and performance. It is not used to rank destinations or change recommendations.",
      ],
      [
        "What stays in your browser",
        "Your Travel Map (Want to go / Been) and Trips history are stored in this browser’s localStorage only. Session fields for the current Decide run may use sessionStorage. Clearing site data removes them. We do not sync these to an account today.",
      ],
      [
        "Share links (/s)",
        "Optional share URLs encode a compressed comparison and plan in the query string so another person can open the result without a database. Trip origin, dates, budget, and notes are not encoded in that link. Anyone with the link can see the shared decision content.",
      ],
      [
        "What we do not do",
        "We do not sell personal trip context. Affiliate or partner links never change destination rankings, confidence, or trade-off text.",
      ],
      [
        "Retention and control",
        "Server rate-limit counters reset after the UTC day they cover. Browser-stored map and trip history stay until you clear them or remove items in the product UI. For privacy questions or deletion requests related to server logs we control, email contact@xingai.app.",
      ],
      [
        "Contact",
        "Email contact@xingai.app. XingAI Travel is a product of XingAI (xingai.app).",
      ],
    ],
  },
  terms: {
    title: "Terms of Use",
    summary:
      "Use XingAI Travel as a decision-support tool. You remain responsible for booking choices, travel documents, and final verification.",
    zhBlurb: "本页说明使用条款：建议仅供决策参考，预订与合规由您自行负责。问题请联系 contact@xingai.app。",
    koBlurb: "이용 약관입니다. 제안은 참고용이며 예약·규정 준수는 사용자 책임입니다. 문의: contact@xingai.app.",
    effectiveDate: "Effective date: 2026-10-06",
    sections: [
      ["Decision support", "The product provides travel suggestions, comparisons, and planning assistance, not guaranteed travel outcomes."],
      ["User responsibility", "Verify live prices, availability, visa rules, health rules, safety conditions, and cancellation policies before booking."],
      ["Acceptable use", "Do not misuse the service, scrape it, attack it, or submit unlawful content."],
      ["Changes", "We may update features, routes, content, and these terms as the product evolves."],
    ],
  },
  disclaimer: {
    title: "Travel Disclaimer",
    summary:
      "Travel conditions change. Recommendations are based on the information available to the system and the constraints you provide.",
    zhBlurb: "旅行条件会变化。预订前请自行核对实时价格、入境规则、安全信息与可用性。",
    koBlurb: "예약 전 실시간 가격, 입국 규정, 안전 정보, 가능 여부를 직접 확인하세요.",
    effectiveDate: "Effective date: 2026-10-06",
    sections: [
      ["No live guarantee", "Prices, flight schedules, weather, entry rules, safety alerts, and availability may change after a plan is generated."],
      ["No professional advice", "The service is not legal, immigration, medical, tax, insurance, or safety advice."],
      ["AI limitations", "AI output can be incomplete or inaccurate. Treat every plan as a starting point that requires human verification."],
      ["Emergency and safety", "Follow official government, airline, hotel, health, and local authority guidance."],
    ],
  },
  affiliate: {
    title: "Affiliate Disclosure",
    summary:
      "Our product principle is simple: decision quality comes first; affiliate links come after the decision.",
    zhBlurb: "决策质量优先；联盟链接只在推荐之后出现，且不影响排名。问题请联系 contact@xingai.app。",
    koBlurb: "추천 품질이 먼저입니다. 제휴 링크는 결정 이후에만 나타나며 순위에 영향을 주지 않습니다. 문의: contact@xingai.app.",
    effectiveDate: "Effective date: 2026-10-06",
    sections: [
      ["Decision first", "Destination winners, rankings, confidence, and trade-off explanations are based on trip fit, not commission."],
      ["Affiliate after trust", "Booking links may appear after the recommendation, comparison, and book-first checklist are shown."],
      ["Possible compensation", "Some booking links may earn XingAI a commission at no extra cost to you — only when partner IDs are configured."],
      ["No pay-to-rank", "Affiliate relationships should not determine which destination is recommended or how trade-offs are explained."],
    ],
  },
}

export function LegalPage({ kind }: Readonly<{ kind: LegalPageKind }>) {
  const page = copy[kind]

  return (
    <main className="flex-1 px-4 pb-28 pt-8 sm:px-6 lg:px-10 lg:pb-12">
      <article className="mx-auto max-w-3xl rounded-md border border-border bg-card p-5 shadow-sm sm:p-8">
        <div className="mb-6 flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">XingAI Travel Legal</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight">{page.title}</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{page.summary}</p>
            <p className="mt-2 text-xs font-semibold text-muted-foreground">{page.effectiveDate}</p>
          </div>
        </div>

        <div className="mb-6 rounded-md border border-border bg-muted/60 p-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            <strong className="text-foreground">中文：</strong>
            {page.zhBlurb}
          </p>
          <p className="mt-2">
            <strong className="text-foreground">한국어：</strong>
            {page.koBlurb}
          </p>
        </div>

        <div className="space-y-5">
          {page.sections.map(([title, body]) => (
            <section key={title} className="border-t border-border pt-5">
              <h2 className="text-base font-extrabold">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </section>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-5">
          <Link href="/privacy" className="rounded-md border border-border px-3 py-2 text-sm font-bold text-muted-foreground hover:text-primary">
            Privacy
          </Link>
          <Link href="/terms" className="rounded-md border border-border px-3 py-2 text-sm font-bold text-muted-foreground hover:text-primary">
            Terms
          </Link>
          <Link href="/disclaimer" className="rounded-md border border-border px-3 py-2 text-sm font-bold text-muted-foreground hover:text-primary">
            Disclaimer
          </Link>
          <Link href="/affiliate-disclosure" className="rounded-md border border-border px-3 py-2 text-sm font-bold text-muted-foreground hover:text-primary">
            Affiliate disclosure
          </Link>
        </div>
      </article>
    </main>
  )
}
