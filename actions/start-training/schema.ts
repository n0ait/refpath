import { z } from "zod";

export const StartTraining = z.object({
  trainingId: z.string()
});