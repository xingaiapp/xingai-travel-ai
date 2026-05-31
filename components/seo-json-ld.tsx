import Script from "next/script"
import { seoJsonLdHtml } from "@/lib/seo-json-ld"

export function SeoJsonLd() {
  return (
    <Script
      id="xingai-travel-seo-json-ld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: seoJsonLdHtml }}
    />
  )
}
