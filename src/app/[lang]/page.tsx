import { Metadata } from "next"
import { unstable_setRequestLocale } from "next-intl/server"
import { hygraphArticleToCardProps } from "@/components/ArticleCard/ArticleCard"
import { HeroArticleCard } from "@/components/ArticleCard/HeroArticleCard"
import { HighlightedArticles } from "@/components/HighlightedArticles/HighlightedArticles"
import { HighlightedCategoryArticles } from "@/components/HighlightedCategoryArticles/HighlightedCategoryArticles"
import { RecentArticles } from "@/components/RecentArticles/RecentArticles"
import { TrendingArticles } from "@/components/TrendingArticles/TrendingArticles"
import { i18n, Locale } from "@/i18n/i18n"
import { setTranslations } from "@/i18n/setTranslations"
import { getHomepage, getHomepageMetadata } from "@/lib/client"
import { getMatadataObj } from "@/utils/getMetadataObj"

export const dynamicParams = false

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata | null> {
  const { seoComponent } = await getHomepageMetadata(params.lang)
  return getMatadataObj({ title: seoComponent?.title, description: seoComponent?.description?.text })
}

export default async function Web({ params }: { params: { lang: Locale } }) {
  unstable_setRequestLocale(params.lang)
  const homepage = await getHomepage(params.lang)
  await setTranslations(params.lang)

  return (
    <>
      <div className="mt-8 flex h-fit flex-col gap-[20px] border-b pb-12 md:max-h-[500px] lg:flex-row lg:pb-0">
        {homepage.heroArticle && (
          <>
            <HeroArticleCard article={hygraphArticleToCardProps(homepage.heroArticle)} asLink />
          </>
        )}
        <TrendingArticles title={homepage.trendingSectionTitle ?? "Trending articles"} />
      </div>
      <RecentArticles title={homepage.recentSectionTitle ?? "Recent articles"} />
      {/* {homepage.highlightedArticles && (
        <HighlightedArticles
          title={homepage.highlightedSectionTitle ?? "Our picks"}
          articles={homepage.highlightedArticles}
        />
      )}
      {homepage.highlightedCategory && (
        <HighlightedCategoryArticles
          title={homepage.highlightedCategoryTitle ?? homepage.highlightedCategory.title}
          categoryId={homepage.highlightedCategory.id}
        />
      )} */}
    </>
  )
}
