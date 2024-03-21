/**
 * Creates a PrismaClient instance and exports it as the default export. 
 * This allows importing and using PrismaClient in other files.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
