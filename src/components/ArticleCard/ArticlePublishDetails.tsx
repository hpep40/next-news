import Image from "next/image"
import Link from "next/link"
import { useLocale } from "@/i18n/i18n"
import { cn } from "@/utils/cn"
import { formatDate } from "@/utils/formatDate"

type ArticlePublishDetailsProps = {
  className?: string
  author: string
  publicationDate: string | null | Date
  imageUrl?: string
  link?: string | undefined
  variant?: "dark" | "light"
}

export function ArticlePublishDetails({
  author,
  publicationDate,
  imageUrl,
  link,
  variant = "dark",
  className = "",
}: ArticlePublishDetailsProps) {
  const locale = useLocale()
  return (
    <div
      className={cn(
        variant === "dark" && " text-white",
        variant === "light" && " text-gray-500",
        "flex flex-row-reverse flex-wrap items-center gap-1 self-start whitespace-nowrap text-center text-sm md:gap-2",
        className
      )}
    >
      {publicationDate && (
        <>
          {link && (
            <>
              <Link hrefLang={locale} className="z-[22] text-[#FF782C] underline" target="_blank" href={link}>
                {link.toString()}
              </Link>
              <p>|</p>
            </>
          )}
          <p>{formatDate(publicationDate, locale)}</p>
          <p>|</p>
        </>
      )}
      <div className="flex items-center gap-2">
        <p>{author}</p>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="author"
            width={24}
            height={24}
            className="size-[24px] rounded-full border object-cover"
          />
        )}
      </div>
    </div>
  )
}

export function RecentArticlePublishDetails({
  author,
  publicationDate,
  imageUrl,
  link,
  variant = "dark",
  className = "",
}: ArticlePublishDetailsProps) {
  const locale = useLocale()
  const parsedDate = new Date(publicationDate ?? "").toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div
      className={cn(
        variant === "dark" && " text-white",
        variant === "light" && " text-gray-500",
        "flex w-full flex-col flex-wrap items-center gap-1 self-start whitespace-nowrap text-center text-sm md:flex-row-reverse md:gap-2",
        className
      )}
    >
      {publicationDate && (
        <>
          {link && (
            <>
              <Link hrefLang={locale} className="z-[22] text-[#FF782C] underline" target="_blank" href={link}>
                {link.toString()}
              </Link>
              <p>|</p>
            </>
          )}
          <p>{parsedDate}</p>
        </>
      )}
    </div>
  )
}
