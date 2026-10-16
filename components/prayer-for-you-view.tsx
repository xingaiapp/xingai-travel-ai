"use client"

import { track } from "@vercel/analytics"
import { ChevronRight, Play } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ContentHero, ContentShell } from "@/components/content-shell"
import { useLocale } from "@/components/locale-provider"
import { prayerCopy } from "@/lib/content/prayer"
import { prayerForYouCopy, prayerSituations, type PrayerSituation } from "@/lib/content/prayer-for-you"
import { pickLocalized } from "@/lib/content/types"
import { asPublicLocale, localizedPublicHref } from "@/lib/public-locale"
import { YOUTUBE_SUBSCRIBE_URL } from "@/lib/youtube-latest"

/**
 * One situation card: heading + the film's own verse, over a click-to-load
 * facade. Nothing from YouTube loads until the visitor presses play — same
 * pattern as /prayer and the homepage LatestVideosSection.
 */
function SituationCard({ situation }: Readonly<{ situation: PrayerSituation }>) {
  const { locale } = useLocale()
  const [playing, setPlaying] = useState(false)
  const thumbnail = `https://i.ytimg.com/vi/${situation.videoId}/hqdefault.jpg`

  return (
    <section className="flex flex-col rounded-2xl border border-border bg-card p-5" aria-label={pickLocalized(situation.heading, locale)}>
      <h2 className="text-lg font-semibold tracking-tight">{pickLocalized(situation.heading, locale)}</h2>
      <blockquote className="mt-3 text-sm leading-relaxed text-muted-foreground">
        <p>“{situation.verse}”</p>
        <cite className="mt-1 block text-xs font-bold uppercase not-italic tracking-[0.14em]">{situation.verseRef}</cite>
      </blockquote>
      <figure className="mt-5">
        <div className="relative mx-auto aspect-[9/16] w-full max-w-[22.5rem] overflow-hidden rounded-2xl bg-black shadow-sm">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${situation.videoId}?autoplay=1&rel=0`}
              title={situation.videoTitle}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => {
                setPlaying(true)
                track("prayer_for_you_play", { situation: situation.key, video: situation.videoId })
              }}
              aria-label={situation.videoTitle}
              className="group absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <img src={thumbnail} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <span className="absolute inset-0 bg-black/25 motion-safe:transition group-hover:bg-black/35" aria-hidden />
              <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_30px_color-mix(in_oklch,var(--primary)_35%,transparent)] motion-safe:transition group-hover:scale-105">
                  <Play className="ml-1 h-7 w-7 fill-current" aria-hidden />
                </span>
              </span>
            </button>
          )}
        </div>
        <figcaption className="mt-3 text-center text-sm font-semibold">{situation.videoTitle}</figcaption>
      </figure>
    </section>
  )
}

export function PrayerForYouView() {
  const { locale } = useLocale()
  return (
    <ContentShell>
      <ContentHero
        eyebrow={pickLocalized(prayerCopy.eyebrow, locale)}
        title={pickLocalized(prayerForYouCopy.title, locale)}
        oneLiner={pickLocalized(prayerForYouCopy.lead, locale)}
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {prayerSituations.map((situation) => (
          <SituationCard key={situation.key} situation={situation} />
        ))}
      </div>
      <p className="mt-10 text-center">
        <Link
          href={localizedPublicHref(asPublicLocale(locale), "/prayer")}
          onClick={() => track("prayer_for_you_to_playlists", { target: "/prayer" })}
          className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          {pickLocalized(prayerForYouCopy.playlistsLink, locale)}
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Link>
      </p>
      <section className="card-hover mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-5" aria-label={pickLocalized(prayerCopy.subscribeHeading, locale)}>
        <h2 className="text-base font-extrabold">{pickLocalized(prayerCopy.subscribeHeading, locale)}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pickLocalized(prayerCopy.subscribeBody, locale)}</p>
        <p className="mt-4">
          <a
            href={YOUTUBE_SUBSCRIBE_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("prayer_subscribe", { target: YOUTUBE_SUBSCRIBE_URL })}
            className="inline-flex h-11 min-h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-extrabold text-primary-foreground shadow-sm"
          >
            {pickLocalized(prayerCopy.subscribeCta, locale)}
          </a>
        </p>
      </section>
    </ContentShell>
  )
}
