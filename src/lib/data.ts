import { prisma } from "@/lib/db";
import { Habit } from "@prisma/client";
import dayjs from "dayjs";
import { z } from "zod";

const getHabitsParams = z.object({
  dateStart: z.date(),
  dateEnd: z.date(),
  email: z.string().email(),
});

export type GetHabitsParams = z.infer<typeof getHabitsParams>;
export type HabitWithCount = Habit & {
  _count: {
    habitLog: number;
  };
};
export async function getHabits(
  params: GetHabitsParams
): Promise<HabitWithCount[]> {
  const now = dayjs();

  const habits = await prisma.habit.findMany({
    where: {
      user: {
        email: params.email,
      },
      OR: [
        {
          endDate: {
            gte: now.toDate(),
          },
        },
        {
          endDate: null,
        },
      ],
    },
    include: {
      user: true,
      _count: {
        select: {
          habitLog: {
            where: {
              createdAt: {
                gte: params.dateStart,
                lte: params.dateEnd,
              },
              marked: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return habits;
}
