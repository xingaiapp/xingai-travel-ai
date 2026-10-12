"use client"

import Link from "next/link"
import { useLocale } from "@/components/locale-provider"
import { pickLocalized } from "@/lib/content/types"
import { scenarioIntro, scenarioQuestions } from "@/lib/content/scenario-questions"

export function ScenarioQuestions({
  limit,
  className,
}: Readonly<{ limit?: number; className?: string }>) {
  const { locale, messages } = useLocale()
  const items = limit ? scenarioQuestions.slice(0, limit) : scenarioQuestions

  return (
    <section className={className} aria-labelledby="scenario-questions-heading">
      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary">
        {messages.content.scenarioEyebrow}
      </p>
      <h2 id="scenario-questions-heading" className="mt-2 text-lg font-extrabold tracking-tight sm:text-xl">
        {messages.content.scenarioTitle}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {pickLocalized(scenarioIntro, locale)}
      </p>
      <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              {pickLocalized(item.question, locale)}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
