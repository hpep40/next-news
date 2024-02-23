import { Montserrat, Source_Sans_3 } from "next/font/google"
import { notFound } from "next/navigation"
import Script from "next/script"
import { unstable_setRequestLocale } from "next-intl/server"
import { Footer } from "@/components/Footer/Footer"
import { Navigation } from "@/components/Navigation/Navigation"
import { env } from "@/env.mjs"
import { i18n, type Locale } from "@/i18n/i18n"
import { setTranslations } from "@/i18n/setTranslations"
import { getNavigation } from "@/lib/client"
import "@/styles/tailwind.css"
import { cn } from "@/utils/cn"
import { GoogleAnalytics } from "../GoogleAnalytics"
import Providers from "../Providers"

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-montserrat",
})
const sourceSansPro = Source_Sans_3({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-source-sans-pro",
})

export async function generateMetadata({ params }: { params: { lang: Locale } }) {
  const locale = params.lang ?? i18n.defaultLocale
  return {
    metadataBase: new URL("https://bobzar.com"),
    title: "BobZar",
    openGraph: {
      url: env.NEXT_PUBLIC_SITE_URL,
      images: [
        {
          url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/project-logo.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: {
      types: {
        "application/rss+xml": `${env.NEXT_PUBLIC_SITE_URL}/api/${locale}`,
      },
    },
  }
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: { lang?: Locale } }) {
  const locale = params.lang ?? i18n.defaultLocale
  const isValidLocale = i18n.locales.some((cur) => cur === locale)
  if (!isValidLocale) notFound()
  unstable_setRequestLocale(locale)
  const translations = await setTranslations(locale)
  const { navigation, footer } = await getNavigation(locale)

  return (
    <html lang={locale} className={cn(montserrat.variable, sourceSansPro.variable)}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6120553951071328"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <GoogleAnalytics />
      <Providers translations={translations} locale={locale}>
        <body className="flex min-h-screen flex-col items-center font-source-sans-pro antialiased">
          <div className="z-50 flex w-full justify-center border-b bg-white">
            <nav className="flex w-full max-w-[1200px] items-center justify-end gap-4 py-4 ">
              <Navigation navigation={navigation} />
            </nav>
          </div>

          <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-4 pb-16">{children}</main>
          <Footer footer={footer} />
        </body>
      </Providers>
    </html>
  )
}
