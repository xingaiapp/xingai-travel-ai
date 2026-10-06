"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { LOCALES, resolveMessages } from "@/lib/i18n"
import type { Locale, Messages } from "@/lib/i18n/types"
import {
  asPublicLocale,
  htmlLang,
  isIndexablePublicPath,
  localizedPublicHref,
  stripLocalePrefix,
} from "@/lib/public-locale"

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

export function LocaleProvider({
  initialLocale = "en",
  children,
}: Readonly<{ initialLocale?: Locale; children: React.ReactNode }>) {
  // Prefer URL locale from the server so /zh and /ko do not hydrate as English.
  const [locale, setLocaleState] = useState<Locale>(initialLocale)
  const [ready, setReady] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const { locale: fromUrl, path } = stripLocalePrefix(pathname)
    if (fromUrl !== "en") {
      setLocaleState(fromUrl)
      localStorage.setItem(STORAGE_KEY, fromUrl)
      setReady(true)
      return
    }
    if (isIndexablePublicPath(path)) {
      setLocaleState("en")
      setReady(true)
      return
    }
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isLocale(stored)) setLocaleState(stored)
    setReady(true)
  }, [pathname])

  useEffect(() => {
    if (!ready) return
    document.documentElement.lang = htmlLang(asPublicLocale(locale))
    localStorage.setItem(STORAGE_KEY, locale)
  }, [locale, ready])

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next)
      localStorage.setItem(STORAGE_KEY, next)
      const { path } = stripLocalePrefix(pathname)
      if (!isIndexablePublicPath(path)) return
      const target = localizedPublicHref(asPublicLocale(next), path)
      if (target !== pathname) router.push(target)
    },
    [pathname, router]
  )

  const value = useMemo(
    () => ({ locale, setLocale, messages: resolveMessages(locale) }),
    [locale, setLocale]
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider")
  return ctx
}
