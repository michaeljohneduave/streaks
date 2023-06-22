"use client";

import dayjs, { Dayjs } from "dayjs";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, MoreVertical, X } from "lucide-react";
import { useState } from "react";

const now = dayjs();

export default function HabitList() {
  const [date, setDate] = useState<Dayjs | undefined>(now);

  const handleChangeDate = (type: string) => {
    if (type === "prev") {
      setDate(date?.subtract(1, "day"));
    } else {
      setDate(date?.add(1, "day"));
    }
  };

  const handleResetDate = () => {
    setDate(dayjs() as Dayjs);
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center">
        <div className="flex-grow text-2xl">{date?.format("ddd, MMM DD")}</div>
        <Button
          variant="ghost"
          className="hover:bg-transparent hover:text-blue-500"
          onClick={handleResetDate}
        >
          Today
        </Button>
        <div className="flex lg:ml-auto">
          <Button className="rounded-l-full border-r-0" variant="outline">
            <ChevronLeft onClick={() => handleChangeDate("prev")} />
          </Button>
          <Button className="rounded-r-full border-l-0" variant="outline">
            <ChevronRight onClick={() => handleChangeDate("next")} />
          </Button>
        </div>
      </div>
      <div className="border-2 border-blue-400 border-solid rounded-lg p-5 space-y-10">
        <div className="flex h-20 items-center space-x-2">
          <div className="w-1 min-h-full rounded-lg bg-[#ff00ad]"></div>
          <div className="flex w-full flex-col space-y-2">
            <div className="flex items-center">
              <span>Habit 1</span>
              <div className="ml-auto">
                <MoreVertical />
              </div>
            </div>
            <Button className="flex-grow" variant="outline">
              Mark Complete
            </Button>
          </div>
        </div>
        <div className="flex h-20 items-center space-x-2">
          <div className="w-1 min-h-full rounded-lg bg-[#ff00ad]"></div>
          <div className="flex w-full flex-col space-y-2">
            <div className="flex items-center">
              <span>Habit 2</span>
              <div className="ml-auto">
                <MoreVertical />
              </div>
            </div>
            <Button className="flex-grow" variant="outline">
              I did it!
            </Button>
          </div>
        </div>
        <div className="flex h-20 items-center space-x-2">
          <div className="w-1 min-h-full rounded-lg bg-[#ff00ad]"></div>
          <div className="flex w-full flex-col space-y-2">
            <div className="flex items-center">
              <span>Habit 1</span>
              <div className="ml-auto">
                <MoreVertical />
              </div>
            </div>
            <Button className="flex-grow" variant="outline">
              I avoided it
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
