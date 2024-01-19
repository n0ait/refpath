"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas/auth";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/token";
import { getUserByMail } from "@/data/users";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
  ) => {
    const validateFields = LoginSchema.safeParse(values);

    if(!validateFields.success){
        return { error: "Mail ou mot de passe invalides" }
    }

    const { email, password } = validateFields.data;

    const existingUser = await getUserByMail(email);

    if(!existingUser || !existingUser.email || !existingUser.password){
      return { error: "Indentifiants invalides !" }
    }

    if(!existingUser.emailVerified){
      const verificationToken = await generateVerificationToken(existingUser.email);

      await sendVerificationEmail(
        verificationToken.email, 
        verificationToken.token
      );

      return { success: "Un mail de vérification vous a été envoyé !" }
    }

    try{
      let redirect = DEFAULT_LOGIN_REDIRECT;

      await signIn("credentials", {
        email,
        password,
        redirectTo: callbackUrl || redirect 
      })
    } catch (error) {
      if(error instanceof AuthError){
        switch (error.type){
          case "CredentialsSignin":
            return { error: "Email et/ou mot de passe invalide." }
            
          default:
            return { error: "Une erreur est survenue" }
        }
      }

      throw error;
    }
}