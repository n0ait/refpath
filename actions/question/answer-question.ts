"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { z } from "zod";
import { CheckAnswerSchema } from "@/schemas/training/QuestionSchema";

export const answerQuestion = async (values: z.infer<typeof CheckAnswerSchema>) => {
  const user = await currentUser();
  if (!user) return null;

  const { userInput, questionId, trainingQuestionId } = CheckAnswerSchema.parse(values);

  const question = await db.question.findUnique({
    where: {
      id: questionId,
    },
  });

  if (!question || !question.answer) return null;

  const isCorrect = userInput.every((choice) => question.answer.includes(choice));

  try {
    await db.trainingQuestion.update({
      where: {
        id: trainingQuestionId
      },
      data: {
        isCorrect,
        answers: userInput
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }

  return {isCorrect, question};
}

const getQuestionFeedback = async (questionId: string) => {
  const question = await db.question.findUnique({
    where: {
      id: questionId
    },
    select: {
      feedback: true
    }
  });

  return question;
}