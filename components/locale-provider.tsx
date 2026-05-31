"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { LOCALES, resolveMessages } from "@/lib/i18n"
import type { Locale, Messages } from "@/lib/i18n/types"

const STORAGE_KEY = "xingai-travel-locale"

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  messages: Messages
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function isLocale(value: string | null): value is Locale {
  return !!value && LOCALES.includes(value as Locale)
}

export function LocaleProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en"
    const stored = localStorage.getItem(STORAGE_KEY)
    return isLocale(stored) ? stored : "en"
  })

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-Hans" : locale
    localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  const value = useMemo(
    () => ({ locale, setLocale: setLocaleState, messages: resolveMessages(locale) }),
    [locale]
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider")
  return ctx
}
