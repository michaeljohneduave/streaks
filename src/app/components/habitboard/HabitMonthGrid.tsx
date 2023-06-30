import { Calendar } from "lucide-react";
import CalendarDay from "./CalendarDay";
import DailyHabits from "./DailyHabits";

const daysInWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const daysInMonth = [
  31, // January
  28, // February
  31, // March
  30, // April
  31, // May
  30, // June
  31, // July
  31, // August
  30, // September
  31, // October
  30, // November
  31, // December
];

export default function HabitMonthGrid({
  year,
  month,
}: {
  year: number;
  month: number;
}) {
  let numDays = daysInMonth[month];
  if (month === 1 && year % 4 === 0) {
    numDays += 1;
  }
  const day =
    new Date(year, month, 1).getDay() > 0
      ? new Date(year, month, 1).getDay() - 1
      : 6;
  const tail = (day + numDays) % 7;
  console.log(day, numDays, tail);
  const cells = [
    ...Array(day).fill(" "),
    ...Array.from(Array(numDays).keys()).map((d) => d + 1),
    ...Array(tail && 7 - tail).fill(" "),
  ];
  return (
    <div className="space-y-2">
      <div className="flex p-2 bg-slate-300 rounded-xl">
        {daysInWeek.map((day) => (
          <div className="w-full text-center">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 border-solid border-2 border-slate-500">
        {cells.map((day) => (
          <div className="h-28 border-solid border-slate-200 border-l border-b">
            <div className="p-1">{day}</div>
            <DailyHabits />
          </div>
        ))}
      </div>
    </div>
  );
}
