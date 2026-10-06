"use client"

import Link from "next/link"
import { BookOpen } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import { pickText, storiesForDestinations, trackStoryClick, visibleEpisodes } from "@/lib/stories"

/**
 * Optional reading after the decision is complete (ADR 0006).
 * Shown for any compared destination with a story — winner or not — and never used to score.
 */
export function RelatedStories({ destinations }: Readonly<{ destinations: string[] }>) {
  const { locale } = useLocale()
  const seasons = storiesForDestinations(destinations)
  if (seasons.length === 0) return null
  const ui = (en: string, zh: string, ko: string, es: string) => pickText({ en, zh, ko, es }, locale)

  return (
    <section className="rounded-md border border-border bg-card p-4 shadow-sm sm:p-5">
      <h2 className="text-base font-extrabold">
        {ui("Read a real trip", "读一个真实的旅行故事", "진짜 여행 읽기", "Lee un viaje real")}
      </h2>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        {ui(
          "First-hand stories from the publisher. One person's experience — it did not affect your result above.",
          "来自发布者本人的亲身故事。这是一个人的经历，没有影响上面的结果。",
          "발행자의 직접 겪은 이야기입니다. 한 사람의 경험이며, 위 결과에는 영향을 주지 않았습니다.",
          "Relatos en primera persona del autor. La experiencia de una persona — no afectó tu resultado de arriba.",
        )}
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {seasons.map((season) => (
          <Link
            key={season.slug}
            href={`/stories/${season.slug}`}
            onClick={() => trackStoryClick("story_from_result", season.slug)}
            className="card-hover flex items-start gap-3 rounded-md border border-border p-3"
          >
            <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span>
              <span className="block text-sm font-extrabold">{pickText(season.title, locale)}</span>
              <span className="block text-xs text-muted-foreground">
                {pickText(season.subtitle, locale)} · {visibleEpisodes(season).length}{" "}
                {ui("episodes", "集", "화", "episodios")}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
