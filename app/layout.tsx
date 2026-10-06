import type { Metadata, Viewport } from "next"
import { Fraunces, Inter } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { AppChrome } from "@/components/app-chrome"
import { LocaleProvider } from "@/components/locale-provider"
import { SeoJsonLd } from "@/components/seo-json-ld"
import { ThemeProvider, themeBootScript } from "@/components/theme-provider"
import { htmlLang } from "@/lib/public-locale"
import { requestLocale } from "@/lib/request-locale"
import "./globals.css"

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

export const metadata: Metadata = {
  title: {
    default: "XingAI Travel — Make a better travel decision",
    template: "%s · XingAI Travel",
  },
  description:
    "XingAI Travel is an AI travel decision system. Compare destinations with honest trade-offs, then open partner search links to book the key pieces. You stay in control.",
  keywords: [
    "AI travel decision",
    "travel decision system",
    "destination comparison",
    "AI travel planner",
    "XingAI Travel",
  ],
  openGraph: {
    title: "XingAI Travel — Make a better travel decision",
    description: "Compare options and trade-offs so you can decide. Other travel sites help you search. You stay in control.",
    url: "/",
    images: [{ url: "/assets/og-travel-decision-2400.jpg", alt: "Traveler overlooking Victoria Harbour at sunset" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XingAI Travel — Make a better travel decision",
    description: "Compare options and trade-offs so you can decide. Other travel sites help you search. You stay in control.",
    images: ["/assets/og-travel-decision-2400.jpg"],
  },
  icons: {
    icon: [
      { url: "/assets/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/assets/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://travel.xingai.app"),
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await requestLocale()
  return (
    <html lang={htmlLang(locale)} suppressHydrationWarning className={`dark ${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased">
        <Script id="theme-boot" strategy="beforeInteractive">
          {themeBootScript}
        </Script>
        <SeoJsonLd />
        <ThemeProvider>
          <LocaleProvider initialLocale={locale}>
            <AppChrome>{children}</AppChrome>
          </LocaleProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
