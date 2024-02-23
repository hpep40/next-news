import Image from "next/image"
import Link from "next/link"
import { useLocale } from "@/i18n/i18n"
import { ArticlePublishDetails } from "./ArticlePublishDetails"
import { Tag } from "./Buttons/Tag"

type HeroArticleCardProps = {
  article: {
    imageAlt?: string
    imageUrl?: string
    title: string
    publicationDate: string | null
    tags: { tag: string; tagColor?: { css: string; hex: any } | null }[]
    author: {
      name: string
      imageUrl?: string
    }
    slug: string
  }
  asLink?: boolean
  additionalLink?: string
}

export function HeroArticleCard({
  article: { imageUrl, imageAlt, title, publicationDate, author, tags, slug },
  asLink = true,
  additionalLink,
}: HeroArticleCardProps) {
  const locale = useLocale()

  return (
    <div className="relative w-full overflow-hidden rounded-md text-white">
      <div className="relative h-[320px] bg-slate-900">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={imageAlt ?? "lack of description"}
            width={1200}
            height={320}
            quality={100}
            sizes="(max-width: 640px) 480px, (max-width: 1024px) 780px, (max-width: 1200px) 780px, 1200px"
            className="h-full max-h-[320px] object-cover text-center brightness-[80%]"
            priority
          />
        )}
        <div className="absolute inset-0 z-20 flex w-full flex-col items-start justify-between p-4 md:p-6 ">
          {asLink && (
            <Link
              href={`/${locale}/article/${slug}`}
              aria-label={`Read more about ${title}`}
              className="absolute inset-0 z-[z-21]"
              hrefLang={locale}
            />
          )}
          <div className="flex w-full justify-between">
            <div className="flex flex-wrap gap-2">
              {tags.map(({ tag }) => {
                return <Tag key={tag}>{tag}</Tag>
              })}
            </div>
          </div>
          <div className="flex flex-col justify-around gap-2 md:gap-1">
            <h2 className=" font-montserrat text-[1.8rem] font-bold leading-7 tracking-[1px] md:leading-10">{title}</h2>
            <ArticlePublishDetails
              link={additionalLink}
              imageUrl={author.imageUrl}
              author={author.name}
              publicationDate={publicationDate}
              variant="dark"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
