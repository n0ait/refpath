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

  // this is the user input [ 'E', 'D', 'A' ] / this is answers [ 'A', 'D', 'E' ]
  // check if the user input contain the same values as the answers, the array are JSON
  //const isCorrect = JSON.stringify(userInput.sort()) === question.answer.sort();

  const isCorrect = true; // replace this line with the above line

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

  return isCorrect;
}