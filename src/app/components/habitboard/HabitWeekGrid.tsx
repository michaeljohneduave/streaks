import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { HabitsWithLogs } from "@/lib/data";
import { cn } from "@/lib/utils";
import ToggleItem from "./ToggleItem";

const DAYS = [1, 2, 3, 4, 5, 6, 7];

dayjs.extend(utc);

export default function HabitWeekGrid({
  habits,
  dateStart,
  dateEnd,
}: {
  habits: HabitsWithLogs;
  dateStart: Date;
  dateEnd: Date;
}) {
  return (
    <div className="space-y-8">
      <div className="flex gap-x-8">
        <div className="flex-[0_0_4rem]"></div>
        <div className="flex-auto">
          <div className="flex w-full justify-between">
            <span className="w-8 text-center">Mon</span>
            <span className="w-8 text-center">Tue</span>
            <span className="w-8 text-center">Wed</span>
            <span className="w-8 text-center">Thu</span>
            <span className="w-8 text-center">Fri</span>
            <span className="w-8 text-center">Sat</span>
            <span className="w-8 text-center">Sun</span>
          </div>
        </div>
        <div className="flex-[0_0_4rem]"></div>
      </div>
      <div className="flex flex-col space-y-8">
        {habits.map((habit, idx) => (
          <div key={idx} className="flex gap-x-8 items-center">
            <div className="flex-[0_0_4rem]">
              <span>{habit.name}</span>
            </div>
            <div className="flex-auto">
              <div className="flex w-full justify-between">
                {DAYS.map((day, idx2) => {
                  const date = dayjs
                    .utc(dateStart)
                    .add(idx2, "day") // offset by idx2 days
                    .toDate();
                  if (habit.days.includes(day)) {
                    const log = habit.habitLog.find(
                      (log) =>
                        log.date.toLocaleDateString() ===
                        date.toLocaleDateString()
                    );
                    return (
                      <ToggleItem
                        key={`${log?.id ?? date.toISOString()}`}
                        habitId={habit.id}
                        date={date}
                        habitLogId={log?.id}
                        marked={log?.marked}
                      />
                    );
                  }

                  return <div key={idx2} className="h-8 w-8" />;
                })}
              </div>
            </div>
            <div className="flex-[0_0_4rem]"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
