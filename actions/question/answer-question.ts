"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const AnswerQuestion = async (questionId: string, trainingId: string) => {
  const user = await currentUser();
  if (!user) return null;

  console.log(questionId, trainingId);
  
  return "";
}