import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// This asssumes there is a user with the email "michaeljohneduave@gmail.com" in the database
async function main() {
  const user = await prisma.user.findFirst({
    where: {
      email: "michaeljohneduave@gmail.com",
    },
  });

  if (!user) {
    throw new Error("No user found");
  }

  const habits = await prisma.habit.createMany({
    data: [
      {
        name: "Exercise",
        userId: user.id,
        days: [1, 2, 3, 4, 5],
        startDate: new Date("2023-06-01"),
        type: "DO",
      },
      {
        name: "Code",
        userId: user.id,
        days: [1, 2, 3, 4, 5, 6],
        startDate: new Date("2023-06-10"),
        type: "DO",
      },
      {
        name: "Sugar",
        userId: user.id,
        days: [1, 2, 3, 4, 5, 6, 7],
        startDate: new Date("2023-05-01"),
        type: "DONT",
      },
    ],
  });
  console.log(habits);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
