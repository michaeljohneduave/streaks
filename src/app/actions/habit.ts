"use server";

import { CreateHabitLogParams, createHabitLog } from "@/lib/data";

export async function markHabit(params: CreateHabitLogParams): Promise<void> {
  await createHabitLog(params);
}
