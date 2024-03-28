import { PrismaClient } from "@prisma/client";

// Docs about instantiating `PrismaClient` with Next.js:
// https://pris.ly/d/help/next-js-best-practices

/**
 * Initializes a PrismaClient instance to connect to the database.
 * 
 * In production, creates a new PrismaClient.
 * 
 * In development, creates a singleton PrismaClient instance and reuses it.
 * This avoids exceeding database connection limits in development.
 */
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!(globalThis as any).prisma) {
    (globalThis as any).prisma = new PrismaClient();
  }
  prisma = (globalThis as any).prisma;
}

export default prisma;