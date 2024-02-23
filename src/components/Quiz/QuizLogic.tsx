"use client"

import { useQuery } from "@tanstack/react-query"
import { ArrowRight, Check, XCircle } from "lucide-react"
import { useState } from "react"
import { QuizAnswer, QuizQuestion } from "@/gql/graphql"
import { useLocale } from "@/i18n/i18n"
import { getQuizQuestionsById } from "@/lib/client"
import { cn } from "@/utils/cn"
import { RichText } from "../RichText/RichText"
import { Skeleton } from "../ui/Skeleton/Skeleton"
import { Button } from "../ui/Button/Button"

type ExtendedQuizAnswer = QuizAnswer & { status?: "clicked" | null }

type ExtendedQuizQuestion = QuizQuestion & { answer: ExtendedQuizAnswer[]; isAnswered?: boolean }

export type QuizProps = { id: string }

export function QuizLogic({ id }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const locale = useLocale()
  const { data, isLoading } = useQuery(
    ["quiz-questions", id],
    () => getQuizQuestionsById({ locale, id: id, skip: 0 }),
    {
      onSuccess: (data) => {
        setQuestions(data as QuizQuestion[])
      },
    }
  )

  const [questions, setQuestions] = useState<ExtendedQuizQuestion[]>((data as QuizQuestion[]) ?? [])

  const currentQuestion = questions?.[currentQuestionIndex]

  const pickAnswer = (id: string) => {
    setQuestions((prev) => {
      return prev.map((question) => {
        if (question.id !== currentQuestion.id) return question

        const updatedAnswers = question.answer.map((answer): ExtendedQuizAnswer => {
          if (answer.id === id) {
            return { ...answer, status: "clicked" }
          }
          return answer
        })

        return { ...question, answer: updatedAnswers }
      })
    })
  }

  const endQuestion = () => {
    setQuestions((prev) => {
      return prev.map((question) => {
        if (question.id !== currentQuestion.id) return question

        return { ...question, isAnswered: true }
      })
    })
  }

  const handleClickQuestion = (id: string) => {
    const remainingValidAnswers = currentQuestion.answer.filter((answer) => answer.isValid && !answer.status)
    const clickedAnswer = currentQuestion.answer.find((answer) => answer.id === id)
    if (currentQuestion.isAnswered || !clickedAnswer) return
    pickAnswer(id)
    if (remainingValidAnswers.length === 1 && clickedAnswer.isValid) {
      endQuestion()
    }
  }

  const isFirstQuestion = currentQuestionIndex === 0
  const isLastQuestion = currentQuestionIndex + 1 === data?.length

  const nextQuestion = () => {
    if (isLastQuestion) return
    setCurrentQuestionIndex((prev) => prev + 1)
  }

  const previousQuestion = () => {
    if (isFirstQuestion) return
    setCurrentQuestionIndex((prev) => prev - 1)
  }

  if (isLoading || !data) return <Skeleton className="h-[20vh] w-full rounded-xl bg-custom-gray-200" />

  return (
    <div className="w-full flex-col items-center justify-center rounded-xl border-[1px] p-5">
      <div className="w-full items-center justify-center">
        <div className="mx-1 flex items-center justify-between pb-8">
          {currentQuestion?.content?.raw && <RichText raw={currentQuestion?.content?.raw} />}
          <p className="font-semibold text-custom-gray-300">
            {currentQuestionIndex + 1}/{data?.length}
          </p>
        </div>
        <ul className="flex flex-col gap-y-3">
          {currentQuestion?.answer?.map((answer: ExtendedQuizAnswer, index) => (
            <li
              onClick={() => handleClickQuestion(answer.id)}
              key={index}
              className={cn(
                answer.status && answer.isValid && "bg-green-500",
                answer.status && !answer.isValid && "bg-custom-gray-200",
                !answer.status && !currentQuestion.isAnswered && "cursor-pointer hover:bg-slate-50",
                "flex items-center justify-between rounded-md border-[1px] px-4 py-2"
              )}
            >
              <RichText raw={answer?.content?.raw} pClassName={cn(answer.status && answer.isValid && "text-white")} />
              {answer.status && answer.isValid && <Check stroke="white" />}
              {answer.status && !answer.isValid && <XCircle stroke="#D9D9D9" />}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 flex w-full justify-between">
        <Button
          disabled={isFirstQuestion}
          variant="outline"
          className="p-4 disabled:text-custom-gray-300"
          onClick={previousQuestion}
        >
          Back
        </Button>
        <Button
          disabled={isLastQuestion}
          variant="default"
          className="flex items-center gap-2 px-4 py-1"
          onClick={nextQuestion}
        >
          Next
          <ArrowRight />
        </Button>
      </div>
    </div>
  )
}

export default QuizLogic
