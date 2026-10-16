"use client"

import { track } from "@vercel/analytics"
import { ChevronRight, Play } from "lucide-react"
import { useState } from "react"
import { ContentHero, ContentShell } from "@/components/content-shell"
import { useLocale } from "@/components/locale-provider"
import { prayerCopy, prayerPlaylists, type PrayerPlaylist } from "@/lib/content/prayer"
import { pickLocalized } from "@/lib/content/types"
import { YOUTUBE_SUBSCRIBE_URL } from "@/lib/youtube-latest"

/**
 * One playlist block: a click-to-load facade (thumbnail + play button) over
 * the playlist's first video. Nothing from YouTube loads until the visitor
 * presses play — same pattern as the homepage LatestVideosSection.
 */
function PlaylistBlock({ playlist }: Readonly<{ playlist: PrayerPlaylist }>) {
  const { locale } = useLocale()
  const [playing, setPlaying] = useState(false)
  const thumbnail = `https://i.ytimg.com/vi/${playlist.firstVideoId}/hqdefault.jpg`

  return (
    <section className="mt-12 border-t border-border pt-10 first:mt-10" aria-label={playlist.heading}>
      <h2 className="text-2xl font-semibold tracking-tight">{playlist.heading}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        {pickLocalized(playlist.body, locale)}
      </p>
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {pickLocalized(playlist.countLabel, locale)}
      </p>
      <figure className="mt-6">
        <div className="relative mx-auto aspect-[9/16] w-full max-w-[22.5rem] overflow-hidden rounded-2xl bg-black shadow-sm">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${playlist.firstVideoId}?list=${playlist.id}&autoplay=1&rel=0`}
              title={playlist.firstVideoTitle}
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
                track("prayer_playlist_play", { playlist: playlist.id })
              }}
              aria-label={playlist.firstVideoTitle}
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
        <figcaption className="mt-3 text-center text-sm font-semibold">{playlist.firstVideoTitle}</figcaption>
      </figure>
      <p className="mt-4 text-center">
        <a
          href={playlist.url}
          target="_blank"
          rel="noreferrer"
          onClick={() => track("prayer_playlist_open", { playlist: playlist.id, target: playlist.url })}
          className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          {pickLocalized(prayerCopy.openPlaylist, locale)}
          <ChevronRight className="h-4 w-4" aria-hidden />
        </a>
      </p>
    </section>
  )
}

export function PrayerView() {
  const { locale } = useLocale()
  return (
    <ContentShell>
      <ContentHero
        eyebrow={pickLocalized(prayerCopy.eyebrow, locale)}
        title={pickLocalized(prayerCopy.title, locale)}
        oneLiner={pickLocalized(prayerCopy.lead, locale)}
      />
      {prayerPlaylists.map((playlist) => (
        <PlaylistBlock key={playlist.id} playlist={playlist} />
      ))}
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
