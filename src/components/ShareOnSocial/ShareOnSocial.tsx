import { useLocale } from "@/i18n/i18n"
import { getTranslations } from "@/i18n/setTranslations"
import FacebookIcon from "./Icons/Facebook"
import TwitterIcon from "./Icons/Twitter"
import WhatsAppIcon from "./Icons/WhatsApp"

type ShareOnSocialProps = {
  articleTitle: string
  articleUrl: string
}

export function ShareOnSocial({ articleTitle, articleUrl }: ShareOnSocialProps) {
  const translations = getTranslations()

  const locale = useLocale()
  const encodedTitle = encodeURIComponent(articleTitle)
  const encodedUrl = encodeURIComponent(articleUrl)

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${articleUrl}`
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  const whatsppShareUrlDesktop = `https://web.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`
  const whatsppShareUrlMobile = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`

  return (
    <div className="flex items-center justify-between gap-2 py-5 lg:justify-normal">
      <div className="flex w-full items-center justify-between gap-1">
        <a
          href={twitterShareUrl}
          aria-label="Twitter"
          hrefLang={locale}
          className="rounded-md bg-[#000000] fill-[white] p-2"
        >
          <TwitterIcon />
        </a>
        <a
          href={facebookShareUrl}
          aria-label="Facebook"
          hrefLang={locale}
          className="rounded-md bg-[#0866FF] fill-white p-2"
        >
          <FacebookIcon />
        </a>
        <a
          href={whatsppShareUrlDesktop}
          aria-label="WhatsApp"
          hrefLang={locale}
          className="hidden rounded-md bg-[#25D366] fill-white p-2 lg:block"
        >
          <WhatsAppIcon />
        </a>
        <a
          href={whatsppShareUrlMobile}
          aria-label="WhatsApp"
          hrefLang={locale}
          className="block rounded-md bg-[#25D366] fill-white p-2 lg:hidden"
        >
          <WhatsAppIcon />
        </a>
      </div>
    </div>
  )
}
