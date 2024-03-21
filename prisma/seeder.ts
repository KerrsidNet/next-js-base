import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();
const saltRounds = 10;

async function main() {
  const adminRole = await prisma.role.upsert({
    where: { name: "Admin" },
    update: {},
    create: {
      name: "Admin",
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: "User" },
    update: {},
    create: {
      name: "User",
    },
  });

  const tony = await prisma.user.upsert({
    where: { email: "lisa@example.com" },
    update: {
      email: "lisa@example.com",
      password: await hash("123456??", saltRounds),
      name: "Lisa Reichert",
      summary: "CEO",
      roleId: userRole.id,
    },
    create: {
      email: "lisa@example.com",
      password: await hash("123456??", saltRounds),
      name: "Lisa Reichert",
      summary: "CEO",
      roleId: userRole.id,
    },
  });

  const zoey = await prisma.user.upsert({
    where: { email: "zoey@example.com" },
    update: {
      email: "zoey@example.com",
      password: await hash("123456??", saltRounds),
      name: "Zoey Lang",
      summary: "Technical Lead",
      roleId: userRole.id,
    },
    create: {
      email: "zoey@example.com",
      password: await hash("123456??", saltRounds),
      name: "Zoey Lang",
      summary: "Technical Lead",
      roleId: userRole.id,
    },
  });

  const additionalUser1 = await prisma.user.upsert({
    where: { email: "muresan.sebastian12@yahoo.com" },
    update: {
      email: "muresan.sebastian12@yahoo.com",
      password: await hash("123456??", saltRounds),
      name: "User One",
      summary: "Developer",
      roleId: adminRole.id,
    },
    create: {
      email: "muresan.sebastian12@yahoo.com",
      password: await hash("123456??", saltRounds),
      name: "User One",
      summary: "Developer",
      roleId: adminRole.id,
    },
  });

  const additionalUser2 = await prisma.user.upsert({
    where: { email: "user2@example.com" },
    update: {
      email: "user2@example.com",
      password: await hash("123456??", saltRounds),
      name: "User Two",
      summary: "Designer",
      roleId: userRole.id,
    },
    create: {
      email: "user2@example.com",
      password: await hash("123456??", saltRounds),
      name: "User Two",
      summary: "Designer",
      roleId: userRole.id,
    },
  });

  const additionalUser3 = await prisma.user.upsert({
    where: { email: "user3@example.com" },
    update: {
      email: "user3@example.com",
      password: await hash("123456??", saltRounds),
      name: "User Three",
      summary: "Designer",
      roleId: userRole.id,
    },
    create: {
      email: "user3@example.com",
      password: await hash("123456??", saltRounds),
      name: "User Three",
      summary: "Designer",
      roleId: userRole.id,
    },
  });

  // Add more users as needed...

  console.log({
    tony,
    zoey,
    additionalUser1,
    additionalUser2,
    additionalUser3,
  });
}

main()
  .catch((error) => {
    console.error("Error seeding database:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
