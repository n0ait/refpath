"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { z } from "zod";
import { EndTrainingchema } from "@/schemas/training/QuestionSchema";

export const endTraining = async (values: z.infer<typeof EndTrainingchema>) => {
  const user = await currentUser();
  if (!user) return null;

  const { trainingId, finalGrade } = EndTrainingchema.parse(values);

  const trainingUser = await db.trainingUser.findFirst({
    where: {
      id: trainingId,
      userId: user.id,
    },
  });

  if (!trainingUser) return null;

  try {
    await db.trainingUser.update({
      where: {
        id: trainingId,
      },
      data: {
        isComplete: true,
        completedAt: new Date(),
        finalGrade: finalGrade,
      },
    });

    return true
  } catch (error) {
    console.error(error);
    return null;
  }
}