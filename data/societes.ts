import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { off } from "process";

export const getSocietesByUser = async () => {

  try {
    const user = await currentUser();
    if(!user) {
      return null;
    }

    const societeUsers = await db.societeUser.findMany({
      where: { userId: user.id },
      include: { societe: true },
    });

    const societes = societeUsers.map(su => su.societe);

    return societes;
  } catch {
    return null;
  }
};

export const getSocieteById = async (id: string) => {
  try{
    const user = await currentUser();
    if(!user) return null;

    const isUserAllowed = await db.societeUser.findFirst({
      where: { 
        societeId: id, 
        AND: { userId: user.id } 
      },
    })

    if(!isUserAllowed) return null;

    const societe = await db.societe.findFirst({
      where: {id: id}
    })

    if(!societe) return null;
    
    return societe;

  } catch {
    return null;
  }
}
