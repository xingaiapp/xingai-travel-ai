"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight, Camera, Compass, Gem, Map as MapIcon, RotateCcw, ThumbsDown, Lightbulb } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import { citiesForDestinations, fill } from "@/lib/cities"
import { decideHref, episodeLabel, pickText, trackStoryClick } from "@/lib/stories"
import type { StoryBlock, StoryEpisode, StoryPhoto, StorySeason, TakeKind } from "@/lib/stories/types"
import { cn } from "@/lib/utils"

const takeMeta: Record<TakeKind, { icon: typeof Gem; en: string; zh: string; ko: string; es: string }> = {
  return: { icon: RotateCcw, en: "Would return", zh: "会再去", ko: "다시 갈 것", es: "Volvería" },
  skip: { icon: ThumbsDown, en: "Would skip", zh: "会跳过", ko: "건너뛸 것", es: "Lo saltaría" },
  gem: { icon: Gem, en: "Hidden gem", zh: "私藏好地方", ko: "숨은 보석", es: "Joyita escondida" },
  lesson: { icon: Lightbulb, en: "Lesson", zh: "教训", ko: "교훈", es: "Lección" },
}

function useStoryText() {
  const { locale } = useLocale()
  return {
    locale,
    t: (text: Parameters<typeof pickText>[0]) => pickText(text, locale),
    ui: (en: string, zh: string, ko: string, es: string) => pickText({ en, zh, ko, es }, locale),
  }
}

export function StoryImage({
  photo,
  className,
  sizes = "(min-width: 640px) 22rem, 72vw",
  priority = false,
}: Readonly<{ photo: StoryPhoto; className?: string; sizes?: string; priority?: boolean }>) {
  const { t } = useStoryText()
  if (!photo.src) {
    return (
      <div
        className={cn(
          "mx-auto flex aspect-[3/4] max-h-[min(70vh,28rem)] w-full max-w-[22rem] flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-border bg-muted/60 p-4 text-center text-xs text-muted-foreground",
          className
        )}
        role="img"
        aria-label={t(photo.alt)}
      >
        <Camera className="h-5 w-5" aria-hidden />
        <span className="max-w-xs font-semibold">{photo.shot}</span>
      </div>
    )
  }
  return (
    // Prefer the 800w file; tall phone shots look soft when forced full-bleed at 1600.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${photo.src}-800.webp`}
      srcSet={`${photo.src}-800.webp 800w, ${photo.src}-1600.webp 1600w`}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={t(photo.alt)}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn(
        "mx-auto h-auto max-h-[min(70vh,28rem)] w-auto max-w-full rounded-md bg-muted object-contain",
        className,
      )}
    />
  )
}

function Figure({ photo, wide }: Readonly<{ photo: StoryPhoto; wide?: boolean }>) {
  const { t } = useStoryText()
  return (
    <figure className={cn("my-6 flex flex-col items-center", wide && "lg:-mx-8")}>
      <StoryImage photo={photo} sizes={wide ? "(min-width: 1024px) 28rem, 72vw" : undefined} />
      {photo.caption ? <figcaption className="mt-2 max-w-[22rem] text-center text-sm text-muted-foreground">{t(photo.caption)}</figcaption> : null}
    </figure>
  )
}

function Block({ block }: Readonly<{ block: StoryBlock }>) {
  const { t, ui } = useStoryText()
  switch (block.type) {
    case "text":
      return <p className="my-5 text-lg leading-relaxed text-foreground/90">{t(block.body)}</p>
    case "heading":
      return <h2 className="mt-10 font-display text-2xl font-bold tracking-tight">{t(block.body)}</h2>
    case "photo":
      return <Figure photo={block.photo} wide={block.wide} />
    case "pair":
      return (
        <div className="my-8 grid gap-3 sm:grid-cols-2">
          {block.photos.map((photo, index) => (
            <figure key={index}>
              <StoryImage photo={photo} sizes="(min-width: 640px) 24rem, 100vw" className="aspect-[4/5] object-cover" />
              {photo.caption ? <figcaption className="mt-2 text-sm text-muted-foreground">{t(photo.caption)}</figcaption> : null}
            </figure>
          ))}
        </div>
      )
    case "quote":
      return (
        <blockquote className="my-10 border-l-4 border-primary pl-5 font-display text-2xl leading-snug text-foreground">
          {t(block.body)}
        </blockquote>
      )
    case "take":
      return (
        <div className="my-8 grid gap-3 sm:grid-cols-2">
          {block.items.map((item, index) => {
            const meta = takeMeta[item.kind]
            const Icon = meta.icon
            return (
              <div key={index} className="rounded-md border border-border bg-card p-4">
                <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-primary">
                  <Icon className="h-4 w-4" aria-hidden />
                  {ui(meta.en, meta.zh, meta.ko, meta.es)}
                </p>
                <p className="mt-2 text-sm leading-relaxed">{t(item.text)}</p>
              </div>
            )
          })}
        </div>
      )
    case "verdict":
      return (
        <aside className="my-10 rounded-md border border-border bg-card p-5" aria-labelledby="story-verdict-title">
          <h2 id="story-verdict-title" className="font-display text-2xl font-bold">
            {ui("My take", "我的判断", "내 판단", "Mi opinión")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(block.intro)}</p>
          <dl className="mt-4">
            {block.rows.map((row, index) => (
              <div key={index} className="grid gap-1 border-t border-border py-4 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                <dt className="text-xs font-extrabold uppercase tracking-wide text-primary">{t(row.label)}</dt>
                <dd className="text-sm leading-relaxed">{t(row.body)}</dd>
              </div>
            ))}
          </dl>
        </aside>
      )
  }
}

function DecideCta({ season }: Readonly<{ season: StorySeason }>) {
  const { t, ui } = useStoryText()
  const place = t(season.place)
  return (
    <section className="mt-12 rounded-md border border-primary/30 bg-primary/5 p-5 sm:p-6">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
        {ui("Your trip, not mine", "你的旅行，不是我的", "당신의 여행, 내 것이 아닌", "Tu viaje, no el mío")}
      </p>
      <h2 className="mt-2 font-display text-2xl font-bold">
        {ui(
          `Is ${place} right for your trip?`,
          `${place}适合你这次的旅行吗？`,
          `${place}, 이번 여행에 맞을까요?`,
          `¿Te conviene ${place} para este viaje?`,
        )}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {ui(
          "Tell us where you're flying from, who's coming, your budget, and what matters. We'll compare it honestly against alternatives.",
          "告诉我们你从哪里出发、和谁一起、预算多少、最在意什么。我们会把它和其他选择诚实地比较。",
          "출발지, 동행, 예산, 가장 중요한 것을 알려 주세요. 다른 선택과 솔직히 비교해 드립니다.",
          "Cuéntanos desde dónde vuelas, quién viene, tu presupuesto y qué te importa. Lo compararemos con honestidad frente a otras opciones.",
        )}
      </p>
      <Link
        href={decideHref(season)}
        onClick={() => trackStoryClick("story_to_decide", season.slug)}
        className="mt-4 inline-flex h-11 items-center gap-2 rounded-md bg-primary px-4 text-sm font-extrabold text-primary-foreground shadow-sm transition hover:-translate-y-0.5"
      >
        <Compass className="h-4 w-4" aria-hidden />
        {ui(
          `Build my ${place} decision`,
          `生成我的${place}决策`,
          `내 ${place} 결정 만들기`,
          `Crear mi decisión sobre ${place}`,
        )}
      </Link>
    </section>
  )
}

function EpisodeList({ season, episodes, currentSlug }: Readonly<{ season: StorySeason; episodes: string[]; currentSlug?: string }>) {
  const { t, ui } = useStoryText()
  return (
    <ol className="grid gap-2">
      {season.episodes.map((episode) => {
        const linked = episodes.includes(episode.slug)
        const current = episode.slug === currentSlug
        const body = (
          <>
            <span className="w-12 shrink-0 text-xs font-extrabold text-primary">{episodeLabel(episode)}</span>
            <span className="min-w-0 flex-1">
              <span className="block font-bold">{t(episode.title)}</span>
              <span className="mt-0.5 block text-sm text-muted-foreground">{t(episode.dek)}</span>
            </span>
            {!linked ? (
              <span className="shrink-0 text-xs font-semibold text-muted-foreground">
                {ui("Coming soon", "即将推出", "곧 공개", "Próximamente")}
              </span>
            ) : null}
            {linked && episode.status === "draft" ? (
              <span className="shrink-0 rounded bg-amber-200/70 text-amber-900 px-1.5 py-0.5 text-[0.65rem] font-bold uppercase">draft</span>
            ) : null}
          </>
        )
        const className = cn(
          "flex items-start gap-3 rounded-md border border-border bg-card p-3 transition",
          current && "border-primary/50 bg-primary/5",
          linked && !current && "hover:border-primary/40"
        )
        return (
          <li key={episode.slug}>
            {linked && !current ? (
              <Link href={`/stories/${season.slug}/${episode.slug}`} className={className}>
                {body}
              </Link>
            ) : (
              <div className={cn(className, !linked && "opacity-70")} aria-current={current ? "page" : undefined}>
                {body}
              </div>
            )}
          </li>
        )
      })}
    </ol>
  )
}

/** City layer entry from a story season (ADR 0008 §1.2), when that city has a guide. */
function CityGuideCta({ season }: Readonly<{ season: StorySeason }>) {
  const { t } = useStoryText()
  const { messages } = useLocale()
  const city = citiesForDestinations([season.destination])[0]
  if (!city) return null
  return (
    <Link
      href={`/city/${city.slug}`}
      className="mt-6 flex items-center gap-3 rounded-md border border-border bg-card p-4 text-sm font-extrabold shadow-sm transition hover:border-primary/40"
    >
      <MapIcon className="h-5 w-5 shrink-0 text-primary" aria-hidden />
      <span>{fill(messages.city.fromStory, { city: t(city.name) })} →</span>
    </Link>
  )
}

export function SeasonView({ season, linkable }: Readonly<{ season: StorySeason; linkable: string[] }>) {
  const { t, ui } = useStoryText()
  return (
    <main className="flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-12">
      <div className="mx-auto max-w-3xl">
        <header>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
            {ui("Travel Stories · Season 1", "旅行故事 · 第一季", "여행 이야기 · 시즌 1", "Historias de viaje · Temporada 1")}
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">{t(season.title)}</h1>
          <p className="mt-2 font-display text-xl italic text-muted-foreground">{t(season.subtitle)}</p>
        </header>
        <div className="mt-6 flex justify-center">
          <StoryImage photo={season.cover} priority />
        </div>
        <p className="mt-6 text-lg leading-relaxed text-foreground/90">{t(season.intro)}</p>
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wide text-muted-foreground">
            {ui("Episodes", "分集", "에피소드", "Episodios")}
          </h2>
          <EpisodeList season={season} episodes={linkable} />
        </section>
        <CityGuideCta season={season} />
        <DecideCta season={season} />
      </div>
    </main>
  )
}

export function EpisodeView({
  season,
  episode,
  linkable,
}: Readonly<{ season: StorySeason; episode: StoryEpisode; linkable: string[] }>) {
  const { t, ui } = useStoryText()
  const index = season.episodes.findIndex((item) => item.slug === episode.slug)
  const next = season.episodes.slice(index + 1).find((item) => linkable.includes(item.slug))
  const prev = season.episodes.slice(0, index).reverse().find((item) => linkable.includes(item.slug))

  return (
    <main className="flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-12">
      <article className="mx-auto max-w-3xl">
        <Link href={`/stories/${season.slug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {t(season.title)}
        </Link>
        <header className="mt-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
            {episodeLabel(episode)} · {t(season.title)}
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">{t(episode.title)}</h1>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{t(episode.dek)}</p>
        </header>
        <figure className="mt-6 flex flex-col items-center">
          {episode.heroVideo ? (
            <video
              controls
              playsInline
              preload="metadata"
              poster={episode.heroVideo.poster.src ? `${episode.heroVideo.poster.src}-800.webp` : undefined}
              width={episode.heroVideo.poster.width}
              height={episode.heroVideo.poster.height}
              className="mx-auto h-auto max-h-[min(70vh,28rem)] w-auto max-w-full rounded-md bg-black"
            >
              <source src={episode.heroVideo.src} type="video/mp4" />
            </video>
          ) : (
            <StoryImage photo={episode.cover} priority />
          )}
          {(episode.heroVideo?.poster.caption ?? episode.cover.caption) ? (
            <figcaption className="mt-2 max-w-[22rem] text-center text-sm text-muted-foreground">
              {t(episode.heroVideo?.poster.caption ?? episode.cover.caption!)}
            </figcaption>
          ) : null}
        </figure>

        <div className="mt-4">
          {episode.blocks.map((block, blockIndex) => (
            <Block key={blockIndex} block={block} />
          ))}
        </div>

        {next ? (
          <Link
            href={`/stories/${season.slug}/${next.slug}`}
            className="mt-12 flex items-center justify-between gap-4 rounded-md border border-border bg-card p-4 transition hover:border-primary/40"
          >
            <span>
              <span className="block text-xs font-extrabold uppercase tracking-wide text-primary">
                {ui("Next", "下一集", "다음", "Siguiente")} · {episodeLabel(next)}
              </span>
              <span className="mt-1 block font-display text-xl font-bold">{t(next.title)}</span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 text-primary" aria-hidden />
          </Link>
        ) : null}
        {prev && !next ? (
          <Link href={`/stories/${season.slug}/${prev.slug}`} className="mt-12 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {episodeLabel(prev)} · {t(prev.title)}
          </Link>
        ) : null}

        <DecideCta season={season} />

        <section className="mt-12">
          <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wide text-muted-foreground">
            {ui("All episodes", "全部分集", "전체 에피소드", "Todos los episodios")}
          </h2>
          <EpisodeList season={season} episodes={linkable} currentSlug={episode.slug} />
        </section>
      </article>
    </main>
  )
}

export function StoriesIndexView({ seasons }: Readonly<{ seasons: { season: StorySeason; count: number }[] }>) {
  const { t, ui } = useStoryText()
  return (
    <main className="flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-12">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
          {ui("Travel Stories", "旅行故事", "여행 이야기", "Historias de viaje")}
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">
          {ui("Real trips, honest takeaways", "真实的旅行，诚实的结论", "진짜 여행, 솔직한 결론", "Viajes reales, conclusiones honestas")}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          {ui(
            "First-hand stories from places I actually spent time in — then a way to decide whether they fit your trip.",
            "来自我真正待过的地方的第一手故事——然后帮你判断它们是否适合你的旅行。",
            "내가 실제로 머문 곳의 직접 겪은 이야기 — 그다음 당신 여행에 맞는지 판단하는 방법.",
            "Relatos en primera persona de sitios donde estuve de verdad — y luego una forma de decidir si encajan en tu viaje.",
          )}
        </p>
        <div className="mt-8 grid gap-4">
          {seasons.map(({ season, count }) => (
            <Link key={season.slug} href={`/stories/${season.slug}`} className="block overflow-hidden rounded-md border border-border bg-card transition hover:border-primary/40">
              <StoryImage photo={season.cover} className="max-h-56 w-full rounded-none object-cover" sizes="(min-width: 768px) 40rem, 100vw" />
              <div className="p-4">
                <p className="font-display text-2xl font-bold">{t(season.title)}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t(season.subtitle)} · {count}{" "}
                  {ui(count === 1 ? "episode" : "episodes", "集", count === 1 ? "화" : "화", count === 1 ? "episodio" : "episodios")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
