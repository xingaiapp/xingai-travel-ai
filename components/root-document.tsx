import { Fraunces, Inter } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { SeoJsonLd } from "@/components/seo-json-ld"
import { ThemeProvider, themeBootScript } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
})

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
})

/**
 * Shared `<html>` / `<body>` shell. Locale routes pass the path language so the
 * first HTML has the right `lang` (not a client-only patch after paint).
 */
export function RootDocument({
  lang,
  children,
}: Readonly<{
  lang: string
  children: React.ReactNode
}>) {
  return (
    <html lang={lang} suppressHydrationWarning className={`dark ${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased">
        <Script id="theme-boot" strategy="beforeInteractive">
          {themeBootScript}
        </Script>
        <SeoJsonLd />
        <ThemeProvider>{children}</ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
