import { Skeleton } from "@/components/ui/Skeleton/Skeleton"

export default function Loading() {
  return (
    <div className="flex w-full flex-col gap-4 pb-16 pt-8 md:flex-row">
      <div className="flex w-full flex-col">
        <Skeleton className="min-h-[300px] w-full" />
        <div className="flex w-full flex-col items-start justify-between pt-3 md:pt-4">
          <Skeleton className="min-h-[48px] w-[256px]" />
          <div className="mt-4 flex flex-row gap-3">
            <Skeleton className="size-[40px] rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-[14px] w-[72px]" />
              <Skeleton className="h-[14px] w-[128px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden h-fit w-full max-w-[168px] flex-col gap-4 md:flex md:max-w-[368px]">
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[14px] w-[72px]" />
      </div>
    </div>
  )
}
