import Link from "next/link"
import { ShieldCheck } from "lucide-react"

export type LegalPageKind = "privacy" | "terms" | "disclaimer" | "affiliate"

const copy = {
  privacy: {
    title: "Privacy Policy",
    summary:
      "XingAI Travel AI is designed to collect only the trip context needed to compare destinations and build a practical itinerary.",
    zhTitle: "隐私政策",
    koTitle: "개인정보 처리방침",
    sections: [
      ["What we collect", "Trip inputs such as dates, origin, budget, travelers, style, pace, and notes you submit."],
      ["How we use it", "To compare destinations, generate itineraries, improve product reliability, and protect the service from abuse."],
      ["What we do not do", "We do not sell personal trip context. We do not use affiliate commission to change destination recommendations."],
      ["Your control", "You can avoid entering sensitive information. Local preview data may be stored in your browser session."],
    ],
  },
  terms: {
    title: "Terms of Use",
    summary:
      "Use XingAI Travel AI as a decision-support tool. You remain responsible for booking choices, travel documents, and final verification.",
    zhTitle: "使用条款",
    koTitle: "이용약관",
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
    zhTitle: "旅行免责声明",
    koTitle: "여행 면책고지",
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
    zhTitle: "联盟披露",
    koTitle: "제휴 고지",
    sections: [
      ["Decision first", "Destination winners, rankings, confidence, and trade-off explanations are based on trip fit, not commission."],
      ["Affiliate after trust", "Booking links may appear after the recommendation, comparison, and book-first checklist are shown."],
      ["Possible compensation", "Some booking links may earn XingAI a commission at no extra cost to you."],
      ["No pay-to-rank", "Affiliate relationships should not determine which destination is recommended or how trade-offs are explained."],
    ],
  },
} satisfies Record<LegalPageKind, {
  title: string
  summary: string
  zhTitle: string
  koTitle: string
  sections: [string, string][]
}>

export function LegalPage({ kind }: Readonly<{ kind: LegalPageKind }>) {
  const page = copy[kind]

  return (
    <main className="flex-1 px-4 pb-28 pt-8 sm:px-6 lg:px-10 lg:pb-12">
      <article className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
        <div className="mb-6 flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">XingAI Travel AI Legal</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight">{page.title}</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{page.summary}</p>
          </div>
        </div>

        <div className="mb-6 rounded-xl border border-border bg-muted/60 p-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            <strong className="text-foreground">中文：</strong>
            {page.zhTitle}。本页说明 XingAI Travel AI 的基础保护原则；预订前请自行核对实时价格、入境规则、安全信息与可用性。
          </p>
          <p className="mt-2">
            <strong className="text-foreground">한국어：</strong>
            {page.koTitle}. 예약 전 실시간 가격, 입국 규정, 안전 정보, 가능 여부를 직접 확인하세요.
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
          <Link href="/privacy" className="rounded-xl border border-border px-3 py-2 text-sm font-bold text-muted-foreground hover:text-primary">
            Privacy
          </Link>
          <Link href="/terms" className="rounded-xl border border-border px-3 py-2 text-sm font-bold text-muted-foreground hover:text-primary">
            Terms
          </Link>
          <Link href="/disclaimer" className="rounded-xl border border-border px-3 py-2 text-sm font-bold text-muted-foreground hover:text-primary">
            Disclaimer
          </Link>
          <Link href="/affiliate-disclosure" className="rounded-xl border border-border px-3 py-2 text-sm font-bold text-muted-foreground hover:text-primary">
            Affiliate
          </Link>
        </div>
      </article>
    </main>
  )
}
