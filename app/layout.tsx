import type { Metadata, Viewport } from "next"
import "./globals.css"

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
      { url: "/assets/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-192.png", sizes: "192x192", type: "image/png" },
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

/**
 * Pass-through root. `<html lang>` lives in `app/[locale]/layout` (indexable)
 * and `app/(session)/layout` (result/trips/share) so each tree can set lang
 * without `headers()` — keeps evergreen HTML CDN-cacheable.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
