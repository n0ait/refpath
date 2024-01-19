import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import AzureAd from "next-auth/providers/azure-ad";
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
    AzureAd({
      tenantId: process.env.AZURE_TENANT_ID,
      clientId: process.env.AZURE_CLIENT_ID,
      clientSecret: process.env.AZURE_CLIENT_SECRET,
      authorization: { params: { scope: "openid profile User.Read email" } },
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