import { Toggle } from "./ui/toggle";

const SAMPLE_DATA = [
  {
    name: "Habit 1",
    days: [true, true, true, false, false, true, false],
  },
  {
    name: "Habit 2",
    days: [true, true, false, false, true, false, false],
  },
  {
    name: "Habit 3",
    days: [true, true, true, true, true, true, true],
  },
];

export default function WeekGrid() {
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
        {SAMPLE_DATA.map((habit) => (
          <div className="flex gap-x-8 items-center">
            <div className="flex-[0_0_4rem]">
              <span>{habit.name}</span>
            </div>
            <div className="flex-auto">
              <div className="flex w-full justify-between">
                {habit.days.map((day) => {
                  if (day) {
                    return <Toggle className="h-8 w-8 bg-green-500" />;
                  }

                  return <Toggle className="h-8 w-8" />;
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
