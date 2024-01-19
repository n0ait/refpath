import { PrismaClient } from "@prisma/client";

// Global pour éviter de génerer une connexion à chaque hotreload !
declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;