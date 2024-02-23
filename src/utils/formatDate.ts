import { i18n, Locale } from "@/i18n/i18n"

export function formatDate(inputDate: Date | string, locale: Locale = i18n.defaultLocale): string {
  const convertedDate = new Date(inputDate)

  const weekday = new Intl.DateTimeFormat(locale, { weekday: "long" }).format(convertedDate)
  const day = new Intl.DateTimeFormat(locale, { day: "numeric" }).format(convertedDate)
  const month = new Intl.DateTimeFormat(locale, { month: "long" }).format(convertedDate)
  const year = new Intl.DateTimeFormat(locale, { year: "numeric" }).format(convertedDate)

  return `${weekday}, ${day} ${month} ${year}`
}
