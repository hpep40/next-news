"use client"
import { Check, Loader2, Mail } from "lucide-react"

import { useState } from "react"
import { Button } from "@/components/ui/Button/Button"

import { cn } from "@/utils/cn"

import { Input } from "../ui/Input/Input"

export function SubscribeNewsletter() {
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    try {
      setLoading(true)

      await new Promise((r) => setTimeout(r, 2500))

      setIsCompleted(true)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[256px] w-full flex-col gap-2 rounded-md bg-[#f9f9f9] p-[3rem]">
      <div className="flex w-full justify-between gap-6">
        <div
          className={cn(
            "relative flex size-[52px] shrink-0 items-center justify-center rounded-full",
            !isLoading && isCompleted ? "bg-green-500/80" : "bg-red-500/70",
            isLoading && "bg-yellow-500/70"
          )}
        >
          {!isLoading && (isCompleted ? <Check color="white" className="size-[28px]" /> : <Mail color="white" />)}
          {isLoading && <Loader2 color="white" className="size-[28px] animate-spin" />}
        </div>
        <h1 className="font-montserrat text-2xl font-bold">
          {isCompleted ? "Subscription Confirmed" : "Subscribe To Our Weekly Newsletter"}
        </h1>
      </div>
      <p className="font-source-sans-pro leading-7">
        An articles of BobzaR main headlines from the Highlights will be emailed directly to you every week.
      </p>
      <form onSubmit={onSubmitHandler} className="mt-3 flex flex-col gap-2">
        <Input disabled={isLoading || isCompleted} type="email" required placeholder="Email Address" />
        <Button disabled={isLoading || isCompleted} type="submit">
          Subscribe
        </Button>
      </form>
    </div>
  )
}
