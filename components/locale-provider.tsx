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
  // Stable on server and first client render. Reading localStorage here mismatches hydration
  // (server "Decide", client "Decidir" when the saved locale is es).
  const [locale, setLocaleState] = useState<Locale>("en")
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    // Restoring the saved locale must wait for mount (see above), so this setState is intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isLocale(stored)) setLocaleState(stored)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    document.documentElement.lang = locale === "zh" ? "zh-Hans" : locale
    localStorage.setItem(STORAGE_KEY, locale)
  }, [locale, ready])

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
