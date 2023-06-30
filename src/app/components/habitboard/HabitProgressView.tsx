import { HabitsWithLogs } from "@/lib/data";
import { Progress } from "../ui/progress";

export default function HabitProgressView({
  habits,
}: {
  habits: HabitsWithLogs;
  dateStart: Date;
  dateEnd: Date;
}) {
  return (
    <div className="space-y-8">
      <div className="h-6"></div>
      {habits.map((habit, idx) => (
        <div className="flex items-center gap-x-8" key={idx}>
          <div className="flex-[0_0_4rem]">
            <span>{habit.name}</span>
          </div>
          <div className="flex-auto">
            <Progress
              value={(habit.habitLog.length / habit.days.length) * 100}
              className="w-full h-[20px]"
            />
          </div>
          <span className="flex-[0_0_4rem]">
            {habit.habitLog.length} / {habit.days.length}
          </span>
        </div>
      ))}
    </div>
  );
}
