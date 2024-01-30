import { z } from "zod";
import { TrainingUser } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { StartTraining } from "./schema";

export type InputType = z.infer<typeof StartTraining>;
export type ReturnType = ActionState<InputType, TrainingUser>;