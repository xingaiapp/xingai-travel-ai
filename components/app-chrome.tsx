"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BriefcaseBusiness, CircleHelp, Compass, Heart, Menu, Plane, Settings, ShieldCheck, UserRound, X } from "lucide-react"
import { useState } from "react"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLocale } from "@/components/locale-provider"
import { cn } from "@/lib/utils"

type NavItem = {
  href: string
  key: "decide" | "trips" | "saved" | "profile"
  icon: typeof Compass
  soon?: boolean
}

const navItems: readonly NavItem[] = [
  { href: "/decide", key: "decide", icon: Compass },
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

export function AppChrome({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()
  const { messages } = useLocale()
  const [open, setOpen] = useState(false)
  const [soon, setSoon] = useState("")

  function showSoon(label: string) {
    setSoon(`${label} · ${messages.chrome.soon}`)
    window.setTimeout(() => setSoon(""), 2200)
  }

  return (
    <div className="min-h-[100dvh] lg:grid lg:grid-cols-[15rem_1fr]">
      <aside className="hidden border-r border-border bg-card/82 p-5 backdrop-blur lg:flex lg:flex-col">
        <Link href="/decide" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Plane className="h-5 w-5" aria-hidden />
          </span>
          <span className="leading-tight">
            <span className="block text-base font800 font-bold">XingAI</span>
            <span className="block text-sm font-bold text-primary">Travel AI</span>
          </span>
        </Link>

        <nav className="mt-9 flex flex-1 flex-col gap-2" aria-label="Primary">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href || (item.href === "/decide" && pathname === "/")
            const label = messages.chrome[item.key]
            if (item.soon) {
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => showSoon(label)}
                  className="flex h-12 items-center gap-3 rounded-xl px-3 text-left text-muted-foreground transition hover:bg-muted"
                >
                  <Icon className="h-5 w-5" aria-hidden />
                  <span className="font-semibold">{label}</span>
                </button>
              )
            }
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "flex h-12 items-center gap-3 rounded-xl px-3 text-left font-semibold transition",
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" aria-hidden />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="rounded-xl border border-border bg-background p-3">
          <div className="mb-3 h-20 overflow-hidden rounded-lg bg-[url('/assets/context-mock.jpg')] bg-cover bg-center" />
          <p className="text-sm font-bold text-primary">Explore Better</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Choose the right trip before you plan the days.</p>
        </div>
        <div className="mt-5 rounded-xl border border-border bg-background p-3">
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
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-border bg-background/90 px-4 backdrop-blur lg:h-16 lg:justify-end lg:px-8">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
          <div className="min-w-0 flex-1 text-center text-sm font-bold lg:hidden">
            <span className="text-primary">Travel</span> · {messages.chrome.decide}
          </div>
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle className="h-10 w-10" />
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <LocaleSwitcher />
            <ThemeToggle />
            <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card">
              <Settings className="h-4 w-4" aria-hidden />
              <span className="sr-only">{messages.chrome.settings}</span>
            </button>
            <span className="h-10 w-10 overflow-hidden rounded-xl border border-border bg-[url('/assets/logo-light.png')] bg-cover dark:bg-[url('/assets/logo-dark.png')]" />
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
        </footer>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/92 pb-[max(.45rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-md items-stretch justify-between px-2 py-1.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href || (item.href === "/decide" && pathname === "/")
            const label = messages.chrome[item.key]
            if (item.soon) {
              return (
                <button key={item.key} type="button" onClick={() => showSoon(label)} className="flex flex-1 flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-muted-foreground">
                  <Icon className="h-5 w-5" aria-hidden />
                  <span className="text-[0.66rem] font-semibold">{label}</span>
                </button>
              )
            }
            return (
              <Link key={item.key} href={item.href} className={cn("flex flex-1 flex-col items-center gap-1 rounded-xl px-1 py-1.5", active ? "text-primary" : "text-muted-foreground")}>
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
          <div className="absolute left-0 top-0 h-full w-[min(20rem,86vw)] bg-card p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Plane className="h-5 w-5" aria-hidden />
                </span>
                <span className="font-bold">{messages.chrome.brand}</span>
              </div>
              <button type="button" className="rounded-xl border border-border p-2" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-2">
              <LocaleSwitcher className="h-11 justify-center" />
              <ThemeToggle className="h-11 w-full" />
            </div>
            <nav className="mt-7 grid gap-2" aria-label="Mobile legal">
              <p className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">{messages.chrome.legal}</p>
              {legalLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-border px-3 py-2 text-sm font-semibold text-muted-foreground"
                >
                  {messages.chrome[item.key]}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}

      {soon ? <div className="fixed bottom-24 left-1/2 z-[70] -translate-x-1/2 rounded-xl bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-xl">{soon}</div> : null}
    </div>
  )
}
