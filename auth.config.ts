import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import Github from "next-auth/providers/github";
import { LoginSchema } from "@/schemas/auth";
import { getUserByMail } from "./data/users";
import bycrypt from "bcryptjs";

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET || ""
    }),
    Credentials({
      async authorize(credentials){
        const validatedFields = LoginSchema.safeParse(credentials);

        if(validatedFields.success){
          const { email, password } = validatedFields.data;

          const user = await getUserByMail(email);
          if(!user || !user.password ) return null;
          
          const passwordMatch = await bycrypt.compare(
            password, user.password
          )

          if (passwordMatch) return user;
        }

        return null;
      }
    })
  ],
} satisfies NextAuthConfig;