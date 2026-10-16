"use client"

import { track } from "@vercel/analytics"
import { ChevronRight, Play } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ContentHero, ContentShell } from "@/components/content-shell"
import { useLocale } from "@/components/locale-provider"
import { prayerCopy } from "@/lib/content/prayer"
import { prayerForYouCopy } from "@/lib/content/prayer-for-you"
import type { PrayerCellData, PrayerCellVideo } from "@/lib/prayer-match"
import { pickLocalized } from "@/lib/content/types"
import { asPublicLocale, localizedPublicHref } from "@/lib/public-locale"
import { YOUTUBE_SUBSCRIBE_URL } from "@/lib/youtube-latest"

/**
 * Click-to-load facade for one film: nothing from YouTube loads until the
 * visitor presses play — same pattern as /prayer and the homepage
 * LatestVideosSection. `compact` renders the smaller in-cell/strip variant.
 */
function VideoFacade({
  video,
  situationKey,
  compact = false,
}: Readonly<{ video: PrayerCellVideo; situationKey: string; compact?: boolean }>) {
  const [playing, setPlaying] = useState(false)
  const thumbnail = `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`

  return (
    <figure>
      <div
        className={`relative mx-auto aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black shadow-sm ${
          compact ? "max-w-[15rem]" : "max-w-[22.5rem]"
        }`}
      >
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0`}
            title={video.videoTitle}
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
              track("prayer_for_you_play", { situation: situationKey, video: video.videoId })
            }}
            aria-label={video.videoTitle}
            className="group absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <img src={thumbnail} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute inset-0 bg-black/25 motion-safe:transition group-hover:bg-black/35" aria-hidden />
            <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
              <span
                className={`inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_30px_color-mix(in_oklch,var(--primary)_35%,transparent)] motion-safe:transition group-hover:scale-105 ${
                  compact ? "h-12 w-12" : "h-16 w-16"
                }`}
              >
                <Play className={compact ? "ml-0.5 h-5 w-5 fill-current" : "ml-1 h-7 w-7 fill-current"} aria-hidden />
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-center text-sm font-semibold">{video.videoTitle}</figcaption>
    </figure>
  )
}

function VerseBlock({ video, small = false }: Readonly<{ video: PrayerCellVideo; small?: boolean }>) {
  if (!video.verse || !video.verseRef) return null
  return (
    <blockquote className={small ? "text-sm leading-relaxed text-muted-foreground" : "mt-3 text-sm leading-relaxed text-muted-foreground"}>
      <p>“{video.verse}”</p>
      <cite className="mt-1 block text-xs font-bold uppercase not-italic tracking-[0.14em]">{video.verseRef}</cite>
    </blockquote>
  )
}

/**
 * One situation cell: the curated film first (priority display), then any
 * newer films the feed filed into the same situation, newest first.
 */
function SituationCell({ cell }: Readonly<{ cell: PrayerCellData }>) {
  const { locale } = useLocale()
  const [main, ...more] = cell.videos
  if (!main) return null

  return (
    <section className="flex flex-col rounded-2xl border border-border bg-card p-5" aria-label={pickLocalized(cell.heading, locale)}>
      <h2 className="text-lg font-semibold tracking-tight">{pickLocalized(cell.heading, locale)}</h2>
      <VerseBlock video={main} />
      <div className="mt-5">
        <VideoFacade video={main} situationKey={cell.key} />
      </div>
      {more.map((video) => (
        <div key={video.videoId} className="mt-6 border-t border-border pt-5">
          <VerseBlock video={video} small />
          <div className="mt-4">
            <VideoFacade video={video} situationKey={cell.key} compact />
          </div>
        </div>
      ))}
    </section>
  )
}

export function PrayerForYouView({ cells, latest }: Readonly<{ cells: PrayerCellData[]; latest: PrayerCellVideo[] }>) {
  const { locale } = useLocale()
  return (
    <ContentShell>
      <ContentHero
        eyebrow={pickLocalized(prayerCopy.eyebrow, locale)}
        title={pickLocalized(prayerForYouCopy.title, locale)}
        oneLiner={pickLocalized(prayerForYouCopy.lead, locale)}
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {cells.map((cell) => (
          <SituationCell key={cell.key} cell={cell} />
        ))}
      </div>
      {latest.length > 0 && (
        <section className="mt-12" aria-label={pickLocalized(prayerForYouCopy.latestHeading, locale)}>
          <h2 className="text-lg font-semibold tracking-tight">{pickLocalized(prayerForYouCopy.latestHeading, locale)}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pickLocalized(prayerForYouCopy.latestLead, locale)}</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((video) => (
              <div key={video.videoId} className="rounded-2xl border border-border bg-card p-4">
                <VideoFacade video={video} situationKey="latest" compact />
                {video.verse && video.verseRef && (
                  <div className="mt-3">
                    <VerseBlock video={video} small />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
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
