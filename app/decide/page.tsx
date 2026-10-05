import type { Metadata } from "next"
import { DecidePage } from "@/components/decide-page"
import { decideJsonLdHtml } from "@/lib/seo-json-ld"

const title = "Decide your trip · XingAI Travel"
const description =
  "Describe your real constraints, compare destinations with honest trade-offs, then open partner search links to book the key pieces."

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/decide" },
  openGraph: {
    title,
    description,
    url: "/decide",
    images: [
      {
        url: "/assets/home-hero-hong-kong.webp",
        alt: "A traveler looks across Victoria Harbour and the Hong Kong skyline at sunset",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/assets/home-hero-hong-kong.webp"],
  },
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: decideJsonLdHtml }} />
      <DecidePage />
    </>
  )
}
