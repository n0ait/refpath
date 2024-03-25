"use client";

import React from "react";

import { Training, Question } from "@prisma/client";
import { useTransition } from "react";
import { Timer, Loader2 } from "lucide-react";
import { differenceInSeconds, set } from "date-fns";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TrainingAnswerChecker from "./training-answers-checker";
import { answerQuestion } from "@/actions/question/answer-question";
import { endTraining } from "@/actions/training/end-training";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { formatTimeDelta } from "@/lib/utils";
import { TrainingEnded } from "./training-ended";


type PlayTrainingProps = {
  training: Training & {
    questions: {
      id: string
      question: Pick<Question, "id" | "question" | "options">;
    }[];
  },
  trainindUserId: string
}

const PlayTraining = ({ training, trainindUserId }: PlayTrainingProps) => {
  const [questionIndex, setQuestionIndex] = React.useState(0);
  
  const [hasEnded, setHasEnded] = React.useState(false);
  const [now, setNow] = React.useState(new Date());
  const [stats, setStats] = React.useState({
    correct_answers: 0,
    wrong_answers: 0,
  });

  const [feedback, setFeedback] = React.useState({
    isCorrect: false,
    explanation: "",
  });

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

  const submitEndTraining = () => {
    const submissionValues = {
      trainingId: trainindUserId,
      finalGrade: stats.correct_answers,
    };

    startTransition(() => {
      endTraining(submissionValues).then(() => {
        setHasEnded(true);
      }
    )});
  }

  const onSubmit = React.useCallback(() => {
    const submissionValues = {
      userInput: selectedChoices,
      trainingQuestionId: currentQuestion.id,
      questionId: currentQuestion.question.id,
    };
    
    startTransition(() => {
      answerQuestion(submissionValues).then((data) => {
        if(!data) return;

        if (data.isCorrect) {
          setStats((stats) => ({
            ...stats,
            correct_answers: stats.correct_answers + 1,
          }));

          setFeedback({
            isCorrect: true,
            explanation: data.question.feedback || "Désolé, aucun feedback n'est disponible pour le moment.",
          });

        } else {
          setStats((stats) => ({
            ...stats,
            wrong_answers: stats.wrong_answers + 1,
          }));

          setFeedback({
            isCorrect: false,
            explanation: data.question.feedback || "Désolé, aucun feedback n'est disponible pour le moment.",
          });
        }
      });

      setSelectedChoices([]);
    });
  }, [selectedChoices, currentQuestion, questionIndex, training.questions]);

  const nextQuestion = () => {
    setQuestionIndex(questionIndex + 1);
    
    if (questionIndex === training.questions.length - 1) {
      submitEndTraining();
      setHasEnded(true);
      return;
    }
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!hasEnded) {
        setNow(new Date());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [hasEnded]);

  if (hasEnded) {
    return (
      <TrainingEnded
        now={now}
        createdAt={training.createdAt}
        id={training.id}
      />
    );
  }

  return (
    <div className="mx-auto max-w-[700px]">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <p className="font-medium">
            {training.title}
          </p>
          <div className="flex self-start mt-3 text-slate-400">
            <Timer className="mr-2" />
            {formatTimeDelta(differenceInSeconds(now, training.createdAt))}
          </div>
        </div>
        <TrainingAnswerChecker
          correct_answers={stats.correct_answers}
          wrong_answers={stats.wrong_answers}
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

        <Drawer onClose={nextQuestion}>
          <DrawerTrigger asChild>
            <Button
              variant="default"
              className="mt-2"
              size="lg"
              onClick={onSubmit}
              disabled={selectedChoices.length === 0 || isPending || hasEnded}
            >
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Valider
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>
                  {feedback.isCorrect ? (
                    <span className="text-green-500">
                      Bonne réponse !
                    </span>
                  ): (
                    <span className="text-red-500">
                      Mauvaise réponse !
                    </span>
                  )}
                </DrawerTitle>
                <DrawerDescription>
                  Explication: {feedback.explanation}
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button 
                    onClick={nextQuestion}
                  >
                    Question suivante
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
};

export default PlayTraining;