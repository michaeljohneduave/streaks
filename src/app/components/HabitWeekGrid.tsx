import { Habit } from "@prisma/client";
import { Toggle } from "./ui/toggle";

export default function HabitWeekGrid({ habits }: { habits: Habit[] }) {
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
                {habit.days.map((day, idx) => {
                  if (day) {
                    return (
                      <Toggle key={idx} className="h-8 w-8 bg-green-500" />
                    );
                  }

                  return <Toggle key={idx} className="h-8 w-8" />;
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
