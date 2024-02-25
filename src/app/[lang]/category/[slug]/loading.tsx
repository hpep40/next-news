import { Skeleton } from "@/components/ui/Skeleton/Skeleton"

export default function Loading() {
  return (
    <div className="w-full">
      <div className="mb-10 w-full border-b-[1px] py-14">
        <Skeleton className="mb-6 h-[36px] w-full" />
        <Skeleton className="mb-2 h-[16px] w-[9.5%]" />
        <Skeleton className="h-[28px] w-[25%]" />
      </div>
    </div>
  )
}
