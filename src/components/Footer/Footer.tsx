import Image from "next/image"
import Link from "next/link"
import { useLocale } from "@/i18n/i18n"
import FacebookIcon from "../../../public/icons/facebook.svg"
import InstagramIcon from "../../../public/icons/instagram.svg"
import XIcon from "../../../public/icons/X.svg"
import YoutubeIcon from "../../../public/icons/youtube.svg"
import { DynamicLangSelect } from "../LangSelect/DynamicLangSelect"
import { GetNavigationReturn } from "../Navigation/Navigation"

type FooterProps = {
  footer: Pick<GetNavigationReturn, "footer">["footer"]
}

export async function Footer({ footer }: FooterProps) {
  const locale = useLocale()

  if (!footer?.contactSection) return null
  const { companyName, links } = footer

  return (
    <footer className="flex w-full items-center justify-center border-t bg-transparent py-4">
      <div className="flex w-full max-w-[1200px] flex-col flex-wrap items-start justify-between gap-[12px] p-4 md:flex-nowrap">
        <div className="flex flex-col justify-between gap-10 md:max-w-[30%] lg:items-end lg:gap-3">
          <small className="text-[13px] font-medium leading-none text-muted-foreground md:text-[12px]">
            © {new Date().getFullYear()} {companyName} {footer?.ownershipAndCredits}
          </small>
        </div>
        <nav className="flex flex-col justify-between gap-10 md:gap-7">
          <ul className="flex gap-2 text-[13px] md:text-[12px]">
            {links
              ?.filter((item) => item.element?.__typename === "Page")
              .map((footerElement) => {
                const categoryUrl = footerElement.element?.__typename === "Category" ? "/category" : ""
                const url = `/${locale}${categoryUrl}/${footerElement?.element?.slug}`
                return (
                  <li key={footerElement?.element?.slug} className="w-fit">
                    <Link
                      className="font-medium leading-none text-muted-foreground underline-offset-2 hover:underline"
                      prefetch={false}
                      href={url}
                      hrefLang={locale}
                    >
                      {footerElement?.element?.title}
                    </Link>
                  </li>
                )
              })}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
