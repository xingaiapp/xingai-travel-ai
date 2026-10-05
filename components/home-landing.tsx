"use client"

import Image from "next/image"
import Link from "next/link"
import { track } from "@vercel/analytics"
import { ArrowRight, ChevronRight, Compass, Map, Scale, Search, Ticket } from "lucide-react"
import { useEffect, useState } from "react"
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

const heroSlides = [
  { src: "/assets/home-hero-hong-kong.webp", alt: homeCopy.heroAlt },
  { src: "/assets/home-hero-tokyo.webp", alt: homeCopy.heroTokyoAlt },
  { src: "/assets/home-hero-seoul.webp", alt: homeCopy.heroSeoulAlt },
  { src: "/assets/home-hero-los-cabos.webp", alt: homeCopy.heroLosCabosAlt },
] as const

const HERO_INTERVAL_MS = 7000

function textOf(value: Parameters<typeof pickLocalized>[0], locale: Parameters<typeof pickLocalized>[1]) {
  return pickLocalized(value, locale)
}

function HeroCarousel({ labelFor }: { labelFor: (alt: (typeof heroSlides)[number]["alt"]) => string }) {
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

  return (
    <>
      {heroSlides.map((slide, slideIndex) => {
        const active = slideIndex === index
        return (
          <Image
            key={slide.src}
            src={slide.src}
            alt={active ? labelFor(slide.alt) : ""}
            fill
            priority={slideIndex === 0}
            sizes="100vw"
            aria-hidden={!active}
            className={cn(
              "object-cover object-[70%_center] motion-safe:transition-opacity motion-safe:duration-700",
              active ? "opacity-100" : "opacity-0"
            )}
          />
        )
      })}
      <div
        className="absolute bottom-4 right-4 z-10 flex gap-1"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {heroSlides.map((slide, slideIndex) => {
          const active = slideIndex === index
          return (
            <button
              key={slide.src}
              type="button"
              aria-label={labelFor(slide.alt)}
              aria-current={active ? "true" : undefined}
              onClick={() => setIndex(slideIndex)}
              className="inline-flex h-11 w-11 items-center justify-center"
            >
              <span
                className={cn(
                  "block h-2.5 w-2.5 rounded-full border border-foreground/30",
                  active ? "bg-primary" : "bg-background/80"
                )}
              />
            </button>
          )
        })}
      </div>
    </>
  )
}

export function HomeLanding() {
  const { locale } = useLocale()
  const t = (value: Parameters<typeof pickLocalized>[0]) => textOf(value, locale)

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6 sm:pb-12">
      <section className="relative -mx-4 overflow-hidden sm:-mx-6 lg:min-h-[26rem]">
        <HeroCarousel labelFor={t} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--background)_35%,transparent)_0%,transparent_60%)] lg:bg-[linear-gradient(90deg,color-mix(in_oklch,var(--background)_45%,transparent)_0%,transparent_55%)]"
        />
        <div className="relative px-4 pb-32 pt-8 sm:px-6 lg:flex lg:min-h-[26rem] lg:max-w-2xl lg:flex-col lg:justify-center lg:px-6 lg:pb-12 lg:pt-12">
          <div className="max-w-xl">
          <h1 className="hero-display-title text-[1.85rem] font-semibold leading-[1.15] tracking-tight text-foreground [text-shadow:0_1px_2px_color-mix(in_oklch,var(--background)_75%,transparent)] sm:text-5xl">
            {t(homeCopy.headline)}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground [text-shadow:0_1px_2px_color-mix(in_oklch,var(--background)_70%,transparent)] sm:text-lg">{t(homeCopy.support)}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/decide"
              onClick={() => track("home_hero_decide", { target: "/decide" })}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-center text-sm font-bold text-primary-foreground shadow-[0_8px_20px_color-mix(in_oklch,var(--primary)_28%,transparent)]"
            >
              {t(homeCopy.primaryCta)}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/guides"
              onClick={() => track("home_secondary", { target: "/guides" })}
              className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/25 bg-card px-6 text-center text-sm font-bold text-foreground shadow-[0_8px_20px_color-mix(in_oklch,var(--foreground)_8%,transparent)]"
            >
              {t(homeCopy.secondaryCta)}
            </Link>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground [text-shadow:0_1px_2px_color-mix(in_oklch,var(--background)_70%,transparent)]">{t(homeCopy.control)}</p>
          </div>
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
              <li key={feature.title.en} className="flex gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-card text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-sm font-bold leading-snug">{t(feature.title)}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(feature.body)}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="mt-12 border-t border-border pt-8" aria-labelledby="home-places">
        <h2 id="home-places" className="hero-display-title text-2xl font-semibold tracking-tight sm:text-3xl">
          {t(homeCopy.placesTitle)}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{t(homeCopy.placesNote)}</p>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homePlaces.map((place) => (
            <li key={place.id}>
              {place.soon || !place.image ? (
                <article className="flex h-full flex-col overflow-hidden rounded-md border border-dashed border-border bg-card">
                  {place.image ? (
                    <div className="relative aspect-[16/10]">
                      <Image src={place.image} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col justify-between px-4 py-3">
                    <div>
                      <h3 className="text-lg font-semibold">{t(place.label)}</h3>
                      <p className="text-sm text-muted-foreground">{t(place.detail)}</p>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-muted-foreground">{t(homeCopy.soon)}</p>
                  </div>
                </article>
              ) : (
                <Link
                  href={place.href}
                  onClick={() => track("home_destination", { id: place.id, target: place.href })}
                  className="flex h-full flex-col overflow-hidden rounded-md border border-border bg-card"
                >
                  <div className="relative aspect-[16/10]">
                    <Image src={place.image} alt="" fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover" />
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold">{t(place.label)}</h3>
                      <p className="text-sm text-muted-foreground">{t(place.detail)}</p>
                    </div>
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border">
                      <ChevronRight className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-8 overflow-hidden rounded-md border border-border bg-card">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-52 sm:min-h-60 lg:min-h-[18rem]">
              <Image
                src="/assets/home-hero-harbour-v2.webp"
                alt={t(homeCopy.heroHarbourAlt)}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
              />
            </div>
            <div className="px-5 py-6 sm:px-6">
              <h3 className="text-xl font-semibold">{t(homeCopy.hkTitle)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(homeCopy.hkBody)}</p>
              <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {hongKongEntries.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={() => track("home_destination", { id: item.id, target: item.href })}
                      className="inline-flex min-h-11 items-center rounded-md border border-border bg-background px-4 text-sm font-semibold hover:border-primary"
                    >
                      {t(item.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14 border-t border-border pt-10">
        <div className="overflow-hidden rounded-2xl border border-border bg-[color-mix(in_oklch,var(--primary)_6%,var(--card))]">
          <div className="grid gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-12">
            <div>
              <h2 className="hero-display-title text-2xl font-semibold tracking-tight sm:text-4xl">{t(homeCopy.introTitle)}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{t(homeCopy.introLead)}</p>
              <p className="mt-4 text-base font-semibold leading-relaxed text-foreground sm:text-lg">{t(homeCopy.introClose)}</p>
              <Link
                href="/decide"
                onClick={() => track("home_how_decide", { target: "/decide", from: "intro" })}
                className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-[0_8px_20px_color-mix(in_oklch,var(--primary)_28%,transparent)]"
              >
                {t(homeCopy.introCta)}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {introQuestions.map((question) => (
                <li
                  key={question.en}
                  className="flex min-h-12 items-center gap-3 rounded-xl border border-border/80 bg-card/90 px-4 py-3 text-sm font-semibold text-foreground shadow-sm"
                >
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Search className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  {t(question)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-14 border-t border-border pt-10">
        <h2 className="max-w-3xl hero-display-title text-2xl font-semibold tracking-tight sm:text-4xl">
          <span className="block text-foreground">{t(homeCopy.whyHeadlineLead)}</span>
          <span className="mt-1 block text-primary">{t(homeCopy.whyHeadlineAccent)}</span>
        </h2>
        <div className="relative mt-8 grid gap-4 md:grid-cols-2 md:gap-6">
          <article className="rounded-2xl border border-border/80 bg-muted/30 px-5 py-6 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">{t(homeCopy.searchLabel)}</p>
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
          <article className="rounded-2xl border border-primary/35 bg-[color-mix(in_oklch,var(--primary)_8%,var(--card))] px-5 py-6 shadow-[0_12px_32px_color-mix(in_oklch,var(--primary)_12%,transparent)] sm:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{t(homeCopy.decideLabel)}</p>
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
          <span
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-primary shadow-sm md:flex"
            aria-hidden
          >
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </section>

      <section className="mt-14 border-t border-border pt-10">
        <div className="rounded-2xl border border-border bg-card px-5 py-8 sm:px-8 sm:py-10">
          <h2 className="hero-display-title max-w-xl text-2xl font-semibold tracking-tight sm:text-4xl">{t(homeCopy.howTitle)}</h2>
          <ol className="relative mt-8 grid gap-4 lg:grid-cols-3 lg:gap-5">
            <span
              className="pointer-events-none absolute left-[16%] right-[16%] top-9 hidden h-px bg-border lg:block"
              aria-hidden
            />
            {howSteps.map((step, index) => (
              <li
                key={step.title.en}
                className="relative rounded-2xl border border-border/80 bg-[color-mix(in_oklch,var(--primary)_5%,var(--card))] p-5"
              >
                <span className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-[0_6px_16px_color-mix(in_oklch,var(--primary)_25%,transparent)]">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{t(step.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(step.body)}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-col items-stretch gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground sm:max-w-md">{t(homeCopy.control)}</p>
            <Link
              href="/decide"
              onClick={() => track("home_how_decide", { target: "/decide" })}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-[0_8px_20px_color-mix(in_oklch,var(--primary)_28%,transparent)]"
            >
              {t(homeCopy.howCta)}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-14 border-t border-border pt-10">
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
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {homeQuestions.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                onClick={() => track("home_question", { id: item.id, target: item.href })}
                className="flex h-full min-h-24 gap-3 rounded-md border border-border bg-card px-4 py-4 text-sm font-semibold leading-snug text-foreground hover:border-primary"
              >
                <Search className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span>{t(item.label)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 overflow-hidden rounded-md border border-border" aria-labelledby="home-why">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-64 lg:min-h-[22rem]">
            <Image
              src="/assets/home-hero-hong-kong.webp"
              alt={t(homeCopy.whyPhotoAlt)}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[70%_center]"
            />
          </div>
          <div className="bg-[oklch(0.94_0.03_230)] px-6 py-8 dark:bg-[oklch(0.24_0.04_245)] sm:px-8 sm:py-10">
            <p id="home-why" className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              {t(homeCopy.whyEyebrow)}
            </p>
            <h2 className="mt-3 hero-display-title text-2xl font-semibold tracking-tight sm:text-3xl">
              <span className="block text-foreground">{t(homeCopy.whyHeadlineLead)}</span>
              <span className="mt-1 block text-primary">{t(homeCopy.whyHeadlineAccent)}</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">{t(homeCopy.whyBody)}</p>
            <Link
              href="/decide"
              onClick={() => track("home_final_decide", { target: "/decide" })}
              className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-[0_8px_20px_color-mix(in_oklch,var(--primary)_28%,transparent)]"
            >
              {t(homeCopy.primaryCta)}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-14 border-t border-border pt-10">
        <h2 className="hero-display-title text-2xl font-semibold tracking-tight sm:text-3xl">{t(homeCopy.faqTitle)}</h2>
        <div className="mt-4 grid gap-3">
          {homeFaq.map((item) => (
            <details key={item.q.en} className="rounded-md border border-border bg-card px-4 py-3">
              <summary className="cursor-pointer text-base font-semibold">{t(item.q)}</summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(item.a)}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-border py-10">
        <h2 className="hero-display-title text-2xl font-semibold tracking-tight sm:text-4xl">{t(homeCopy.finalTitle)}</h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">{t(homeCopy.finalBody)}</p>
        <Link
          href="/decide"
          onClick={() => track("home_final_decide", { target: "/decide" })}
          className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-[0_8px_20px_color-mix(in_oklch,var(--primary)_28%,transparent)]"
        >
          {t(homeCopy.primaryCta)}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </section>
    </main>
  )
}
