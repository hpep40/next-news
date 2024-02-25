import { GetHomepageQuery } from "@/gql/graphql"
import { ArticleCard, hygraphArticleToCardProps } from "../ArticleCard/ArticleCard"

type HighlightedArticlesProps = {
  title: string
  articles: GetHomepageQuery["homepages"][0]["highlightedArticles"]
}

export async function HighlightedArticles({ title, articles }: HighlightedArticlesProps) {
  return (
    <section className="w-full border-b pb-8">
      <h2 className="py-4 font-montserrat text-[22px] font-semibold tracking-tight">{title}</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {articles.map((article) => {
          return (
            <ArticleCard
              orientation="vertical"
              key={`highlighted-${article.id}`}
              tagsPosition="under"
              lines={"2"}
              article={hygraphArticleToCardProps(article)}
            />
          )
        })}
      </div>
    </section>
  )
}
