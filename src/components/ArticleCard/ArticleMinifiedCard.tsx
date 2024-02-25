import Image from "next/image"
import Link from "next/link"
import { Locale } from "@/i18n/i18n"

type ArticleMinifiedCardProps = {
  article: {
    imageAlt?: string
    imageUrl?: string
    title: string
    slug: string
    date: string
  }
  locale: Locale
}

export function ArticleMinifiedCard({
  article: { imageUrl, imageAlt, title, slug, date },
  locale,
}: ArticleMinifiedCardProps) {
  const parsedDate = new Date(date).toLocaleDateString([], {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <Link href={`/${locale}/article/${slug}`} hrefLang={locale}>
      <article className="flex w-full gap-5">
        <div className="relative aspect-video h-[100px] min-w-[170px] max-w-[170px] rounded-xl bg-gradient-to-br from-gray-200 to-gray-300">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={imageAlt ?? "lack of description"}
              layout="fill"
              className=" min-h-[100px] rounded-md object-cover text-center brightness-90"
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div className="line-clamp-3 font-montserrat text-[16px] font-bold">{title}</div>
          <p className="font-source-sans-pro text-sm text-muted-foreground">{parsedDate}</p>
        </div>
      </article>
    </Link>
  )
}
