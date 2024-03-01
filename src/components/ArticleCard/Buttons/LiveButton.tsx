import { ReactNode } from "react"

export function LiveButton({ children }: { children: ReactNode }) {
  return (
    <button className="flex items-center justify-center gap-2 rounded-md bg-custom-green px-3 py-2">
      <div className="size-2 rounded-full bg-white" />
      {children}
    </button>
  )
}
