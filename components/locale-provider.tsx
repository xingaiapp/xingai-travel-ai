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
  const pathname = usePathname()
  const router = useRouter()
  const { locale: urlLocale, path } = stripLocalePrefix(pathname)
  const indexable = isIndexablePublicPath(path)

  // Session preference for non-indexable routes (/result, /trips). Indexable locale comes from the URL.
  const [sessionLocale, setSessionLocale] = useState<Locale>(initialLocale)

  useEffect(() => {
    if (indexable) {
      localStorage.setItem(STORAGE_KEY, urlLocale)
      return
    }
    const stored = localStorage.getItem(STORAGE_KEY)
    // Restoring the saved locale must wait for mount (hydration).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isLocale(stored)) setSessionLocale(stored)
  }, [indexable, urlLocale])

  // Prefixed URLs win. Bare English URLs trust initialLocale from `app/[locale]` (rewrite → /en/…).
  const locale: Locale = indexable ? (urlLocale !== "en" ? urlLocale : initialLocale) : sessionLocale

  useEffect(() => {
    document.documentElement.lang = htmlLang(asPublicLocale(locale))
    localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  const setLocale = useCallback(
    (next: Locale) => {
      setSessionLocale(next)
      localStorage.setItem(STORAGE_KEY, next)
      const { path: bare } = stripLocalePrefix(pathname)
      if (!isIndexablePublicPath(bare)) return
      const target = localizedPublicHref(asPublicLocale(next), bare)
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
