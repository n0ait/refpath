"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { Question } from "@prisma/client";

export const AnswerQuestion = async (questionId: string) => {
  const user = await currentUser();
  if (!user) return null;
  
  return "";
}

export const NextQuestion = async (trainindId: string) => {
  const user = await currentUser();
  if (!user) return null;
  
  return "";
}