import { AppShell } from "@/components/app-shell"
import { localeFromParams } from "@/lib/locale-params"
import { PUBLIC_LOCALES } from "@/lib/public-locale"

export function generateStaticParams() {
  return PUBLIC_LOCALES.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const locale = await localeFromParams(params)
  return <AppShell locale={locale}>{children}</AppShell>
}
