"use client"

import { useQuery } from "@tanstack/react-query"
import { useLocale } from "@/i18n/i18n"
import { useTranslations } from "@/i18n/useTranslations"
import { getArticleRecommendedArticles } from "@/lib/client"
import { ArticleCard, hygraphArticleToCardProps } from "../ArticleCard/ArticleCard"

type RecommendedArticlesProps = { id: string }

export function RecommendedArticles({ id }: RecommendedArticlesProps) {
  const locale = useLocale()
  const translations = useTranslations()
  const { data: recommendedArticles, isLoading } = useQuery({
    queryKey: [`recommended-articles`, id],
    queryFn: () => getArticleRecommendedArticles({ locale, id }),
  })

  if (!isLoading && recommendedArticles?.length === 0) return null
  return (
    <section className="w-full">
      <h2 className="mb-4 scroll-m-20 text-3xl font-semibold tracking-tight">{translations.relatedArticles}</h2>
      <div className={`grid gap-4 md:grid-cols-1`}>
        {isLoading &&
          Array.from(Array(3).keys()).map((idx) => {
            return <ArticleSkeleton key={`skeleton-${idx}`} />
          })}
        {!isLoading &&
          recommendedArticles?.map((article) => {
            return (
              <ArticleCard
                key={`trending-${article.id}`}
                article={hygraphArticleToCardProps(article)}
                tagsPosition="under"
              />
            )
          })}
      </div>
    </section>
  )
}

function ArticleSkeleton() {
  return <div className=" h-[481px] animate-pulse rounded-xl bg-gray-100"></div>
}
