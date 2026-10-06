"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  ChevronDown,
  Compass,
  Ellipsis,
  FileText,
  House,
  MapPinned,
  Menu,
  Plane,
  Scale,
  X,
} from "lucide-react"
import { useEffect, useId, useRef, useState } from "react"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLocale } from "@/components/locale-provider"
import type { Messages } from "@/lib/i18n/types"
import { visibleSeasons } from "@/lib/stories"
import { COMPARE_STORAGE } from "@/lib/trip-history"
import { cn, getCityImage } from "@/lib/utils"

type NavItem = {
  href: string
  key: "home" | "decide" | "stories" | "trips"
  icon: typeof Compass
  soon?: boolean
  isNew?: boolean
}

const storiesSoon = visibleSeasons().length === 0

const navItems: readonly NavItem[] = [
  { href: "/", key: "home", icon: House },
  { href: "/decide", key: "decide", icon: Compass },
  { href: "/stories", key: "stories", icon: BookOpen, soon: storiesSoon, isNew: !storiesSoon },
  // Saved / Profile stay out of the nav until they exist — no dead entries.
  { href: "/trips", key: "trips", icon: BriefcaseBusiness },
]

/** Browse destinations — desktop More menu + mobile drawer. Not in bottom tabs. */
const moreLinks = [
  { href: "/city", labelKey: "citiesNav" as const, icon: MapPinned },
  { href: "/compare", labelKey: "compareNav" as const, icon: Scale },
  { href: "/guides", labelKey: "guidesNav" as const, icon: FileText },
] as const

function isMoreRoute(pathname: string) {
  return (
    pathname === "/city" ||
    pathname.startsWith("/city/") ||
    pathname === "/compare" ||
    pathname.startsWith("/compare/") ||
    pathname === "/guides" ||
    pathname.startsWith("/guides/")
  )
}

function NewBadge({ label }: Readonly<{ label: string }>) {
  return (
    <span className="ml-1.5 inline-flex shrink-0 items-center rounded-sm bg-red-600 px-1.5 py-0.5 text-[0.62rem] font-extrabold uppercase leading-none tracking-wide text-white">
      {label}
    </span>
  )
}

const legalLinks = [
  { href: "/privacy", key: "privacy" },
  { href: "/terms", key: "terms" },
  { href: "/disclaimer", key: "disclaimer" },
  { href: "/affiliate-disclosure", key: "affiliate" },
] as const

/** Plain <a> targets so crawlers follow family equity back to xingai.app. */
const familyLinks = [
  { href: "https://cook.xingai.app/", name: "Cook AI", title: "What to cook tonight" },
  { href: "https://wear.xingai.app/", name: "Wear AI", title: "What to wear today" },
  { href: "https://invest.xingai.app/ai-map", name: "Invest AI", title: "AI supply-chain research" },
] as const

function mobileHeaderTitle(pathname: string, messages: Messages) {
  if (pathname === "/") return messages.chrome.home
  if (pathname === "/result") {
    return messages.result.breadcrumb.split("›").pop()?.trim() ?? messages.chrome.decide
  }
  const legal = legalLinks.find((item) => pathname === item.href)
  if (legal) return messages.chrome[legal.key]
  if (pathname.startsWith("/stories")) return messages.chrome.stories
  if (pathname.startsWith("/trips")) return messages.chrome.trips
  if (pathname === "/city" || pathname.startsWith("/city/")) return messages.content.citiesNav
  if (pathname === "/compare" || pathname.startsWith("/compare/")) return messages.content.compareNav
  if (pathname === "/guides" || pathname.startsWith("/guides/")) return messages.content.guidesNav
  return messages.chrome.decide
}

function isDecideRoute(pathname: string) {
  return pathname === "/decide" || pathname === "/result"
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  if (href === "/decide") return isDecideRoute(pathname)
  return pathname === href || pathname.startsWith(`${href}/`)
}

const COMPARE_UPDATED_EVENT = "xingai-travel-compare-updated"

type LastDecision = {
  winner: string
  reason?: string
}

function loadLastDecision(): LastDecision | null {
  if (typeof window === "undefined") return null
  const raw = sessionStorage.getItem(COMPARE_STORAGE) || localStorage.getItem(COMPARE_STORAGE)
  if (!raw) return null
  try {
    const data = JSON.parse(raw) as {
      winner?: string
      whyNotOthers?: string
      destinations?: Array<{ name?: string; country?: string; isWinner?: boolean; whyWins?: string[] }>
    }
    const winner = data.destinations?.find((item) => item.isWinner) ?? data.destinations?.[0]
    const label = data.winner || [winner?.name, winner?.country].filter(Boolean).join(", ")
    if (!label) return null
    return { winner: label, reason: winner?.whyWins?.slice(0, 2).join(", ") || data.whyNotOthers }
  } catch {
    return null
  }
}

export function AppChrome({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()
  const { messages } = useLocale()
  const [open, setOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [soon, setSoon] = useState("")
  const [lastDecision, setLastDecision] = useState<LastDecision | null>(null)
  const moreMenuId = useId()
  const moreRef = useRef<HTMLDivElement>(null)
  const moreActive = isMoreRoute(pathname)

  useEffect(() => {
    function syncLastDecision() {
      setLastDecision(loadLastDecision())
    }
    syncLastDecision()
    window.addEventListener(COMPARE_UPDATED_EVENT, syncLastDecision)
    window.addEventListener("storage", syncLastDecision)
    window.addEventListener("focus", syncLastDecision)
    return () => {
      window.removeEventListener(COMPARE_UPDATED_EVENT, syncLastDecision)
      window.removeEventListener("storage", syncLastDecision)
      window.removeEventListener("focus", syncLastDecision)
    }
  }, [])

  useEffect(() => {
    setMoreOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!moreOpen) return
    function onPointerDown(event: MouseEvent) {
      if (!moreRef.current?.contains(event.target as Node)) setMoreOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMoreOpen(false)
    }
    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [moreOpen])

  function showSoon(label: string) {
    setSoon(`${label} · ${messages.chrome.soon}`)
    window.setTimeout(() => setSoon(""), 2200)
  }

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-2 px-4 lg:h-16 lg:gap-4 lg:px-8">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
          <div className="min-w-0 flex-1 text-center text-sm font-bold lg:hidden">
            <span className="text-primary">Travel</span> · {mobileHeaderTitle(pathname, messages)}
          </div>
          <Link href="/" className="hidden min-w-0 shrink-0 items-center lg:flex">
            <span className="truncate text-base font-bold leading-none">
              XingAI <span className="text-primary">Travel</span>
            </span>
          </Link>
          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex" aria-label="Primary">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(pathname, item.href)
              const label = messages.chrome[item.key]
              if (item.soon) {
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => showSoon(label)}
                    className="inline-flex h-10 items-center gap-1.5 rounded-md px-3 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    <Icon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                    {label}
                  </button>
                )
              }
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "inline-flex h-10 items-center gap-1.5 rounded-md px-3 text-sm font-semibold transition",
                    active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                  {label}
                  {item.isNew ? <NewBadge label={messages.chrome.newBadge} /> : null}
                </Link>
              )
            })}
            <div ref={moreRef} className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={moreOpen}
                aria-controls={moreMenuId}
                onClick={() => setMoreOpen((value) => !value)}
                className={cn(
                  "inline-flex h-10 items-center gap-1.5 rounded-md px-3 text-sm font-semibold transition",
                  moreActive || moreOpen
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Ellipsis className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                {messages.chrome.moreNav}
                <ChevronDown className={cn("h-3.5 w-3.5 transition", moreOpen && "rotate-180")} aria-hidden />
              </button>
              {moreOpen ? (
                <div
                  id={moreMenuId}
                  role="menu"
                  aria-label={messages.chrome.moreNav}
                  className="absolute left-1/2 top-[calc(100%+0.35rem)] z-50 w-52 -translate-x-1/2 rounded-xl border border-border bg-card p-1.5 shadow-lg"
                >
                  {moreLinks.map((item) => {
                    const Icon = item.icon
                    const active = isActive(pathname, item.href)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        onClick={() => setMoreOpen(false)}
                        className={cn(
                          "flex min-h-11 items-center gap-2.5 rounded-lg px-3 text-sm font-semibold transition",
                          active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                        {messages.content[item.labelKey]}
                      </Link>
                    )
                  })}
                </div>
              ) : null}
            </div>
          </nav>
          <div className="flex shrink-0 items-center gap-1 lg:hidden">
            <LocaleSwitcher className="h-10 max-w-[5.75rem] px-1.5" />
            <ThemeToggle className="h-10 w-10" />
          </div>
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <Link
              href="/decide"
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground shadow-[0_6px_16px_color-mix(in_oklch,var(--primary)_28%,transparent)]"
            >
              {messages.chrome.decideCta}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex min-w-0 flex-1 flex-col">
        {children}
        <footer className="border-t border-border bg-background/70 px-4 py-5 pb-24 text-xs text-muted-foreground lg:px-8 lg:pb-5">
          <div className="card-hover card-hover-media mx-auto mb-5 max-w-6xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <Link
              href="/decide"
              className="group relative block aspect-[16/9] max-h-72 w-full sm:max-h-80 lg:max-h-96"
            >
              <Image
                src="/assets/footer-traveler-hong-kong.webp"
                alt={messages.chrome.footerTravelerAlt}
                fill
                quality={90}
                sizes="(min-width: 1024px) 72rem, 100vw"
                className="object-cover object-[72%_48%] motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.02]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklch,var(--background)_88%,transparent)_0%,color-mix(in_oklch,var(--background)_25%,transparent)_42%,transparent_72%)]"
              />
              <span className="absolute bottom-3 left-4 right-4 max-w-xs text-sm font-bold leading-snug text-foreground sm:bottom-4 sm:left-5 sm:text-base">
                {messages.chrome.footerTravelerCaption}
                <ArrowRight className="ml-1.5 inline h-4 w-4 text-primary motion-safe:transition group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </div>
          <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold">{messages.chrome.footerCopyright}</p>
            <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Footer legal">
              {legalLinks.map((item) => (
                <Link key={item.href} href={item.href} className="font-semibold transition hover:text-primary">
                  {messages.chrome[item.key]}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mx-auto mt-3 flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/60 pt-3">
            <span className="font-semibold text-foreground">{messages.content.discover}</span>
            <Link href="/how-it-works" className="hover:text-primary">{messages.content.howItWorksNav}</Link>
            <Link href="/faq" className="hover:text-primary">{messages.content.faqNav}</Link>
            <Link href="/city" className="hover:text-primary">{messages.content.citiesNav}</Link>
            <Link href="/compare" className="hover:text-primary">{messages.content.compareNav}</Link>
            <Link href="/guides" className="hover:text-primary">{messages.content.guidesNav}</Link>
          </div>
          {/* XingAI family links: plain anchors so crawlers follow them (project-init footer). */}
          <nav
            className="mx-auto mt-3 flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/60 pt-3"
            aria-label={messages.chrome.footerFamilyNav}
          >
            <span>
              {messages.chrome.footerPartOf}{" "}
              <a href="https://xingai.app/" className="font-semibold text-foreground hover:text-primary">
                XingAI
              </a>
            </span>
            {familyLinks.map((app) => (
              <a key={app.href} href={app.href} title={app.title} className="hover:text-primary">
                {app.name}
              </a>
            ))}
            <a href="https://xingai.app/apps" className="hover:text-primary">
              {messages.chrome.footerAllApps}
            </a>
          </nav>
        </footer>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/92 pb-[max(.45rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-md items-stretch justify-between px-2 py-1.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(pathname, item.href)
            const label = messages.chrome[item.key]
            if (item.soon) {
              return (
                <button key={item.key} type="button" onClick={() => showSoon(label)} className="flex flex-1 flex-col items-center gap-1 rounded-md px-1 py-1.5 text-muted-foreground">
                  <Icon className="h-5 w-5" aria-hidden />
                  <span className="text-[0.66rem] font-semibold">{label}</span>
                </button>
              )
            }
            return (
              <Link key={item.key} href={item.href} className={cn("relative flex flex-1 flex-col items-center gap-1 rounded-md px-1 py-1.5", active ? "text-primary" : "text-muted-foreground")}>
                <span className="relative">
                  <Icon className="h-5 w-5" aria-hidden />
                  {item.isNew ? (
                    <span className="absolute -right-2.5 -top-1 rounded-sm bg-red-600 px-1 py-px text-[0.55rem] font-extrabold uppercase leading-none text-white">
                      {messages.chrome.newBadge}
                    </span>
                  ) : null}
                </span>
                <span className="text-[0.66rem] font-semibold">{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/40" aria-label="Close menu" type="button" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-[min(21rem,88vw)] flex-col border-r border-border bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-4 pt-[max(1rem,env(safe-area-inset-top))]">
              <Link href="/" onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Plane className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="block truncate text-sm font-extrabold">XingAI</span>
                  <span className="block truncate text-xs font-bold text-primary">Travel</span>
                </span>
              </Link>
              <button type="button" className="rounded-md border border-border p-2" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col">
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <nav className="grid gap-1" aria-label="Mobile primary">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const active = isActive(pathname, item.href)
                    const label = messages.chrome[item.key]

                    if (item.soon) {
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => {
                            showSoon(label)
                            setOpen(false)
                          }}
                          className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-muted-foreground transition hover:bg-muted"
                        >
                          <Icon className="h-5 w-5 shrink-0" aria-hidden />
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-bold">{label}</span>
                            <span className="block text-xs text-muted-foreground">{messages.chrome.soon}</span>
                          </span>
                        </button>
                      )
                    }

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-3 text-left transition",
                          active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                        )}
                      >
                        <Icon className="h-5 w-5 shrink-0" aria-hidden />
                        <span className="inline-flex items-center text-sm font-bold">
                          {label}
                          {item.isNew ? <NewBadge label={messages.chrome.newBadge} /> : null}
                        </span>
                      </Link>
                    )
                  })}
                </nav>

                <div className="mt-5 border-t border-border pt-4">
                  <p className="px-3 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    {messages.chrome.moreNav}
                  </p>
                  <nav className="mt-2 grid gap-1" aria-label={messages.chrome.moreNav}>
                    {moreLinks.map((item) => {
                      const Icon = item.icon
                      const active = isActive(pathname, item.href)
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex min-h-11 items-center gap-3 rounded-md px-3 py-2.5 text-left transition",
                            active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                          )}
                        >
                          <Icon className="h-5 w-5 shrink-0" aria-hidden />
                          <span className="text-sm font-bold">{messages.content[item.labelKey]}</span>
                        </Link>
                      )
                    })}
                  </nav>
                </div>

                <div className="mt-5">
                  <SideInsightCard lastDecision={lastDecision} onNavigate={() => setOpen(false)} />
                </div>
              </div>

              <div className="shrink-0 border-t border-border px-4 py-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <nav
                  className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground"
                  aria-label={messages.chrome.footerFamilyNav}
                >
                  <span>
                    {messages.chrome.footerPartOf}{" "}
                    <a href="https://xingai.app/" className="font-semibold text-foreground">
                      XingAI
                    </a>
                  </span>
                  {familyLinks.map((app) => (
                    <a key={app.href} href={app.href} title={app.title} className="hover:text-primary">
                      {app.name}
                    </a>
                  ))}
                  <a href="https://xingai.app/apps" className="hover:text-primary">
                    {messages.chrome.footerAllApps}
                  </a>
                </nav>
              </div>
            </div>
          </aside>
        </div>
      ) : null}

      {soon ? <div className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-1/2 z-[70] -translate-x-1/2 rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-xl">{soon}</div> : null}
    </div>
  )
}

function SideInsightCard({
  lastDecision,
  onNavigate,
}: Readonly<{
  lastDecision: LastDecision | null
  onNavigate: () => void
}>) {
  const { messages } = useLocale()
  const title = lastDecision ? messages.chrome.continueLastTrip : messages.chrome.exploreBetter
  const body = lastDecision
    ? `${lastDecision.winner}. ${lastDecision.reason || messages.chrome.continueLastTripBody}`
    : messages.chrome.exploreBetterBody
  const cityImageUrl = lastDecision
    ? getCityImage(lastDecision.winner)
    : "/assets/destination-lisbon-thumb.webp"
  const isExternal = cityImageUrl.startsWith("https://")
  const content = (
    <>
      <div
        className="mb-3 aspect-[16/10] min-h-36 w-full overflow-hidden rounded-md bg-muted bg-cover bg-center"
        style={isExternal ? { backgroundImage: `url('${cityImageUrl}')` } : undefined}
      >
        {!isExternal && (
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url('${cityImageUrl}')` }}
          />
        )}
      </div>
      <p className="text-sm font-bold text-primary">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{body}</p>
    </>
  )

  if (lastDecision) {
    return (
      <Link
        href="/result"
        onClick={onNavigate}
        className="card-hover block rounded-md border border-border bg-background p-3"
      >
        {content}
      </Link>
    )
  }

  return <div className="rounded-md border border-border bg-background p-3">{content}</div>
}

