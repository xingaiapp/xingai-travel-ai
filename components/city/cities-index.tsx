"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { DecideCta } from "@/components/content-shell"
import { useLocale } from "@/components/locale-provider"
import { listCityCatalog } from "@/lib/cities/catalog"
import { cityText, fill } from "@/lib/cities"
import { cn } from "@/lib/utils"

/** Full city-guide directory: live guides + Coming soon for the roadmap (and more later). */
export function CitiesIndexView() {
  const { locale, messages } = useLocale()
  const m = messages.city
  const catalog = listCityCatalog()
  const liveCount = catalog.filter((item) => item.status === "live").length
  const soonCount = catalog.length - liveCount

  return (
    <main className="decision-grid-bg flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary">{m.eyebrow}</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{m.indexTitle}</h1>
          <p className="mt-4 text-lg font-medium leading-relaxed text-muted-foreground">{m.indexLead}</p>
          <p className="mt-3 text-sm font-semibold text-foreground/80">
            {fill(m.indexCount, { live: liveCount, soon: soonCount, total: catalog.length })}
          </p>
        </header>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {catalog.map((item) => {
            const name = cityText(item.name, locale)
            const country = cityText(item.country, locale)
            const live = item.status === "live"
            const remote = item.image.startsWith("http")
            const body = (
              <>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    quality={90}
                    unoptimized={remote}
                    sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 100vw"
                    className={cn("object-cover", live && "motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.04]")}
                  />
                  {!live ? (
                    <span className="absolute right-3 top-3 rounded-md bg-background/90 px-2 py-1 text-[0.65rem] font-extrabold uppercase tracking-wide text-muted-foreground shadow-sm backdrop-blur">
                      {messages.chrome.soon}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h2 className="text-lg font-extrabold tracking-tight">
                    {name}
                    {locale !== "zh" && item.localName ? (
                      <span className="ml-2 text-sm font-normal text-muted-foreground">{item.localName}</span>
                    ) : null}
                  </h2>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{country}</p>
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{cityText(item.blurb, locale)}</p>
                  {live && item.places != null && item.routes != null ? (
                    <p className="text-xs font-semibold text-foreground/80">
                      {fill(m.indexMeta, { n: item.places, r: item.routes })}
                    </p>
                  ) : null}
                  {live ? (
                    <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-bold text-primary">
                      {fill(m.indexOpen, { city: name })}
                      <ArrowRight className="h-4 w-4 motion-safe:transition group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  ) : (
                    <span className="mt-auto pt-1 text-sm font-semibold text-muted-foreground">{m.indexSoonHint}</span>
                  )}
                </div>
              </>
            )

            return (
              <li key={item.slug}>
                {live ? (
                  <Link
                    href={`/city/${item.slug}`}
                    className="card-hover card-hover-media group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                  >
                    {body}
                  </Link>
                ) : (
                  <article
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-dashed border-border bg-card/80"
                    aria-label={`${name} — ${messages.chrome.soon}`}
                  >
                    {body}
                  </article>
                )}
              </li>
            )
          })}
        </ul>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">{m.indexMoreNote}</p>

        <DecideCta />
      </div>
    </main>
  )
}
