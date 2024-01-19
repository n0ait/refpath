"use server";

import { db } from "@/lib/db";
import { getUserByMail } from "@/data/users";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {

  const existingToken = await getVerificationTokenByToken(token);
  if(!existingToken) return { error: "Votre jeton de vérification est invalide" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if(hasExpired) return { error: "Votre jeton de vérification a expiré." };

  const existingUser = await getUserByMail(existingToken.email);
  if(!existingUser) return { error: "L'email associée au jeton de verification n'existe pas." };

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),

      // On met à jour l'email pour pouvoir réutiliser la logique de vérification d'email lors 
      // d'un changement d'email par l'utilisateur
      email: existingToken.email
    }
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id }
  });

  return { success: "Votre e-mail à été verifiée avec succès" };
}