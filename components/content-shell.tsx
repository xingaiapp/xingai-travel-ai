"use client"

import Link from "next/link"
import { useLocale } from "@/components/locale-provider"
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

export function DecideCta({ hint }: Readonly<{ hint?: Localized }>) {
  const { messages, locale } = useLocale()
  return (
    <section className="mt-10 rounded-md border border-primary/30 bg-primary/5 p-5">
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

export function FaqBlock({ items }: Readonly<{ items: { q: string; a: string }[] }>) {
  const { messages } = useLocale()
  if (items.length === 0) return null
  return (
    <section className="mt-10">
      <h2 className="text-base font-extrabold">{messages.content.faqHeading}</h2>
      <dl className="mt-4 space-y-4">
        {items.map((item) => (
          <div key={item.q} className="rounded-md border border-border bg-card p-4">
            <dt className="text-sm font-extrabold">{item.q}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</dd>
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
