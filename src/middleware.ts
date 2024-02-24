import { NextRequest, NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"
import { i18n } from "./i18n/i18n"

const intlMiddleware = createMiddleware({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
  localePrefix: "always",
})

export default async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  console.log(url)

  if (url.hostname === "bobzar.com") {
    url.hostname = "www.bobzar.com"
    url.port = ""
    return NextResponse.redirect(url, {
      status: 301,
    })
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
