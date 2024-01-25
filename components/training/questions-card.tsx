"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";

interface QuestionCardProps {
  id: string
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
    id,
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
        <p>{JSON.stringify(propositions)}</p>
      </CardFooter>
    </Card>
  )
}

export default QuestionCard;