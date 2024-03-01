import { useLocale } from "@/i18n/i18n"
import { getRecentArticles } from "@/lib/client"
import { RecentArticlesInfiniteDynamic } from "./RecentArticlesInfiniteDynamic"

export const RECENT_ARTICLES_PER_PAGE = 6

type RecentArticlesProps = {
  title: string
}

export async function RecentArticles({ title }: RecentArticlesProps) {
  const locale = useLocale()
  const initialArticles = await getRecentArticles({ locale, first: 3, skip: 0 })

  return (
    <section className="w-full">
      <h2 className="py-4 font-montserrat text-[24px] font-semibold tracking-tight">{title}</h2>
      <RecentArticlesInfiniteDynamic initialArticles={initialArticles} />
    </section>
  )
}
