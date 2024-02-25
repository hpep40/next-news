import { useLocale } from "@/i18n/i18n"
import { cn } from "@/utils/cn"
import { getTrendingArticles } from "./getTrendingArticles"
import { hygraphArticleToCardProps } from "../ArticleCard/ArticleCard"
import { ArticleMinifiedCard } from "../ArticleCard/ArticleMinifiedCard"

type TrendingArticlesProps = {
  title?: string
}

export async function TrendingArticles({ title }: TrendingArticlesProps) {
  const locale = useLocale()
  const trendingArticles = await getTrendingArticles(locale)

  const [_, ...secondaryArticles] = trendingArticles.slice(0, 4)

  return (
    <section className="w-full lg:max-w-[448px]">
      {trendingArticles.length > 0 && (
        <>
          <div className="flex flex-col gap-5">
            {secondaryArticles.length > 0 && (
              <div className="flex flex-col gap-5 lg:h-[490px]">
                {secondaryArticles.map((article) => {
                  return (
                    <ArticleMinifiedCard
                      key={`trending-${article.id}`}
                      article={{
                        title: article.title,
                        imageUrl: article.image?.data.url,
                        slug: article.slug,
                        date: article.publishedAt,
                      }}
                      locale={locale}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  )
}
