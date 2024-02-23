import Image from "next/image"
import { ShareOnSocial } from "@/components/ShareOnSocial/ShareOnSocial"

import { useLocale } from "@/i18n/i18n"
import { cn } from "@/utils/cn"
import { formatDate } from "@/utils/formatDate"
import { Tag } from "./Buttons/Tag"

type PageArticleCardProps = {
  article: {
    imageAlt?: string
    imageUrl?: string
    title: string
    publicationDate: string | null
    tags: {
      tag: string
      tagColor?:
        | {
            hex: any
            css?: string
          }
        | undefined
        | null
    }[]
    author: {
      name: string
      imageUrl?: string
    }
    slug: string
  }
  articleTitle: string
  articleUrl: string
  asLink?: boolean
  additionalLink?: string
}

export function PageArticleCard({
  article: { imageUrl, imageAlt, title, publicationDate, author, tags, slug },
  articleTitle,
  articleUrl,
  additionalLink,
}: PageArticleCardProps) {
  return (
    <div className="flex w-full flex-col">
      <div className="relative h-[420px] rounded-md bg-slate-900">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={imageAlt ?? "lack of description"}
            width={1200}
            height={420}
            quality={100}
            sizes="(max-width: 640px) 480px, (max-width: 1024px) 780px, (max-width: 1200px) 780px, 1200px"
            className="h-full max-h-[420px] rounded-md object-cover text-center brightness-[80%]"
            priority
          />
        )}
      </div>
      <div className="flex w-full flex-col items-start justify-between pt-3 md:pt-4">
        <div className="mb-2 flex w-full justify-between">
          <div className="flex flex-wrap gap-2">
            {tags.map(({ tag, tagColor }) => {
              return (
                // eslint-disable-next-line tailwindcss/no-custom-classname
                <Tag color={tagColor?.css} variant="transparent" key={tag}>
                  {tag}
                </Tag>
              )
            })}
          </div>
        </div>
        <div className="flex w-full flex-col justify-around gap-2 md:gap-1">
          <h1 className="scroll-m-20 font-montserrat text-4xl font-bold tracking-tight lg:text-5xl">{title}</h1>
          <div className="flex w-full items-center justify-between">
            <ArticlePublishDetails
              link={additionalLink}
              imageUrl={author.imageUrl}
              author={author.name}
              publicationDate={publicationDate}
              variant="light"
              className="mt-4"
            />
            <ShareOnSocial articleUrl={articleUrl} articleTitle={articleTitle} />
          </div>
        </div>
      </div>
    </div>
  )
}

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
  variant = "dark",
  className = "",
}: ArticlePublishDetailsProps) {
  const locale = useLocale()
  return (
    <div
      className={cn(
        variant === "dark" && " text-white",
        variant === "light" && " text-gray-500",
        "flex flex-wrap items-start gap-3 self-start whitespace-nowrap text-center text-sm",
        className
      )}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="author"
          width={40}
          height={40}
          className="size-[40px] rounded-full border object-cover"
        />
      )}
      <div className="flex flex-col items-start gap-1 text-black">
        <small className="text-sm font-medium leading-none">{author}</small>
        {publicationDate && (
          <>
            <small className="text-sm font-normal leading-none">{formatDate(publicationDate, locale)}</small>
          </>
        )}
      </div>
    </div>
  )
}
