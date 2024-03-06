"use client";

import React from "react";
import { z } from "zod";

import { Training, Question } from "@prisma/client";
import { useTransition } from "react";
import { Check, Timer } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TrainingAnswerChecker from "./training-answers-checker";
import { CheckAnswerSchema } from "@/schemas/training/QuestionSchema";
import { answerQuestion } from "@/actions/question/answer-question";

type Props = {
  training: Training & {
    questions: {
      id: string
      question: Pick<Question, "id" | "question" | "options">;
    }[];
  };
}

const PlayTraining = ({ training }: Props) => {
  const [questionIndex, setQuestionIndex] = React.useState(0);
  // Keep using array for selected choices to handle multiple selections
  const [selectedChoices, setSelectedChoices] = React.useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const currentQuestion = React.useMemo(() => {
    return training.questions[questionIndex];
  }, [questionIndex, training.questions]);

  const options = React.useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.question.options) return [];
    return currentQuestion.question.options as string[];
  }, [currentQuestion]);

  const handleOptionClick = (optionValue: string) => {
    const selectedIndex = selectedChoices.indexOf(optionValue);
    if (selectedIndex > -1) {
      setSelectedChoices(selectedChoices.filter((choice) => choice !== optionValue));
    } else {
      setSelectedChoices([...selectedChoices, optionValue]);
    }
  };

  const onSubmit = () => {
    const submissionValues = {
      userInput: selectedChoices,
      trainingQuestionId: currentQuestion.id,
      questionId: currentQuestion.question.id,
    };
    
    startTransition(() => {
      answerQuestion(submissionValues).then((isCorrect) => {
        if (isCorrect) {
          setQuestionIndex(questionIndex + 1);
        }
      });

      setSelectedChoices([]);
    });
  };

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
          correct_answers={3}
          wrong_answers={0}
        />
      </div>

      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center">
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

      <div className="flex flex-col items-end justify-center w-full mt-4">
      {options.map((option) => (
        <Button
          key={option}
          variant={selectedChoices.includes(option) ? "selectedChoice" : "outline"}
          className="justify-start w-full transition ease-in-out duration-300 py-6 mb-2"
          onClick={() => handleOptionClick(option)}
        >
          <div className="flex items-center justify-start">
            <div className="text-start">{option}</div>
          </div>
        </Button>
      ))}

      <Button
        variant="default"
        className="mt-2"
        size="lg"
        onClick={onSubmit}
        disabled={selectedChoices.length === 0 || isPending}
      >
        Submit <Check className="w-4 h-4 ml-2" />
      </Button>
      </div>
    </div>
  )
};

export default PlayTraining;