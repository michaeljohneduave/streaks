import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { z } from "zod";

const getHabitsParams = z.object({
  dateStart: z.date(),
  dateEnd: z.date(),
  email: z.string().email(),
});

export type GetHabitsParams = z.infer<typeof getHabitsParams>;
export async function getHabits(params: GetHabitsParams) {
  const now = dayjs();
  console.log(params);
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
      user: {
        select: {
          email: true,
        },
      },
      habitLog: {
        where: {
          date: {
            gte: params.dateStart,
            lte: params.dateEnd,
          },
          marked: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return habits;
}
export type HabitsWithLogs = Prisma.PromiseReturnType<typeof getHabits>;

const createHabitLogParams = z.object({
  habitId: z.string(),
  habitLogId: z.string().optional(),
  date: z.date(),
  marked: z.boolean(),
});

export type CreateHabitLogParams = z.infer<typeof createHabitLogParams>;
export async function createHabitLog(params: CreateHabitLogParams) {
  const date = new Date(params.date);

  const log = await prisma.habitLog.upsert({
    where: {
      habitId_date: {
        habitId: params.habitId,
        date: params.date,
      },
    },
    update: {
      marked: params.marked,
    },
    create: {
      habitId: params.habitId,
      date,
      marked: params.marked,
    },
  });

  return log;
}
