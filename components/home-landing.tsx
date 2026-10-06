"use client"

import Image from "next/image"
import Link from "next/link"
import { track } from "@vercel/analytics"
import {
  ArrowRight,
  BedDouble,
  CheckCircle2,
  ChevronRight,
  Compass,
  HelpCircle,
  Map,
  MapPin,
  MessageSquareText,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  Wallet,
  XCircle,
} from "lucide-react"
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react"
import { useLocale } from "@/components/locale-provider"
import {
  decideSteps,
  homeCopy,
  homeFaq,
  homeFeatures,
  homePlaces,
  homeQuestions,
  hongKongEntries,
  howSteps,
  introQuestions,
  searchSteps,
} from "@/lib/content/home-landing"
import { pickLocalized } from "@/lib/content/types"
import { cn } from "@/lib/utils"

const introIcons = [BedDouble, Sparkles, Wallet, Users, XCircle] as const
const howIcons = [MessageSquareText, Scale, CheckCircle2] as const
const questionIcons = [MapPin, Sparkles, BedDouble, Users, Wallet, HelpCircle, Scale, Map, Compass] as const

function textOf(value: Parameters<typeof pickLocalized>[0], locale: Parameters<typeof pickLocalized>[1]) {
  return pickLocalized(value, locale)
}

function ScrollIn({ children, className, delayMs = 0 }: { children: ReactNode; className?: string; delayMs?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible")
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible")
          observer.disconnect()
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={cn("home-scroll-in", className)} style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}>
      {children}
    </div>
  )
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION)
  media.addEventListener("change", onChange)
  return () => media.removeEventListener("change", onChange)
}

function HowStepsPlay({ t }: { t: (value: Parameters<typeof pickLocalized>[0]) => string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [litCount, setLitCount] = useState(0)
  const [active, setActive] = useState<number | null>(null)
  const [manual, setManual] = useState(false)
  // Reduced motion shows every step lit at once; false on the server so hydration matches.
  const reduced = useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(REDUCED_MOTION).matches, () => false)
  const isPlaying = playing || reduced || manual
  const shownCount = reduced || manual ? howSteps.length : litCount

  useEffect(() => {
    const el = ref.current
    if (!el || reduced || manual) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced, manual])

  useEffect(() => {
    if (!playing || reduced || manual) return
    const timers = howSteps.map((_, index) =>
      window.setTimeout(() => setLitCount(index + 1), 280 + index * 420)
    )
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [playing, reduced, manual])

  function selectStep(index: number) {
    setManual(true)
    setActive(index)
    setLitCount(howSteps.length)
    setPlaying(true)
  }

  return (
    <div ref={ref} className={cn("home-how", isPlaying && "is-playing")}>
      <ol className="relative mt-8 grid gap-4 lg:grid-cols-3 lg:gap-5">
        <span
          className="home-how-line pointer-events-none absolute left-[16%] right-[16%] top-9 hidden h-0.5 bg-primary/50 lg:block"
          aria-hidden
        />
        {howSteps.map((step, index) => {
          const Icon = howIcons[index] ?? CheckCircle2
          const lit = index < shownCount
          const focused = active === index
          return (
            <li key={step.title.en} className="relative">
              <button
                type="button"
                onClick={() => selectStep(index)}
                aria-pressed={focused}
                className={cn(
                  "card-hover home-how-step w-full rounded-2xl border border-border/80 bg-[color-mix(in_oklch,var(--primary)_5%,var(--card))] p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  lit && "is-lit",
                  focused && "border-primary/50 shadow-[0_10px_28px_color-mix(in_oklch,var(--primary)_14%,transparent)]"
                )}
              >
                <span
                  className={cn(
                    "relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full text-primary-foreground shadow-[0_6px_16px_color-mix(in_oklch,var(--primary)_25%,transparent)] motion-safe:transition",
                    lit || focused ? "bg-primary scale-105" : "bg-primary/55"
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                  <span className="sr-only">{index + 1}</span>
                </span>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{t(step.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(step.body)}</p>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}


const heroSlides = [
  {
    src: "/assets/home-hero-hong-kong.webp",
    alt: homeCopy.heroAlt,
    place: homeCopy.heroPlace,
    placeDetail: homeCopy.heroPlaceDetail,
    objectPosition: "72% 52%",
    mobileObjectPosition: "78% 42%",
  },
  {
    src: "/assets/home-hero-tokyo.webp",
    alt: homeCopy.heroTokyoAlt,
    place: homeCopy.heroPlaceTokyo,
    placeDetail: homeCopy.heroPlaceTokyoDetail,
    objectPosition: "50% 50%",
    mobileObjectPosition: "50% 38%",
  },
  {
    src: "/assets/home-hero-seoul.webp",
    alt: homeCopy.heroSeoulAlt,
    place: homeCopy.heroPlaceSeoul,
    placeDetail: homeCopy.heroPlaceSeoulDetail,
    objectPosition: "50% 50%",
    mobileObjectPosition: "50% 40%",
  },
  {
    src: "/assets/home-hero-los-cabos.webp",
    alt: homeCopy.heroLosCabosAlt,
    place: homeCopy.heroPlaceCabo,
    placeDetail: homeCopy.heroPlaceCaboDetail,
    objectPosition: "45% 50%",
    mobileObjectPosition: "50% 42%",
  },
] as const

const HERO_INTERVAL_MS = 4500

function HeroCarousel({
  labelFor,
}: {
  labelFor: (value: Parameters<typeof pickLocalized>[0]) => string
}) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (media.matches || paused) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length)
    }, HERO_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [paused, index])

  const activeSlide = heroSlides[index]

  return (
    <div className="w-full">
      <section className="home-hero-full relative w-full overflow-hidden">
        <div className="home-hero-media relative w-full">
          {heroSlides.map((slide, slideIndex) => {
            const active = slideIndex === index
            return (
              <div
                key={slide.src}
                className={cn(
                  "absolute inset-0 motion-safe:transition-opacity motion-safe:duration-700",
                  active ? "opacity-100" : "opacity-0"
                )}
                aria-hidden={!active}
              >
                <Image
                  src={slide.src}
                  alt={active ? labelFor(slide.alt) : ""}
                  fill
                  priority={slideIndex === 0}
                  quality={95}
                  unoptimized
                  sizes="100vw"
                  aria-hidden={!active}
                  style={
                    {
                      "--hero-position-desktop": slide.objectPosition,
                      "--hero-position-mobile": slide.mobileObjectPosition,
                    } as CSSProperties
                  }
                  className="home-hero-slide-img object-cover"
                />

              </div>
            )
          })}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--background)_18%,transparent)_0%,transparent_55%,color-mix(in_oklch,var(--background)_35%,transparent)_100%)] sm:bg-[linear-gradient(105deg,color-mix(in_oklch,var(--background)_72%,transparent)_0%,color-mix(in_oklch,var(--background)_36%,transparent)_36%,transparent_68%)]"
          />
          <p className="pointer-events-none absolute right-3 top-3 z-10 sm:bottom-5 sm:right-5 sm:top-auto lg:right-6">
            <span className="inline-flex max-w-[10.5rem] items-start gap-1.5 rounded-lg border border-border/60 bg-background/80 px-2 py-1 text-left text-foreground shadow-sm backdrop-blur-sm sm:max-w-none sm:rounded-xl sm:px-2.5 sm:py-1.5">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary sm:h-4 sm:w-4" aria-hidden />
              <span>
                <span className="block text-xs font-bold leading-tight sm:text-sm">{labelFor(activeSlide.place)}</span>
                <span className="block text-[0.7rem] font-medium leading-tight text-muted-foreground sm:text-xs">
                  {labelFor(activeSlide.placeDetail)}
                </span>
              </span>
            </span>
          </p>
        </div>
        <div className="home-hero-copy relative z-10 mx-auto w-full max-w-6xl border-t border-border/70 bg-background px-4 py-4 sm:absolute sm:inset-0 sm:flex sm:flex-col sm:justify-center sm:border-0 sm:bg-transparent sm:px-6 sm:pb-10 sm:pt-14 lg:px-8">
          <div className="max-w-xl">
            <p className="home-reveal home-reveal-delay-1 mb-1.5 inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted-foreground sm:mb-3 sm:text-xs sm:text-foreground sm:[text-shadow:0_1px_2px_color-mix(in_oklch,var(--background)_85%,transparent)]">
              <Compass className="h-3.5 w-3.5 text-primary" aria-hidden />
              XingAI Travel
            </p>
            <h1 className="home-reveal hero-display-title text-[1.55rem] font-semibold leading-[1.12] tracking-tight sm:text-5xl sm:leading-[1.15] sm:[text-shadow:0_1px_3px_color-mix(in_oklch,var(--background)_88%,transparent)]">
              <span className="block text-foreground">{labelFor(homeCopy.headlineLead)}</span>
              <span className="mt-0.5 block text-primary sm:mt-1">{labelFor(homeCopy.headlineAccent)}</span>
            </h1>
            <p className="home-reveal home-reveal-delay-1 mt-2.5 max-w-xl text-sm leading-snug text-muted-foreground sm:mt-4 sm:hidden">
              {labelFor(homeCopy.control)}
            </p>
            <p className="home-reveal home-reveal-delay-1 mt-4 hidden max-w-xl text-lg leading-relaxed text-foreground [text-shadow:0_1px_2px_color-mix(in_oklch,var(--background)_75%,transparent)] sm:block">
              {labelFor(homeCopy.support)}
            </p>
            <div className="home-reveal home-reveal-delay-2 mt-4 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:gap-3">
              <Link
                href="/decide"
                onClick={() => track("home_hero_decide", { target: "/decide" })}
                className="home-cta-pulse inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-center text-sm font-bold text-primary-foreground shadow-[0_8px_20px_color-mix(in_oklch,var(--primary)_28%,transparent)] motion-safe:transition hover:brightness-105 sm:h-12 sm:px-6"
              >
                {labelFor(homeCopy.primaryCta)}
                <ArrowRight className="home-cta-arrow h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/guides"
                onClick={() => track("home_secondary", { target: "/guides" })}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-foreground/25 bg-background/35 px-5 text-center text-sm font-bold text-foreground backdrop-blur-[1px] motion-safe:transition hover:border-primary/50 sm:h-12 sm:border-foreground/20 sm:bg-card/90 sm:px-6 sm:shadow-[0_8px_20px_color-mix(in_oklch,var(--foreground)_8%,transparent)] sm:backdrop-blur-sm"
              >
                <Map className="h-4 w-4 text-primary" aria-hidden />
                {labelFor(homeCopy.secondaryCta)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div
        className="mx-auto w-full max-w-6xl px-4 pt-3 sm:px-6 sm:pt-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div
          className="mx-auto flex w-full max-w-md gap-1.5"
          role="tablist"
          aria-label="Hero slides"
        >
          {heroSlides.map((slide, slideIndex) => {
            const active = slideIndex === index
            return (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-label={labelFor(slide.alt)}
                aria-selected={active}
                aria-current={active ? "true" : undefined}
                onClick={() => setIndex(slideIndex)}
                className="inline-flex h-11 min-w-0 flex-1 items-center justify-center"
              >
                <span
                  className={cn(
                    "block h-1 w-full rounded-full motion-safe:transition-[background-color] motion-safe:duration-300",
                    active
                      ? "bg-primary"
                      : "bg-border hover:bg-muted-foreground/40"
                  )}
                />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function HomeLanding() {
  const { locale } = useLocale()
  const t = (value: Parameters<typeof pickLocalized>[0]) => textOf(value, locale)

  const heroChips = [
    { label: homeCopy.heroChipCompare, icon: Scale },
    { label: homeCopy.heroChipTradeoffs, icon: Sparkles },
    { label: homeCopy.heroChipYouDecide, icon: ShieldCheck },
  ] as const

  return (
    <main className="w-full pb-8 sm:pb-12">
      <HeroCarousel labelFor={t} />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <section className="mt-8 sm:mt-10" aria-label={t(homeCopy.control)}>
          <ul className="flex flex-wrap gap-2">
            {heroChips.map((chip) => {
              const Icon = chip.icon
              return (
                <li
                  key={chip.label.en}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground"
                >
                  <Icon className="h-3.5 w-3.5 text-primary" aria-hidden />
                  {t(chip.label)}
                </li>
              )
            })}
          </ul>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t(homeCopy.control)}</p>
        </section>

      <section className="mt-12 border-t border-border pt-8" aria-labelledby="home-places">
        <ScrollIn>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="home-places" className="hero-display-title text-2xl font-semibold tracking-tight sm:text-3xl">
              {t(homeCopy.placesTitle)}
            </h2>
            <Link
              href="/city"
              onClick={() => track("home_destination", { id: "all-cities", target: "/city" })}
              className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary"
            >
              {t(homeCopy.placesAllCta)}
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{t(homeCopy.placesNote)}</p>
        </ScrollIn>
        <ul className="mt-5 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {homePlaces.map((place, index) => (
            <li key={place.id} className="flex h-full min-h-0">
              <ScrollIn delayMs={index * 50} className="flex h-full w-full min-h-0 flex-col">
                {place.soon || !place.image ? (
                  <article className="card-hover flex h-full flex-col overflow-hidden rounded-2xl border border-dashed border-border bg-card">
                    {place.image ? (
                      <div className="relative aspect-[16/10] shrink-0">
                        <Image src={place.image} alt="" fill quality={90} sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                      </div>
                    ) : null}
                    <div className="flex min-h-[7.5rem] flex-1 flex-col px-4 py-3">
                      <h3 className="text-lg font-semibold">{t(place.label)}</h3>
                      <p className="mt-0.5 line-clamp-2 min-h-[2.5rem] text-sm text-muted-foreground">{t(place.detail)}</p>
                      <p className="mt-auto pt-2 text-sm font-semibold text-muted-foreground">{t(homeCopy.soon)}</p>
                    </div>
                  </article>
                ) : (
                  <Link
                    href={place.href}
                    onClick={() => track("home_destination", { id: place.id, target: place.href })}
                    className="card-hover card-hover-media group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
                  >
                    <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
                      <Image
                        src={place.image}
                        alt=""
                        fill
                        quality={90}
                        sizes="(min-width: 1024px) 25vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex min-h-[7.5rem] flex-1 items-end gap-3 px-4 py-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold">{t(place.label)}</h3>
                        <p className="mt-0.5 line-clamp-2 min-h-[2.5rem] text-sm text-muted-foreground">{t(place.detail)}</p>
                      </div>
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-full border border-border text-primary motion-safe:transition group-hover:border-primary group-hover:bg-primary/5">
                        <ChevronRight className="h-4 w-4" aria-hidden />
                      </span>
                    </div>
                  </Link>
                )}
              </ScrollIn>
            </li>
          ))}
        </ul>
      </section>

      {/* Positioning right after destinations — answer “why not just search?” before How */}
      <section className="mt-14 border-t border-border pt-10" aria-labelledby="home-search-vs-decide">
        <ScrollIn>
          <h2 id="home-search-vs-decide" className="max-w-3xl hero-display-title text-2xl font-semibold tracking-tight sm:text-4xl">
            <span className="block text-foreground">{t(homeCopy.whyHeadlineLead)}</span>
            <span className="mt-1 block text-primary">{t(homeCopy.whyHeadlineAccent)}</span>
          </h2>
        </ScrollIn>
        <div className="relative mt-8 grid gap-4 md:grid-cols-2 md:gap-6">
          <ScrollIn>
            <article className="card-hover h-full rounded-2xl border border-border/80 bg-muted/30 px-5 py-6 sm:px-6">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                <Search className="h-3.5 w-3.5" aria-hidden />
                {t(homeCopy.searchLabel)}
              </p>
              <ol className="mt-5 space-y-4">
                {searchSteps.map((step, index) => (
                  <li key={step.en} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-[0.7rem] font-semibold">
                      {index + 1}
                    </span>
                    <span className="text-base leading-snug">{t(step)}</span>
                  </li>
                ))}
              </ol>
            </article>
          </ScrollIn>
          <ScrollIn delayMs={80}>
            <article className="card-hover h-full rounded-2xl border border-primary/35 bg-[color-mix(in_oklch,var(--primary)_8%,var(--card))] px-5 py-6 shadow-[0_12px_32px_color-mix(in_oklch,var(--primary)_12%,transparent)] sm:px-6">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                <Compass className="h-3.5 w-3.5" aria-hidden />
                {t(homeCopy.decideLabel)}
              </p>
              <ol className="mt-5 space-y-4">
                {decideSteps.map((step, index) => (
                  <li key={step.en} className="flex items-start gap-3 text-foreground">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[0.7rem] font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                    <span className="text-base font-semibold leading-snug">{t(step)}</span>
                  </li>
                ))}
              </ol>
            </article>
          </ScrollIn>
          <span
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-primary shadow-sm md:flex"
            aria-hidden
          >
            <ArrowRight className="home-cta-arrow h-4 w-4" />
          </span>
        </div>
      </section>

      <section className="mt-10 border-t border-border pt-8" aria-labelledby="home-features">
        <h2 id="home-features" className="sr-only">
          {t(homeCopy.featuresLabel)}
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homeFeatures.map((feature, index) => {
            const Icon = [Compass, Scale, Map, Ticket][index] ?? Compass
            return (
              <li key={feature.title.en}>
                <ScrollIn delayMs={index * 60}>
                  <div className="flex gap-3">
                    <span className="home-feature-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-primary shadow-sm">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold leading-snug">{t(feature.title)}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(feature.body)}</p>
                    </div>
                  </div>
                </ScrollIn>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="home-hk-start">
        <ScrollIn>
          <div className="mx-auto max-w-3xl">
            <h2 id="home-hk-start" className="hero-display-title text-2xl font-semibold tracking-tight sm:text-3xl">
              {t(homeCopy.hkTitle)}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t(homeCopy.hkBody)}</p>
          </div>
        </ScrollIn>

        <ScrollIn delayMs={40}>
          <div className="relative mt-6 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-muted sm:aspect-[21/9]">
            <Image
              src="/assets/home-hero-harbour-v2.webp"
              alt={t(homeCopy.heroHarbourAlt)}
              fill
              quality={90}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </ScrollIn>

        <ScrollIn delayMs={80}>
          <div className="mx-auto mt-6 flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/city/hong-kong"
              onClick={() => track("home_destination", { id: "hk-guide", target: "/city/hong-kong" })}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-sm motion-safe:transition hover:opacity-90"
            >
              {t(homeCopy.hkPrimaryCta)}
              <ArrowRight className="home-cta-arrow h-4 w-4" aria-hidden />
            </Link>
            <ul className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-1 sm:gap-y-1">
              {hongKongEntries
                .filter((item) => item.id !== "hk-guide")
                .map((item, index, list) => (
                  <li key={item.id} className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={() => track("home_destination", { id: item.id, target: item.href })}
                      className="inline-flex min-h-11 items-center gap-1 px-1 text-sm font-semibold text-foreground underline-offset-4 hover:text-primary hover:underline"
                    >
                      {t(item.label)}
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                    </Link>
                    {index < list.length - 1 ? (
                      <span className="mx-1 hidden text-muted-foreground/50 sm:inline" aria-hidden>
                        ·
                      </span>
                    ) : null}
                  </li>
                ))}
            </ul>
          </div>
        </ScrollIn>
      </section>

      <section className="mt-14 border-t border-border pt-10">
        <ScrollIn>
          <div className="overflow-hidden rounded-2xl border border-border bg-[color-mix(in_oklch,var(--primary)_6%,var(--card))]">
            <div className="grid gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-12">
              <div>
                <h2 className="hero-display-title text-2xl font-semibold tracking-tight sm:text-4xl">{t(homeCopy.introTitle)}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{t(homeCopy.introLead)}</p>
                <p className="mt-4 text-base font-semibold leading-relaxed text-foreground sm:text-lg">{t(homeCopy.introClose)}</p>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {introQuestions.map((question, index) => {
                  const Icon = introIcons[index] ?? HelpCircle
                  return (
                    <li
                      key={question.en}
                      className="card-hover flex min-h-12 items-center gap-3 rounded-xl border border-border/80 bg-card/90 px-4 py-3 text-sm font-semibold text-foreground shadow-sm"
                    >
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      {t(question)}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </ScrollIn>
      </section>

      <section className="mt-14 border-t border-border pt-10">
        <ScrollIn>
          <div className="rounded-2xl border border-border bg-card px-5 py-8 sm:px-8 sm:py-10">
            <h2 className="hero-display-title max-w-xl text-2xl font-semibold tracking-tight sm:text-4xl">{t(homeCopy.howTitle)}</h2>
            <HowStepsPlay t={t} />
            <div className="mt-8 flex flex-col items-stretch gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground sm:max-w-md">{t(homeCopy.control)}</p>
              <Link
                href="/decide"
                onClick={() => track("home_how_decide", { target: "/decide" })}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-[0_8px_20px_color-mix(in_oklch,var(--primary)_28%,transparent)]"
              >
                {t(homeCopy.howCta)}
                <ArrowRight className="home-cta-arrow h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </ScrollIn>
      </section>

      <section className="mt-14 border-t border-border pt-10">
        <ScrollIn>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="hero-display-title text-2xl font-semibold tracking-tight sm:text-3xl">{t(homeCopy.questionsTitle)}</h2>
            <Link
              href="/faq"
              onClick={() => track("home_question", { id: "more", target: "/faq" })}
              className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary"
            >
              {t(homeCopy.questionsMore)}
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{t(homeCopy.questionsNote)}</p>
        </ScrollIn>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {homeQuestions.map((item, index) => {
            const Icon = questionIcons[index % questionIcons.length] ?? HelpCircle
            return (
              <li key={item.id}>
                <ScrollIn delayMs={(index % 4) * 40}>
                  <Link
                    href={item.href}
                    onClick={() => track("home_question", { id: item.id, target: item.href })}
                    className="card-hover flex h-full min-h-24 gap-3 rounded-2xl border border-border bg-card px-4 py-4 text-sm font-semibold leading-snug text-foreground"
                  >
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span>{t(item.label)}</span>
                  </Link>
                </ScrollIn>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="mt-14 overflow-hidden rounded-2xl border border-border" aria-labelledby="home-why">
        <ScrollIn>
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-64 lg:min-h-[22rem]">
              <Image
                src="/assets/home-hero-hong-kong.webp"
                alt={t(homeCopy.whyPhotoAlt)}
                fill
                quality={90}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[70%_center]"
              />
            </div>
            <div className="bg-[oklch(0.94_0.03_230)] px-6 py-8 dark:bg-[oklch(0.24_0.04_245)] sm:px-8 sm:py-10">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden />
                {t(homeCopy.whyEyebrow)}
              </p>
              <h2 id="home-why" className="mt-3 hero-display-title text-2xl font-semibold tracking-tight sm:text-3xl">
                {t(homeCopy.whyTitle)}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">{t(homeCopy.whyBody)}</p>
            </div>
          </div>
        </ScrollIn>
      </section>

      <section className="mt-14 border-t border-border pt-10">
        <ScrollIn>
          <h2 className="hero-display-title text-2xl font-semibold tracking-tight sm:text-3xl">{t(homeCopy.faqTitle)}</h2>
          <div className="mt-4 grid gap-3">
            {homeFaq.map((item) => (
              <details key={item.q.en} className="card-hover group rounded-2xl border border-border bg-card px-4 py-3 open:border-primary/40">
                <summary className="flex cursor-pointer list-none items-center gap-3 text-base font-semibold [&::-webkit-details-marker]:hidden">
                  <HelpCircle className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span className="flex-1">{t(item.q)}</span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground motion-safe:transition group-open:rotate-90" aria-hidden />
                </summary>
                <p className="mt-2 pl-7 text-sm leading-relaxed text-muted-foreground">{t(item.a)}</p>
              </details>
            ))}
          </div>
        </ScrollIn>
      </section>

      <section className="mt-14 border-t border-border py-10">
        <ScrollIn>
          <h2 className="hero-display-title text-2xl font-semibold tracking-tight sm:text-4xl">{t(homeCopy.finalTitle)}</h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">{t(homeCopy.finalBody)}</p>
          <Link
            href="/decide"
            onClick={() => track("home_final_decide", { target: "/decide" })}
            className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-[0_8px_20px_color-mix(in_oklch,var(--primary)_28%,transparent)]"
          >
            {t(homeCopy.primaryCta)}
            <ArrowRight className="home-cta-arrow h-4 w-4" aria-hidden />
          </Link>
        </ScrollIn>
      </section>
      </div>
    </main>
  )
}
