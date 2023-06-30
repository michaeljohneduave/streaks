import { useState } from "react";
import { cn } from "@/lib/utils";
import { markHabit } from "@/app/actions/habit";

export default function ToggleItem({
  habitId,
  date,
  habitLogId,
  marked,
}: {
  habitId: string;
  date: Date;
  habitLogId: string | undefined;
  marked: boolean | undefined;
}) {
  const [isMarked, setIsMarked] = useState(marked);

  const handleClick = ({
    habitLogId,
    habitId,
    date,
    marked,
  }: {
    habitLogId: string | undefined;
    habitId: string;
    date: Date;
    marked: boolean | undefined;
  }) => {
    setIsMarked(!marked);

    markHabit({
      habitLogId,
      habitId,
      date,
      marked: !marked,
    });
  };

  return (
    <div
      onClick={() =>
        handleClick({
          habitId: habitId,
          date,
          marked: isMarked,
          habitLogId,
        })
      }
      className={cn("h-8 w-8  cursor-pointer rounded-md", [
        isMarked
          ? "bg-green-500 hover:bg-gray-400"
          : "bg-gray-200 hover:bg-green-500",
      ])}
    />
  );
}
