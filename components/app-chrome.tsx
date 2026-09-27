"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  BriefcaseBusiness,
  ChevronDown,
  CircleHelp,
  Compass,
  Heart,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Plane,
  Settings,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react"
import { useEffect, useState } from "react"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLocale } from "@/components/locale-provider"
import type { Messages } from "@/lib/i18n/types"
import { visibleSeasons } from "@/lib/stories"
import { cn, getCityImage } from "@/lib/utils"

type NavItem = {
  href: string
  key: "decide" | "stories" | "trips" | "saved" | "profile"
  icon: typeof Compass
  soon?: boolean
}

const navItems: readonly NavItem[] = [
  { href: "/decide", key: "decide", icon: Compass },
  { href: "/stories", key: "stories", icon: BookOpen, soon: visibleSeasons().length === 0 },
  { href: "/trips", key: "trips", icon: BriefcaseBusiness, soon: true },
  { href: "/saved", key: "saved", icon: Heart, soon: true },
  { href: "/profile", key: "profile", icon: UserRound, soon: true },
]

const legalLinks = [
  { href: "/privacy", key: "privacy" },
  { href: "/terms", key: "terms" },
  { href: "/disclaimer", key: "disclaimer" },
  { href: "/affiliate-disclosure", key: "affiliate" },
] as const

function mobileHeaderTitle(pathname: string, messages: Messages) {
  if (pathname === "/result") {
    return messages.result.breadcrumb.split("›").pop()?.trim() ?? messages.chrome.decide
  }
  const legal = legalLinks.find((item) => pathname === item.href)
  if (legal) return messages.chrome[legal.key]
  if (pathname.startsWith("/stories")) return messages.chrome.stories
  return messages.chrome.decide
}

function isDecideRoute(pathname: string) {
  return pathname === "/decide" || pathname === "/" || pathname === "/result"
}

function isActive(pathname: string, href: string) {
  if (href === "/decide") return isDecideRoute(pathname)
  return pathname === href || pathname.startsWith(`${href}/`)
}

const COMPARE_STORAGE = "xingai-travel-compare-result"
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
  const [legalOpen, setLegalOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [desktopNavOpen, setDesktopNavOpen] = useState(true)
  const [soon, setSoon] = useState("")
  const [lastDecision, setLastDecision] = useState<LastDecision | null>(null)

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

  function showSoon(label: string) {
    setSoon(`${label} · ${messages.chrome.soon}`)
    window.setTimeout(() => setSoon(""), 2200)
  }

  return (
    <div className={cn("min-h-[100dvh] lg:grid", desktopNavOpen ? "lg:grid-cols-[15rem_1fr]" : "lg:grid-cols-[4.75rem_1fr]")}>
      <aside
        className={cn(
          "relative hidden border-r border-border bg-card/82 backdrop-blur transition-[width,padding] duration-200 lg:flex lg:flex-col",
          desktopNavOpen ? "p-5" : "items-center px-3 py-5"
        )}
      >
        <button
          type="button"
          onClick={() => setDesktopNavOpen((value) => !value)}
          className="absolute -right-4 top-1/2 z-50 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md border border-border bg-card text-muted-foreground shadow-md transition hover:border-primary/40 hover:text-primary lg:flex"
          aria-label={desktopNavOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={desktopNavOpen}
        >
          {desktopNavOpen ? <PanelLeftClose className="h-4 w-4" aria-hidden /> : <PanelLeftOpen className="h-4 w-4" aria-hidden />}
        </button>

        <Link href="/decide" aria-label="XingAI Travel AI" className={cn("flex items-center", !desktopNavOpen && "justify-center")}>
          <BrandMark className="h-10 w-10 shrink-0 shadow-sm" />
        </Link>

        <nav className={cn("mt-9 flex flex-1 flex-col gap-2", !desktopNavOpen && "w-full items-center")} aria-label="Primary">
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
                  title={!desktopNavOpen ? label : undefined}
                  className={cn(
                    "flex h-12 items-center gap-3 rounded-md text-left text-muted-foreground transition hover:bg-muted",
                    desktopNavOpen ? "px-3" : "w-12 justify-center px-0"
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                  <span className={cn("font-semibold", !desktopNavOpen && "sr-only")}>{label}</span>
                </button>
              )
            }
            return (
              <Link
                key={item.key}
                href={item.href}
                title={!desktopNavOpen ? label : undefined}
                className={cn(
                  "flex h-12 items-center gap-3 rounded-md text-left font-semibold transition",
                  desktopNavOpen ? "px-3" : "w-12 justify-center px-0",
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" aria-hidden />
                <span className={cn(!desktopNavOpen && "sr-only")}>{label}</span>
              </Link>
            )
          })}
        </nav>

        {desktopNavOpen ? (
          <>
            <SideInsightCard lastDecision={lastDecision} onNavigate={() => {}} />
            <div className="mt-5 rounded-md border border-border bg-background p-3">
              <p className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
                <ShieldCheck className="h-4 w-4" aria-hidden />
                {messages.chrome.legal}
              </p>
              <div className="grid gap-1">
                {legalLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="text-xs font-semibold text-muted-foreground transition hover:text-primary">
                    {messages.chrome[item.key]}
                  </Link>
                ))}
              </div>
            </div>
            <button type="button" className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <CircleHelp className="h-4 w-4" aria-hidden />
              Help & FAQ
            </button>
          </>
        ) : (
          <div className="mt-5 flex flex-col items-center gap-2 border-t border-border pt-4">
            <Link
              href="/privacy"
              title={messages.chrome.legal}
              className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-primary"
            >
              <ShieldCheck className="h-5 w-5" aria-hidden />
              <span className="sr-only">{messages.chrome.legal}</span>
            </Link>
            <button
              type="button"
              title="Help & FAQ"
              className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-primary"
            >
              <CircleHelp className="h-5 w-5" aria-hidden />
              <span className="sr-only">Help & FAQ</span>
            </button>
          </div>
        )}
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-border bg-background/90 px-4 backdrop-blur lg:h-16 lg:justify-between lg:px-8">
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
          <Link href="/decide" className="hidden min-w-0 items-center lg:flex">
            <span className="truncate text-base font-bold leading-none">
              XingAI <span className="text-primary">Travel AI</span>
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-1 lg:hidden">
            <LocaleSwitcher className="h-10 max-w-[5.75rem] px-1.5" />
            <ThemeToggle className="h-10 w-10" />
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <LocaleSwitcher />
            <ThemeToggle />
            <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card">
              <Settings className="h-4 w-4" aria-hidden />
              <span className="sr-only">{messages.chrome.settings}</span>
            </button>
          </div>
        </header>

        {children}
        <footer className="border-t border-border bg-background/70 px-4 py-5 pb-24 text-xs text-muted-foreground lg:px-8 lg:pb-5">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold">© 2026 XingAI Travel AI · Explore Better</p>
            <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Footer legal">
              {legalLinks.map((item) => (
                <Link key={item.href} href={item.href} className="font-semibold transition hover:text-primary">
                  {messages.chrome[item.key]}
                </Link>
              ))}
            </nav>
          </div>
          {/* XingAI family links: plain anchors so crawlers follow them. */}
          <div className="mx-auto mt-3 flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/60 pt-3">
            <span>
              Part of{" "}
              <a href="https://xingai.app/" className="font-semibold text-foreground hover:text-primary">
                XingAI
              </a>
            </span>
            <a href="https://cook.xingai.app/" title="What to cook tonight" className="hover:text-primary">Cook AI</a>
            <a href="https://wear.xingai.app/" title="What to wear today" className="hover:text-primary">Wear AI</a>
            <a href="https://invest.xingai.app/ai-map" title="AI supply-chain research" className="hover:text-primary">Invest AI</a>
            <a href="https://xingai.app/apps" className="hover:text-primary">All apps</a>
          </div>
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
              <Link key={item.key} href={item.href} className={cn("flex flex-1 flex-col items-center gap-1 rounded-md px-1 py-1.5", active ? "text-primary" : "text-muted-foreground")}>
                <Icon className="h-5 w-5" aria-hidden />
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
              <Link href="/decide" onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Plane className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="block truncate text-sm font-extrabold">XingAI</span>
                  <span className="block truncate text-xs font-bold text-primary">Travel AI</span>
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
                        <span className="text-sm font-bold">{label}</span>
                      </Link>
                    )
                  })}
                </nav>

                <div className="mt-5">
                  <SideInsightCard lastDecision={lastDecision} onNavigate={() => setOpen(false)} tall />
                </div>
              </div>

              <div className="shrink-0 border-t border-border px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <DrawerAccordion
                  id="drawer-legal"
                  title={messages.chrome.legal}
                  icon={ShieldCheck}
                  open={legalOpen}
                  onToggle={() => setLegalOpen((value) => !value)}
                  pinned
                >
                  {legalLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="rounded-md border border-border px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                    >
                      {messages.chrome[item.key]}
                    </Link>
                  ))}
                </DrawerAccordion>

                <DrawerAccordion
                  id="drawer-help"
                  title="Help & FAQ"
                  icon={CircleHelp}
                  open={helpOpen}
                  onToggle={() => setHelpOpen((value) => !value)}
                  pinned
                  divided
                >
                  <p className="rounded-md border border-border bg-muted/40 px-3 py-2 text-sm leading-relaxed text-muted-foreground">
                    {messages.chrome.exploreBetterBody}
                  </p>
                </DrawerAccordion>
              </div>
            </div>
          </aside>
        </div>
      ) : null}

      {soon ? <div className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-1/2 z-[70] -translate-x-1/2 rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-xl">{soon}</div> : null}
    </div>
  )
}

function BrandMark({ className }: Readonly<{ className?: string }>) {
  return (
    <span
      className={cn(
        "block overflow-hidden rounded-md border border-border bg-[url('/assets/logo-light.png')] bg-cover bg-center dark:bg-[url('/assets/logo-dark.png')]",
        className
      )}
      aria-hidden
    />
  )
}

function SideInsightCard({
  lastDecision,
  onNavigate,
  tall = false,
}: Readonly<{
  lastDecision: LastDecision | null
  onNavigate: () => void
  tall?: boolean
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
        className={cn(
          "mb-3 overflow-hidden rounded-md bg-muted bg-cover bg-center",
          tall ? "h-24" : "h-20"
        )}
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
        className="block rounded-md border border-border bg-background p-3 transition hover:border-primary/40 hover:bg-primary/5"
      >
        {content}
      </Link>
    )
  }

  return <div className="rounded-md border border-border bg-background p-3">{content}</div>
}

function DrawerAccordion({
  id,
  title,
  icon: Icon,
  open,
  onToggle,
  children,
  pinned = false,
  divided = false,
}: Readonly<{
  id: string
  title: string
  icon: typeof ShieldCheck
  open: boolean
  onToggle: () => void
  children: React.ReactNode
  pinned?: boolean
  divided?: boolean
}>) {
  return (
    <div className={cn(!pinned && "mt-5 border-t border-border pt-4", pinned && "py-3", divided && "border-t border-border")}>
      <button
        type="button"
        id={`${id}-trigger`}
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-2 rounded-md px-1 py-1 text-left transition hover:bg-muted"
      >
        <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
          <Icon className="h-4 w-4" aria-hidden />
          {title}
        </span>
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition", open && "rotate-180")} aria-hidden />
      </button>
      <div id={id} role="region" aria-labelledby={`${id}-trigger`} className={cn("mt-2 grid gap-2", open ? "grid" : "hidden")}>
        {children}
      </div>
    </div>
  )
}
