"use server";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { StartTraining } from "./schema";
import { InputType, ReturnType } from "./types";
import { currentUser } from "@/lib/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser();

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  let { trainingId } = data;

  try {
    const training = await db.trainingUser.create({
      data: {
        trainingId: trainingId,
        userId: user.id
      }
    });

    return {
      data: training,
    };
  } catch (error) {
    console.log(error)
    return {
      error: "Erreur lors du début de l'entraînement..."
    }
  }
};

export const startTraining = createSafeAction(StartTraining, handler);