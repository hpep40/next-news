import { ReactNode } from "react"
import { cn } from "@/utils/cn"

export function Tag({
  children,
  variant = "dark",
  className,
  color = undefined,
}: {
  children: ReactNode
  variant?: "light" | "dark" | "transparent"
  className?: string
  color?: string | undefined
}) {
  return (
    <div
      style={{
        color: color,
      }}
      className={cn(
        variant === "transparent" && "bg-custom-slate-100 text-white",
        variant === "dark" && "bg-slate-500/90 px-3 py-2 text-white ",
        variant === "light" && "bg-gray-200 px-3 py-2 text-black ",
        " text-md  max-w-[150px] overflow-hidden text-ellipsis rounded-md text-left font-semibold",
        className
      )}
    >
      {children}
    </div>
  )
}
