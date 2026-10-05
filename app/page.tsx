import type { Metadata } from "next"
import { HomeLanding } from "@/components/home-landing"
import { homeJsonLdHtml } from "@/lib/content/home-landing"

const title = "XingAI Travel — Make a better travel decision"
const description =
  "XingAI Travel helps you compare trip options and trade-offs so you can decide. Other travel sites help you search. You stay in control. Suggestions only — verify before you book."

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: homeJsonLdHtml }} />
      <HomeLanding />
    </>
  )
}
