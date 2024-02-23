import { notFound } from "next/navigation"
import { Metadata } from "next/types"

import { PageArticleCard } from "@/components/ArticleCard/PageArticleCard"
import { RecommendedArticles } from "@/components/RecommendedArticles/RecommendedArticles"
import { RichText } from "@/components/RichText/RichText"
import { SubscribeNewsletter } from "@/components/SubscribeNewsletter/SubscribeNewsletter"

import { env } from "@/env.mjs"
import { Locale } from "@/i18n/i18n"
import { getArticleBySlug, getArticleMetadataBySlug } from "@/lib/client"
import { getMatadataObj } from "@/utils/getMetadataObj"

type ArticlePageProps = { params: { slug: string; lang: Locale } }

export async function generateMetadata({ params: { slug, lang } }: ArticlePageProps): Promise<Metadata | null> {
  const article = await getArticleMetadataBySlug({ locale: lang, slug })
  if (!article) return null
  const { seoComponent, image } = article

  const description = seoComponent?.description?.text
  const title = seoComponent?.title

  return getMatadataObj({ description, title, image })
}

export default async function Web({ params: { slug, lang } }: ArticlePageProps) {
  const article = await getArticleBySlug({ locale: lang, slug })
  const articleUrl = `${env.NEXT_PUBLIC_SITE_URL}/article/${slug}`
  const initialQuiz = article?.content?.references[0]

  if (!article) return notFound()

  const { image, publishedAt, title, tags, author } = article
  return (
    <>
      <article className="flex w-full flex-col gap-4 pb-16 pt-8 md:flex-row">
        <div className="flex w-full flex-col">
          <PageArticleCard
            article={{
              imageAlt: image?.description?.text,
              imageUrl: image?.data?.url,
              publicationDate: publishedAt,
              title,
              author: { name: author?.name ?? "Anonymous", imageUrl: author?.avatar?.data?.url },
              tags: tags.map(({ tag, tagColor }) => ({
                tag: tag,
                tagColor: { hex: tagColor?.hex, css: tagColor?.css },
              })),
              slug,
            }}
            articleUrl={articleUrl}
            articleTitle={title}
            asLink={false}
          />

          {article.content && (
            <section className="flex w-full flex-col">
              <RichText references={initialQuiz ? [initialQuiz] : []} raw={article.content.raw} />
            </section>
          )}
        </div>
        <div className="hidden h-fit w-full max-w-[168px] flex-col gap-4 md:flex md:max-w-[368px]">
          <SubscribeNewsletter />
          <RecommendedArticles id={article.id} />
        </div>
      </article>
    </>
  )
}
