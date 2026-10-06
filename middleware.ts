import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { isIndexablePublicPath, stripLocalePrefix } from "@/lib/public-locale"

const LOCALE_HEADER = "x-xingai-locale"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const { locale, path } = stripLocalePrefix(pathname)
  const headers = new Headers(request.headers)

  if (locale === "en") {
    headers.set(LOCALE_HEADER, "en")
    return NextResponse.next({ request: { headers } })
  }

  if (!isIndexablePublicPath(path)) {
    const url = request.nextUrl.clone()
    url.pathname = path
    return NextResponse.redirect(url)
  }

  headers.set(LOCALE_HEADER, locale)
  const url = request.nextUrl.clone()
  url.pathname = path
  return NextResponse.rewrite(url, { request: { headers } })
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
