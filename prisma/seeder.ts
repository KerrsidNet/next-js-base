import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tony = await prisma.user.upsert({
    where: { email: "tony@example.com" },
    update: {},
    create: {
      email: "tony@example.com",
      name: "Tony Reichert",
      summary: "CEO",
    },
  });

  const zoey = await prisma.user.upsert({
    where: { email: "zoey@example.com" },
    update: {},
    create: {
      email: "zoey@example.com",
      name: "Zoey Lang",
      summary: "Technical Lead",
    },
  });

  const additionalUser1 = await prisma.user.upsert({
    where: { email: "user1@example.com" },
    update: {},
    create: {
      email: "user1@example.com",
      name: "User One",
      summary: "Developer",
    },
  });

  const additionalUser2 = await prisma.user.upsert({
    where: { email: "user2@example.com" },
    update: {},
    create: {
      email: "user2@example.com",
      name: "User Two",
      summary: "Designer",
    },
  });

  const additionalUser3 = await prisma.user.upsert({
    where: { email: "user3@example.com" },
    update: {},
    create: {
      email: "user3@example.com",
      name: "User Three",
      summary: "Designer",
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
