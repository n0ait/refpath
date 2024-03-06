import { z } from "zod";

export const QuestionSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Vous devez au moins selectionner une réponse.",
  }),
})

export const CheckAnswerSchema = z.object({
  userInput: z.array(z.string()),
  trainingQuestionId: z.string(),
  questionId: z.string(),
});

export const EndTrainingchema = z.object({
  trainingId: z.string(),
});