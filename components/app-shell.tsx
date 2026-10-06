import { AppChrome } from "@/components/app-chrome"
import { LocaleProvider } from "@/components/locale-provider"
import type { Locale } from "@/lib/i18n/types"

/** Shared chrome + locale for indexable `[locale]` routes and session routes. */
export function AppShell({
  locale = "en",
  children,
}: Readonly<{ locale?: Locale; children: React.ReactNode }>) {
  return (
    <LocaleProvider initialLocale={locale}>
      <AppChrome>{children}</AppChrome>
    </LocaleProvider>
  )
}
