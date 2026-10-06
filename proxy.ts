import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { isIndexablePublicPath, stripLocalePrefix } from "@/lib/public-locale"

/**
 * English stays unprefixed in the address bar; indexable routes live under `app/[locale]`.
 * Rewrite `/decide` → `/en/decide`. Prefixed `/zh|ko|es/...` pass through.
 * `/en/...` redirects to the bare English URL so canonicals stay unique.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const { locale, path } = stripLocalePrefix(pathname)

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone()
    url.pathname = pathname === "/en" ? "/" : pathname.slice(3) || "/"
    return NextResponse.redirect(url)
  }

  if (locale !== "en") {
    if (!isIndexablePublicPath(path)) {
      const url = request.nextUrl.clone()
      url.pathname = path
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  if (isIndexablePublicPath(pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = pathname === "/" ? "/en" : `/en${pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
