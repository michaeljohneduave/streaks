import { Progress } from "./ui/progress";

const SAMPLE_DATA = [
  {
    name: "Habit 1",
    current: 9,
    total: 100,
  },
  {
    name: "Habit 2",
    current: 99,
    total: 100,
  },
  {
    name: "Habit 3",
    current: 20,
    total: 100,
  },
];

export default function WeekProgress() {
  return (
    <div className="space-y-8">
      {SAMPLE_DATA.map((habit) => (
        <div className="flex items-center gap-x-8">
          <div className="flex-[0_0_4rem]">
            <span>{habit.name}</span>
          </div>
          <div className="flex-auto">
            <Progress
              value={(habit.current / habit.total) * 100}
              className="w-full h-[20px]"
            />
          </div>
          <span className="flex-[0_0_4rem]">
            {habit.current} / {habit.total}
          </span>
        </div>
      ))}
    </div>
  );
}
