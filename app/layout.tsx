import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AppChrome } from "@/components/app-chrome"
import { LocaleProvider } from "@/components/locale-provider"
import { SeoJsonLd } from "@/components/seo-json-ld"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "XingAI Travel AI — Explore Better",
    template: "%s · XingAI Travel AI",
  },
  description:
    "AI travel decision tool that compares destinations with honest trade-offs and gives one bookable itinerary.",
  keywords: [
    "AI travel planner",
    "destination comparison",
    "travel decision tool",
    "itinerary planner",
    "XingAI Travel AI",
  ],
  openGraph: {
    title: "XingAI Travel AI — Explore Better",
    description: "Compare first, plan second. Choose the right trip before you book.",
    images: [{ url: "/assets/context-mock.jpg", alt: "Travel destination preview" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XingAI Travel AI",
    description: "Choose the right destination with honest trade-offs and a bookable plan.",
    images: ["/assets/context-mock.jpg"],
  },
  icons: {
    icon: [
      { url: "/assets/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/assets/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/decide",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://travel.xingai.app"),
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#2563eb",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased">
        <SeoJsonLd />
        <ThemeProvider>
          <LocaleProvider>
            <AppChrome>{children}</AppChrome>
          </LocaleProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
