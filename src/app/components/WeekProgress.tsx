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

type person = {
  fullName: string;
};

const getData = async () => {
  const response = await fetch(
    "https://api-generator.retool.com/75meh1/streaks?_limit=5"
  );
  const data = (await response.json()).map((d: person) => ({
    name: d.fullName,
    current: 1,
    total: 100,
  })) as typeof SAMPLE_DATA;
  return data;
};

export default async function WeekProgress() {
  const data = await getData();
  return (
    <div className="space-y-8">
      {data.map((habit, idx) => (
        <div className="flex items-center gap-x-8" key={idx}>
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
