import { HabitWithCount } from "../../lib/data";
import { Progress } from "./ui/progress";
import dayjs from "dayjs";

export default function HabitProgressView({
  habits,
}: {
  habits: HabitWithCount[];
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
              value={habit._count.habitLog}
              className="w-full h-[20px]"
            />
          </div>
          <span className="flex-[0_0_4rem]">
            {habit._count.habitLog} / {habit.days.length}
          </span>
        </div>
      ))}
    </div>
  );
}
