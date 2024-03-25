"use client";

import React from "react";

import { Training, Question } from "@prisma/client";
import { useTransition } from "react";
import { Timer, Loader2, ArrowRight } from "lucide-react";
import { differenceInSeconds } from "date-fns";

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
} from "@/components/ui/drawer";
import { formatTimeDelta } from "@/lib/utils";
import { TrainingEnded } from "./training-ended";
import {
  X,
  Check
} from "lucide-react";
import { QuestionMarkIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";


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
    answers: [""],
  });

  const [selectedChoices, setSelectedChoices] = React.useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [subbmitting, setSubmitting] = React.useState(false);

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
    
    if(subbmitting) return;

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
            answers: data.question.answer || [],
          });

        } else {
          setStats((stats) => ({
            ...stats,
            wrong_answers: stats.wrong_answers + 1,
          }));

          setFeedback({
            isCorrect: false,
            explanation: data.question.feedback || "Désolé, aucun feedback n'est disponible pour le moment.",
            answers: data.question.answer || [],
          });
        }
      }).finally(() => {
        setSubmitting(true);
        setDrawerOpen(true);
      });
    });
  }, [selectedChoices, currentQuestion, questionIndex, training.questions]);

  const nextQuestion = () => {
    setSelectedChoices([]);
    setDrawerOpen(false);
    setSubmitting(false);
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

      <div className="flex mt-4">
        <div className="text-slate-400">
          Question {questionIndex + 1} / {training.questions.length}
        </div>
      </div>
      <div className="font-medium">
        {currentQuestion.question.question}
      </div>

      <div className="flex flex-col items-end justify-center w-full mt-4">
      {options.map((option) => (
        <Button
          key={option}
          variant={selectedChoices.includes(option) ? "selectedChoice" : "outline"}

          className={cn("justify-start w-full transition ease-in-out duration-300 py-6 mb-2", {
            "bg-green-600": selectedChoices.includes(option) && feedback.isCorrect && subbmitting,
            "bg-slate-300 text-slate-600 line-through": selectedChoices.includes(option) && !feedback.isCorrect && subbmitting,
            "border-green-600 text-green-600": !selectedChoices.includes(option) && feedback.answers.includes(option) && subbmitting,
          })}

          onClick={() => handleOptionClick(option)}
        >
          <div className="flex items-center justify-start">
            <div className="text-start">{option}</div>
          </div>
        </Button>
      ))}

      {subbmitting ? (
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="mt-2"
            size="sm"
            onClick={() => setDrawerOpen(true)}
          >
            Feedback
            <QuestionMarkIcon className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="default"
            className="mt-2"
            size="sm"
            onClick={nextQuestion}
          >
            Question suivante
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      ) : (
        <Button
          variant="default"
          className="mt-2"
          size="sm"
          onClick={onSubmit}
          disabled={selectedChoices.length === 0 || isPending || hasEnded}
        >
          {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Valider
        </Button>

      )}
      
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>
                  {feedback.isCorrect ? (
                    <span className="text-green-500 flex items-center">
                      <Check className="w-6 h-6 mr-1"/> 
                      Bonne réponse !
                    </span>
                  ): (
                    <span className="text-red-500 flex items-center">
                      <X className="w-6 h-6 mr-1"/>
                      Mauvaise réponse !
                    </span>
                  )}
                </DrawerTitle>
                <DrawerDescription>
                  <span className="font-medium">Feedback: </span>
                  {feedback.explanation}
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                  <Button 
                    onClick={nextQuestion}
                  >
                    Question suivante
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                <DrawerClose asChild>
                  <Button 
                    variant="outline"
                    onClick={() => setDrawerOpen(false)}
                  > 
                    Fermer
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