import { z } from "zod";

export const QuestionSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Vous devez au moins selectionner une réponse.",
  }),
})