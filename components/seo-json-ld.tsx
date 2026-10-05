import { seoJsonLdHtml } from "@/lib/seo-json-ld"

/** Sitewide graph in the first HTML response — not afterInteractive. */
export function SeoJsonLd() {
  return (
    <script
      id="xingai-travel-seo-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: seoJsonLdHtml }}
    />
  )
}
