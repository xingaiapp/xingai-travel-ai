"use client"

import Link from "next/link"
import { useLocale } from "@/components/locale-provider"
import type { Locale, Messages } from "@/lib/i18n/types"
import { pickLocalized, type FitLabel, type Localized } from "@/lib/content/types"
import { cn } from "@/lib/utils"

const fitClass: Record<FitLabel, string> = {
  strong: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300",
  good: "bg-sky-500/15 text-sky-800 dark:text-sky-300",
  mixed: "bg-amber-500/15 text-amber-900 dark:text-amber-300",
  weaker: "bg-muted text-muted-foreground",
}

export function FitPill({ label, value }: Readonly<{ label: string; value: FitLabel }>) {
  const { messages } = useLocale()
  const text =
    value === "strong"
      ? messages.content.fitStrong
      : value === "good"
        ? messages.content.fitGood
        : value === "mixed"
          ? messages.content.fitMixed
          : messages.content.fitWeaker
  return (
    <span className={cn("inline-flex rounded-md px-2 py-0.5 text-xs font-bold", fitClass[value])} title={label}>
      {text}
    </span>
  )
}

export function ContentHero({
  eyebrow,
  title,
  oneLiner,
}: Readonly<{ eyebrow: string; title: string; oneLiner: string }>) {
  return (
    <header className="mb-8 max-w-3xl">
      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-4 text-lg font-medium leading-relaxed text-muted-foreground">{oneLiner}</p>
    </header>
  )
}

/** Visible 40–80 word AEO answer block (same facts as FAQ/schema where possible). */
export function DirectAnswer({ question, answer }: Readonly<{ question: string; answer: string }>) {
  return (
    <section className="card-hover mb-8 rounded-2xl border border-primary/25 bg-primary/5 p-5" aria-labelledby="direct-answer-q">
      <p id="direct-answer-q" className="text-sm font-extrabold text-foreground">
        {question}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{answer}</p>
    </section>
  )
}

export function DecideCta({ hint }: Readonly<{ hint?: Localized }>) {
  const { messages, locale } = useLocale()
  return (
    <section className="card-hover mt-10 rounded-md border border-primary/30 bg-primary/5 p-5">
      <h2 className="text-base font-extrabold">{messages.content.ctaTitle}</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {hint ? pickLocalized(hint, locale) : messages.content.ctaBody}
      </p>
      <Link
        href="/decide"
        className="mt-4 inline-flex h-11 min-h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-extrabold text-primary-foreground shadow-sm"
      >
        {messages.content.ctaButton}
      </Link>
    </section>
  )
}

/** Turn bare `/decide`, `/stories/…` paths in FAQ prose into real links with human labels. */
function humanizeSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function labelForInternalPath(path: string, locale: Locale, messages: Messages) {
  if (path === "/decide") return messages.chrome.decide
  if (path === "/faq") return messages.content.faqNav
  if (path === "/how-it-works") return messages.content.howItWorksNav
  if (path === "/stories") return messages.chrome.stories
  if (path === "/city") return messages.content.citiesNav
  if (path === "/compare") return messages.content.compareNav
  if (path === "/guides") return messages.content.guidesNav

  const parts = path.split("/").filter(Boolean)
  const [root, slug, rest] = parts
  if (root === "stories" && slug && !rest) {
    const place = humanizeSlug(slug)
    if (locale === "zh") return `${place} 故事`
    if (locale === "ko") return `${place} 이야기`
    if (locale === "es") return `Historias de ${place}`
    return `${place} stories`
  }
  if (root === "city" && slug) return humanizeSlug(slug)
  if (root === "compare" && slug) return humanizeSlug(slug).replace(/ Vs /g, " vs ")
  if (root === "guides" && slug) return humanizeSlug(slug)
  return path
}

function linkifyInternalPaths(text: string, locale: Locale, messages: Messages) {
  const parts = text.split(/(\/(?:decide|faq|how-it-works|stories|city|compare|guides)(?:\/[a-z0-9-]+)*)/g)
  return parts.map((part, index) => {
    if (part.startsWith("/") && part.length > 1) {
      return (
        <Link key={`${part}-${index}`} href={part} className="font-semibold text-primary hover:underline">
          {labelForInternalPath(part, locale, messages)}
        </Link>
      )
    }
    return <span key={`t-${index}`}>{part}</span>
  })
}

export function FaqBlock({ items }: Readonly<{ items: { q: string; a: string }[] }>) {
  const { messages, locale } = useLocale()
  if (items.length === 0) return null
  return (
    <section className="mt-10">
      <h2 className="text-base font-extrabold">{messages.content.faqHeading}</h2>
      <dl className="mt-4 space-y-4">
        {items.map((item) => (
          <div key={item.q} className="card-hover rounded-md border border-border bg-card p-4">
            <dt className="text-sm font-extrabold">{item.q}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{linkifyInternalPaths(item.a, locale, messages)}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function ContentShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="decision-grid-bg flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-12">
      <div className="mx-auto max-w-3xl">{children}</div>
    </main>
  )
}
