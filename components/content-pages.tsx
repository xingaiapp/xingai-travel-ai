"use client"

import Link from "next/link"
import { ContentHero, ContentShell, DecideCta, DirectAnswer, FaqBlock, FitPill } from "@/components/content-shell"
import { useLocale } from "@/components/locale-provider"
import { getCity } from "@/lib/cities"
import {
  compares,
  faqDirectAnswer,
  faqItems,
  getCompare,
  getGuide,
  guides,
  howItWorksDirectAnswer,
  howItWorksLead,
  howItWorksSections,
  howItWorksSteps,
  howItWorksTitle,
} from "@/lib/content"
import { getCompareSections } from "@/lib/content/compare-sections"
import { getGuideSections } from "@/lib/content/guide-sections"
import { pickLocalized, type ContentSection } from "@/lib/content/types"
import type { Locale } from "@/lib/i18n/types"

function ContentSections({ sections, locale }: Readonly<{ sections: ContentSection[]; locale: Locale }>) {
  if (sections.length === 0) return null
  return (
    <div className="mt-8 space-y-6">
      {sections.map((section) => (
        <section key={pickLocalized(section.heading, locale)}>
          <h2 className="text-base font-extrabold">{pickLocalized(section.heading, locale)}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pickLocalized(section.body, locale)}</p>
        </section>
      ))}
    </div>
  )
}

export function HowItWorksView() {
  const { messages, locale } = useLocale()
  return (
    <ContentShell>
      <ContentHero
        eyebrow={messages.content.howEyebrow}
        title={pickLocalized(howItWorksTitle, locale)}
        oneLiner={pickLocalized(howItWorksLead, locale)}
      />
      <DirectAnswer
        question={pickLocalized(howItWorksTitle, locale)}
        answer={pickLocalized(howItWorksDirectAnswer, locale)}
      />
      <ol className="space-y-4">
        {howItWorksSteps.map((step) => (
          <li key={pickLocalized(step.title, locale)} className="card-hover rounded-md border border-border bg-card p-4">
            <h2 className="text-sm font-extrabold">{pickLocalized(step.title, locale)}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pickLocalized(step.body, locale)}</p>
          </li>
        ))}
      </ol>
      <ContentSections sections={howItWorksSections} locale={locale} />
      <DecideCta />
      <p className="mt-6 text-sm">
        <Link href="/faq" className="font-semibold text-primary hover:underline">
          {messages.content.faqNav} →
        </Link>
      </p>
    </ContentShell>
  )
}

export function FaqView() {
  const { messages, locale } = useLocale()
  return (
    <ContentShell>
      <ContentHero
        eyebrow={messages.content.faqEyebrow}
        title={messages.content.faqNav}
        oneLiner={pickLocalized(howItWorksLead, locale)}
      />
      <DirectAnswer
        question={pickLocalized(
          {
            en: "What is XingAI Travel?",
            zh: "XingAI Travel 是什么？",
            ko: "XingAI Travel은 무엇인가요?",
            es: "¿Qué es XingAI Travel?",
          },
          locale
        )}
        answer={pickLocalized(faqDirectAnswer, locale)}
      />
      <FaqBlock
        items={faqItems.map((item) => ({
          q: pickLocalized(item.q, locale),
          a: pickLocalized(item.a, locale),
        }))}
      />
      <DecideCta />
      <p className="mt-6 text-sm">
        <Link href="/how-it-works" className="font-semibold text-primary hover:underline">
          {messages.content.howItWorksNav} →
        </Link>
      </p>
    </ContentShell>
  )
}

export function CompareIndexView() {
  const { messages, locale } = useLocale()
  return (
    <ContentShell>
      <ContentHero
        eyebrow={messages.content.compareEyebrow}
        title={messages.content.compareIndexTitle}
        oneLiner={messages.content.ctaBody}
      />
      <ul className="space-y-3">
        {compares.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/compare/${item.slug}`}
              className="card-hover block rounded-md border border-border bg-card p-4"
            >
              <p className="text-sm font-extrabold">{pickLocalized(item.title, locale)}</p>
              <p className="mt-1 text-sm text-muted-foreground">{pickLocalized(item.oneLiner, locale)}</p>
            </Link>
          </li>
        ))}
      </ul>
      <DecideCta />
    </ContentShell>
  )
}

export function CompareDetailView({ slug }: Readonly<{ slug: string }>) {
  const { messages, locale } = useLocale()
  const page = getCompare(slug)
  if (!page) return null

  return (
    <ContentShell>
      <ContentHero
        eyebrow={messages.content.compareEyebrow}
        title={pickLocalized(page.title, locale)}
        oneLiner={pickLocalized(page.oneLiner, locale)}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card-hover rounded-md border border-border bg-card p-4">
          <h2 className="text-lg font-black text-primary">{pickLocalized(page.aName, locale)}</h2>
          <p className="mt-2 text-xs font-extrabold uppercase tracking-wide text-muted-foreground">{messages.content.bestFor}</p>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {page.aBestFor.map((line) => (
              <li key={pickLocalized(line, locale)}>• {pickLocalized(line, locale)}</li>
            ))}
          </ul>
        </div>
        <div className="card-hover rounded-md border border-border bg-card p-4">
          <h2 className="text-lg font-black text-primary">{pickLocalized(page.bName, locale)}</h2>
          <p className="mt-2 text-xs font-extrabold uppercase tracking-wide text-muted-foreground">{messages.content.bestFor}</p>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {page.bBestFor.map((line) => (
              <li key={pickLocalized(line, locale)}>• {pickLocalized(line, locale)}</li>
            ))}
          </ul>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="text-base font-extrabold">{messages.content.pickWhen}</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-border bg-card/70 p-4">
            <p className="text-sm font-extrabold text-primary">{pickLocalized(page.aName, locale)}</p>
            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
              {page.pickWhenA.map((line) => (
                <li key={pickLocalized(line, locale)}>• {pickLocalized(line, locale)}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-border bg-card/70 p-4">
            <p className="text-sm font-extrabold text-primary">{pickLocalized(page.bName, locale)}</p>
            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
              {page.pickWhenB.map((line) => (
                <li key={pickLocalized(line, locale)}>• {pickLocalized(line, locale)}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-base font-extrabold">{messages.content.factors}</h2>
        <p className="mt-1 text-xs text-muted-foreground">{messages.content.fitNote}</p>
        <div className="mt-3 overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[28rem] text-sm">
            <thead className="bg-muted/60 text-xs text-muted-foreground">
              <tr>
                <th className="p-3 text-left">{messages.result.tableDestination}</th>
                <th className="p-3 text-center">{pickLocalized(page.aName, locale)}</th>
                <th className="p-3 text-center">{pickLocalized(page.bName, locale)}</th>
              </tr>
            </thead>
            <tbody>
              {page.factors.map((row) => (
                <tr key={pickLocalized(row.name, locale)} className="border-t border-border">
                  <td className="p-3 font-semibold">{pickLocalized(row.name, locale)}</td>
                  <td className="p-3 text-center">
                    <FitPill label={pickLocalized(page.aName, locale)} value={row.a} />
                  </td>
                  <td className="p-3 text-center">
                    <FitPill label={pickLocalized(page.bName, locale)} value={row.b} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card-hover mt-8 rounded-md border border-primary/25 bg-primary/5 p-4">
        <h2 className="text-base font-extrabold">{messages.content.verdict}</h2>
        <p className="mt-2 text-sm leading-relaxed">{pickLocalized(page.verdict, locale)}</p>
      </section>

      <section className="mt-6">
        <h2 className="text-base font-extrabold">{messages.content.tradeoffs}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pickLocalized(page.tradeoffs, locale)}</p>
      </section>

      <ContentSections sections={getCompareSections(page.slug)} locale={locale} />

      <FaqBlock
        items={page.faq.map((item) => ({
          q: pickLocalized(item.q, locale),
          a: pickLocalized(item.a, locale),
        }))}
      />

      {(page.relatedCitySlugs?.length || 0) > 0 ? (
        <p className="mt-6 text-sm">
          <span className="font-semibold">{messages.content.related}: </span>
          {page.relatedCitySlugs!.map((slug) => {
            const city = getCity(slug)
            const label = city ? pickLocalized(city.name, locale) : slug
            return (
              <Link key={slug} href={`/city/${slug}`} className="mr-3 font-semibold text-primary hover:underline">
                {label}
              </Link>
            )
          })}
        </p>
      ) : null}

      <DecideCta />
    </ContentShell>
  )
}

export function GuidesIndexView() {
  const { messages, locale } = useLocale()
  return (
    <ContentShell>
      <ContentHero
        eyebrow={messages.content.guidesEyebrow}
        title={messages.content.guidesIndexTitle}
        oneLiner={messages.content.ctaBody}
      />
      <ul className="space-y-3">
        {guides.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/guides/${item.slug}`}
              className="card-hover block rounded-md border border-border bg-card p-4"
            >
              <p className="text-sm font-extrabold">{pickLocalized(item.title, locale)}</p>
              <p className="mt-1 text-sm text-muted-foreground">{pickLocalized(item.oneLiner, locale)}</p>
            </Link>
          </li>
        ))}
      </ul>
      <DecideCta />
    </ContentShell>
  )
}

export function GuideDetailView({ slug }: Readonly<{ slug: string }>) {
  const { messages, locale } = useLocale()
  const page = getGuide(slug)
  if (!page) return null

  return (
    <ContentShell>
      <ContentHero
        eyebrow={messages.content.guidesEyebrow}
        title={pickLocalized(page.title, locale)}
        oneLiner={pickLocalized(page.oneLiner, locale)}
      />
      <div className="space-y-4">
        {page.body.map((para) => (
          <p key={pickLocalized(para, locale)} className="text-sm leading-relaxed text-muted-foreground">
            {pickLocalized(para, locale)}
          </p>
        ))}
      </div>
      <section className="mt-8">
        <h2 className="text-base font-extrabold">{messages.content.candidates}</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {page.candidates.map((line) => (
            <li key={pickLocalized(line, locale)} className="card-hover rounded-md border border-border bg-card px-3 py-2">
              • {pickLocalized(line, locale)}
            </li>
          ))}
        </ul>
      </section>
      <ContentSections sections={getGuideSections(page.slug)} locale={locale} />
      <FaqBlock
        items={page.faq.map((item) => ({
          q: pickLocalized(item.q, locale),
          a: pickLocalized(item.a, locale),
        }))}
      />
      {(page.relatedCompareSlugs?.length || 0) > 0 ? (
        <p className="mt-6 text-sm">
          <span className="font-semibold">{messages.content.related}: </span>
          {page.relatedCompareSlugs!.map((compareSlug) => {
            const related = getCompare(compareSlug)
            const label = related ? pickLocalized(related.title, locale) : compareSlug
            return (
              <Link
                key={compareSlug}
                href={`/compare/${compareSlug}`}
                className="mr-3 font-semibold text-primary hover:underline"
              >
                {label}
              </Link>
            )
          })}
        </p>
      ) : null}
      <DecideCta />
    </ContentShell>
  )
}
