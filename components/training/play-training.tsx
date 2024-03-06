"use client";

import React from "react";

import { Training, Question } from "@prisma/client";
import { ChevronRight, Timer } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TrainingAnswerChecker from "./training-answers-checker";

type Props = {
  training: Training & {
    questions: {
      question: Pick<Question, "id" | "question" | "options">;
    }[];
  };
}

const PlayTraining = ({ training }: Props) => {
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [selectedChoice, setSelectedChoice] = React.useState<number>(0);

  const currentQuestion = React.useMemo(() => {
    return training.questions[questionIndex];
  }, [questionIndex, training.questions]);

  const options = React.useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.question.options) return [];
    return currentQuestion.question.options as string[];
  }, [currentQuestion]);

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <p className="font-medium">
            {training.title}
          </p>
          <div className="flex self-start mt-3 text-slate-400">
            <Timer className="mr-2" />
            00:00
          </div>
        </div>
        <TrainingAnswerChecker
          correct_answers={16}
          wrong_answers={4}
        />
      </div>

      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
            <div>
              <span>{questionIndex + 1 }</span>
                /
              <span className="text-slate-400">{training.questions.length}</span>
            </div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg">
            {currentQuestion.question.question}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex flex-col items-center justify-center w-full mt-4">
      {options.map((option, index) => {
          return (
            <Button
              key={option}
              variant={selectedChoice === index ? "default" : "outline"}
              className="justify-start w-full py-8 mb-4"
              onClick={() => setSelectedChoice(index)}
            >
              <div className="flex items-center justify-start">
                <div className="p-2 px-3 mr-5 border rounded-md">
                  {index + 1}
                </div>
                <div className="text-start">{option}</div>
              </div>
            </Button>
          );
        })}

        <Button
          variant="default"
          className="mt-2"
          size="lg"
        >
          Question suivante <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
};

export default PlayTraining;