"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const AnswerQuestion = async (questionId: string, trainingId: string) => {
  const user = await currentUser();
  if (!user) return null;

  await db.trainingQuestion.update({
    where: {
      questionId_trainingId: {questionId, trainingId }
    },
    data: {
      isAnswered: true
    },
  })
  
  return "";
}