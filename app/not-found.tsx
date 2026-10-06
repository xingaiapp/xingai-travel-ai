"use client"

import Link from "next/link"
import { Compass, Home, MapPinned } from "lucide-react"
import { useLocale } from "@/components/locale-provider"

export default function NotFound() {
  const { messages } = useLocale()
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 pb-28 pt-16 text-center sm:px-6 lg:pb-12">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">404</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{messages.notFound.title}</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
        {messages.notFound.body}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/decide"
          className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-extrabold text-primary-foreground shadow-sm"
        >
          <Compass className="h-4 w-4" aria-hidden />
          {messages.chrome.decideCta}
        </Link>
        <Link
          href="/city"
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-card px-5 text-sm font-bold text-foreground hover:border-primary/50"
        >
          <MapPinned className="h-4 w-4" aria-hidden />
          {messages.content.citiesNav}
        </Link>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-5 text-sm font-bold text-muted-foreground hover:text-primary"
        >
          <Home className="h-4 w-4" aria-hidden />
          {messages.chrome.home}
        </Link>
      </div>
    </main>
  )
}
