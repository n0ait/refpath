"use server";

import { ResetSchema } from "@/schemas/auth";
import { getUserByMail } from "@/data/users";
import * as z from "zod";

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if(!validatedFields.success){
    return { error : "Format d'email invalide"}
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByMail(email);

  //TODO : generer le token et envoyer l'email

  return { success: "Un lien pour réinitialiser votre mot de passe a bien été envoyé !"}
}
