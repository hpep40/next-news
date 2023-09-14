"use client"

import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { GetRecentArticlesQuery } from "gql/graphql"
import { HygraphClient } from "hygraphClient"
import { Locale } from "i18n"
import { useState } from "react"
import Image from "next/image"
import { Button } from "components/ui/Button/Button"
import { RECENT_ARTICLES_PER_PAGE } from "./RecentArticles"
import Link from "next/link"

type RecentArticlesInfiniteProps = {
  initialArticles: GetRecentArticlesQuery
  lang: Locale
}

export function RecentArticlesInfinite({ initialArticles, lang }: RecentArticlesInfiniteProps) {
  const { getRecentArticles } = HygraphClient(lang)

  const {
    data: recentArticlesQuery,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["recent-articles"],
    queryFn: ({ pageParam = 0 }) =>
      getRecentArticles({ skip: RECENT_ARTICLES_PER_PAGE * pageParam, perPage: RECENT_ARTICLES_PER_PAGE }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.articlesConnection.aggregate.count <= pages.length * RECENT_ARTICLES_PER_PAGE) return undefined
      return pages.length
    },
    initialData: {
      pages: [initialArticles],
      pageParams: [0],
    },
  })

  return (
    <>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {recentArticlesQuery?.pages
          .flatMap((page) => page.articles)
          .map((article) => {
            return (
              <Link href={`/${lang}/article/${article.slug}`} prefetch={false} passHref key={`recent-${article.id}`}>
                <article className="flex flex-col gap-2">
                  <div className="h-[157px] max-w-[300px] rounded-sm bg-slate-100">
                    {article.coverImage?.url && (
                      <Image
                        src={article.coverImage.url}
                        alt={article.title}
                        width={300}
                        height={157}
                        className="h-[157px] w-[300px] rounded-sm object-cover"
                      />
                    )}
                  </div>
                  <div className="font-semibold">{article.title}</div>
                </article>
              </Link>
            )
          })}
      </div>
      {hasNextPage && (
        <Button className="mt-16 w-full bg-slate-100 p-4" disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
          See more
        </Button>
      )}
    </>
  )
}