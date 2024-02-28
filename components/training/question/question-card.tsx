"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { QuestionProposition } from "./question-proposition";

interface QuestionCardProps {
  questionId: string
  name: string
  file?: string
  questionNumber: number
  propositions: PropositionProps[]
}

interface PropositionProps {
  id: string
  name: string | null
}

const QuestionCard = ({
    questionId,
    name,
    file,
    questionNumber,
    propositions,
  }: QuestionCardProps
) => {
  return (
    <Card className="shadow-none border duration-300 hover:border-black dark:hover:border-white cursor-pointer">
      <CardHeader>
        <CardDescription>Question N°{questionNumber}</CardDescription>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardFooter>
        <QuestionProposition 
          questionId={questionId}
          propositions={propositions}
        />
      </CardFooter>
    </Card>
  )
}

export default QuestionCard;