import { RichTextContent } from "@graphcms/rich-text-types"
import Image from "next/image"
import Link from "next/link"
import { useLocale } from "@/i18n/i18n"
import { cn } from "@/utils/cn"

import { RichText } from "../RichText/RichText"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/Tooltip/Tooltip"
import { Tag } from "../ArticleCard/Buttons/Tag"
import { ArticlePublishDetails, RecentArticlePublishDetails } from "../ArticleCard/ArticlePublishDetails"

type ArticleCardProps = {
  article: {
    imageAlt?: string
    imageUrl?: string
    title: string
    publicationDate: string | null
    tags: { tag: string; tagColor?: { css: string; hex: any } | null }[]
    slug: string
    content?: { raw: RichTextContent } | null
    author: {
      name: string
      imageUrl?: string
    }
  }
  tagsPosition?: "over" | "under"
  orientation?: "vertical" | "horizontal"
  lines?: "1" | "2" | "3"
  isMain?: boolean
  imageClassName?: string
}

export const hygraphArticleToCardProps = (article: {
  tags: { tag: string; tagColor?: { css: string; hex: any } | null }[]
  title: string
  author?: { name: string; avatar?: { data: { url: string } } | undefined | null } | null
  image?: { data: { url: string }; description?: { text: string } | undefined | null } | null
  publishedAt?: string
  content?: { raw: RichTextContent } | null
  slug: string
}) => {
  return {
    tags: article?.tags?.map(({ tag, tagColor }) => ({ tag: tag, tagColor: tagColor })),
    imageUrl: article?.image?.data?.url,
    imageAlt: article.image?.description?.text,
    title: article?.title,
    content: article?.content,
    author: { name: article?.author?.name ?? "Anonymous", imageUrl: article?.author?.avatar?.data?.url },
    publicationDate: article?.publishedAt ? article.publishedAt : null,
    slug: article?.slug,
  }
}

export function RecentArticleCard({
  article: { imageUrl, imageAlt, title, publicationDate, author, tags, slug, content },
  tagsPosition = "under",
  orientation = "vertical",
  lines = "2",
  isMain = false,
  imageClassName,
}: ArticleCardProps) {
  const parsedDate = new Date(publicationDate ?? "").toLocaleDateString([], {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const locale = useLocale()
  const mainTag = tags?.[0]
  return (
    <Link href={`/${locale}/article/${slug}`} hrefLang={locale} className="w-full">
      <article
        className={cn(
          orientation === "vertical" && "flex-col",
          orientation === "horizontal" && "flex-row",
          "flex h-full w-full cursor-pointer gap-5 overflow-hidden rounded-md md:max-h-[490px] md:gap-0",
          isMain && "max-h-[490px] flex-col gap-0"
        )}
      >
        <div
          className={cn(
            orientation === "horizontal" ? "min-h-[82px] md:min-w-[204px]" : "md:w-full",
            "bg-gradient-to-brh-[264px] relative h-[100px] min-h-[100px] min-w-[170px] rounded-md from-gray-200 to-gray-300 md:min-h-[264px]",
            isMain && "min-h-[264px] w-auto",
            imageClassName
          )}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={imageAlt ?? "lack of description"}
              fill
              sizes="(max-width: 220px) 200px, 480px, (max-width: 640px) 480px, 780px, (max-width: 1024px) 780px, 1020px"
              className={cn(
                "h-[200px] min-h-[100px] w-full rounded-md bg-gradient-to-br from-gray-200 to-gray-300 object-cover text-center brightness-90 md:h-[264px] md:min-h-[264px]",
                isMain && "h-[264px] min-h-[264px] rounded-none"
              )}
            />
          )}
        </div>
        <div
          className={cn(
            "flex flex-1 flex-col",
            orientation === "vertical" && "rounded-b-md border-t-0",
            orientation === "horizontal" && "rounded-r-md border-l-0",
            isMain && "border"
          )}
        >
          <div
            className={cn(
              "flex flex-1 flex-col items-start gap-0 pt-0 md:p-3 md:pt-2 lg:p-4 ",
              isMain && "flex-col justify-start p-5 pt-2",
              !mainTag && "lg:pt-4"
            )}
          >
            <h2
              className={cn(
                lines === "1" && "md:line-clamp-1",
                lines === "2" && "md:line-clamp-2",
                lines === "3" && "md:line-clamp-3",
                "mb-2 line-clamp-3 h-fit min-h-[40px] font-montserrat text-[16px] font-semibold md:font-bold md:leading-9 xl:py-2"
              )}
            >
              {title}
            </h2>
            {content && (
              <div className="hidden max-h-[90px] overflow-hidden md:block">
                <RichText pClassName="line-clamp-3" raw={content.raw} />
              </div>
            )}
            <RecentArticlePublishDetails
              className={cn("flex", isMain && "flex")}
              imageUrl={author.imageUrl}
              author={author.name}
              publicationDate={publicationDate}
              variant="light"
            />
          </div>
        </div>
      </article>
    </Link>
  )
}
