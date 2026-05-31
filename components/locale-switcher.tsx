"use client"

import { Globe2 } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import { LOCALES } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export function LocaleSwitcher({ className }: Readonly<{ className?: string }>) {
  const { locale, setLocale, messages } = useLocale()

  return (
    <label
      className={cn(
        "inline-flex h-10 items-center gap-1 rounded-md border border-border bg-card px-2 text-xs font-semibold shadow-sm",
        className
      )}
    >
      <Globe2 className="h-4 w-4 text-muted-foreground" aria-hidden />
      <span className="sr-only">{messages.chrome.language}</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as typeof locale)}
        className="max-w-[4.25rem] bg-transparent outline-none"
        aria-label={messages.chrome.language}
      >
        {LOCALES.map((item) => (
          <option key={item} value={item}>
            {item === "zh" ? "中文" : item.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  )
}
