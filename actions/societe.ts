"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const updateLastSociete = async (societeId: string) => {

  const user = await currentUser();
  if(!user) return null;

  const isUserSociete = await db.societeUser.findFirst({
    where: {userId: user.id}
  });

  if(!isUserSociete) return null;
  
  await db.user.update({
    where: {id: user.id},
    data: {
      lastSociete: societeId
    }
  })
}
