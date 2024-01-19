import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import { db } from "@/lib/db";
import { getUserById } from "@/data/users";
import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { Session } from "next-auth/types";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  events: {
    async linkAccount({ user }){
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }){

      // Si l'utilisateur se log via Oauth
      if(account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      // Si l'utilisateur se connecte mais n'a pas verifier son e-mail
      if(!existingUser?.emailVerified) return false;

      //TODO: Ajouter 2FA

      return true;
    }, 
    async session({ session, token }){
      if(token.sub && session.user){ //sub = id user
        session.user.id = token.sub;
      }

      if(token.role && session.user){
        session.user.role = token.role as UserRole;
      }

      return session;
    },
    async jwt({ token }){
      if(!token.sub) return token; //sub = id user

      const existingUser = await getUserById(token.sub);

      if(!existingUser) return token;
      token.role = existingUser.role;

      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig
})