import { DynamicLangSelect } from "components/LangSelect/DynamicLangSelect"
import { DynamicSearchDialog } from "components/Search/DynamicSearchDialog"
import type { Locale } from "i18n"
import "../../styles/tailwind.css"
import { useLocale } from "store"
import { GoogleAnalytics } from "./GoogleAnalytics"
import Providers from "./Providers"

export default function Layout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  const lang = params.lang as Locale

  useLocale.setState({ locale: lang })

  return (
    <html lang={lang}>
      <GoogleAnalytics />
      <Providers lang={lang}>
        <body>
          <main className="mx-auto flex max-w-[1200px] flex-col items-center justify-start py-8">
            <nav className="flex w-full justify-end gap-4 px-4">
              <DynamicSearchDialog />
              <DynamicLangSelect />
            </nav>
            {children}
          </main>
        </body>
      </Providers>
    </html>
  )
}
