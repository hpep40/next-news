import { NextRequest, NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"
import { i18n } from "./i18n/i18n"

const intlMiddleware = createMiddleware({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
  localePrefix: "always",
})

export default function middleware(request: NextRequest) {
  if (request.nextUrl.hostname === "bobzar.com") {
    return NextResponse.redirect(`https://www.${request.nextUrl.hostname}${request.nextUrl.pathname}`)
  }

  return intlMiddleware
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
