"use client"

import Link from "next/link"
import { FaqBlock } from "@/components/content-shell"
import { useLocale } from "@/components/locale-provider"
import { getCityDecisionBlock } from "@/lib/content/city-decision-blocks"
import { getCompare } from "@/lib/content/compares"
import { pickLocalized } from "@/lib/content/types"
import { getSeason, pickText } from "@/lib/stories"

export function CityDecisionPanel({ citySlug }: Readonly<{ citySlug: string }>) {
  const { locale, messages } = useLocale()
  const block = getCityDecisionBlock(citySlug)
  if (!block) return null

  const story = block.relatedStorySlug ? getSeason(block.relatedStorySlug) : undefined
  const compare = block.relatedCompareSlug ? getCompare(block.relatedCompareSlug) : undefined

  return (
    <section className="mt-12 space-y-8" aria-labelledby="city-decision-heading">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {messages.content.decisionContextEyebrow}
        </p>
        <h2 id="city-decision-heading" className="mt-2 text-xl font-extrabold tracking-tight sm:text-2xl">
          {messages.content.decisionContextTitle}
        </h2>
      </div>

      <div className="space-y-6">
        {block.sections.map((section) => (
          <div key={pickLocalized(section.heading, locale)}>
            <h3 className="text-base font-extrabold">{pickLocalized(section.heading, locale)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {pickLocalized(section.body, locale)
                .split(/(\/(?:decide|stories|city|compare)(?:\/[a-z0-9-]+)*)/g)
                .map((part, i) =>
                  part.startsWith("/") ? (
                    <Link key={`${part}-${i}`} href={part} className="font-semibold text-primary hover:underline">
                      {part}
                    </Link>
                  ) : (
                    <span key={`t-${i}`}>{part}</span>
                  ),
                )}
            </p>
          </div>
        ))}
      </div>

      {block.faq.length > 0 ? (
        <FaqBlock
          items={block.faq.map((item) => ({
            q: pickLocalized(item.q, locale),
            a: pickLocalized(item.a, locale),
          }))}
        />
      ) : null}

      <p className="text-sm">
        {story ? (
          <>
            <span className="font-semibold">{messages.content.related}: </span>
            <Link href={`/stories/${story.slug}`} className="mr-3 font-semibold text-primary hover:underline">
              {pickText(story.title, locale)}
            </Link>
          </>
        ) : null}
        {compare ? (
          <>
            {!story ? <span className="font-semibold">{messages.content.related}: </span> : null}
            <Link href={`/compare/${compare.slug}`} className="mr-3 font-semibold text-primary hover:underline">
              {pickLocalized(compare.title, locale)}
            </Link>
          </>
        ) : null}
      </p>
    </section>
  )
}
