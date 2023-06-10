"use client";

import dayjs, { Dayjs } from "dayjs";
import { Skeleton } from "./skeleton";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";

export const Loader = () => {
  return (
    <div className="">
      <div className="space-y-2">
        <Skeleton className="w-1/2 h-5" />
        <Skeleton className="w-1/2 h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
      </div>
    </div>
  );
};

export default function HabitList() {
  const [date, setDate] = useState<Dayjs | undefined>();

  useEffect(() => {
    setDate(dayjs());
  }, []);

  const handleChangeDate = (type: string) => {
    if (type === "prev") {
      setDate(date?.subtract(1, "day"));
    } else {
      setDate(date?.add(1, "day"));
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center">
        <div className="flex-grow text-2xl">{date?.format("ddd, MMM DD")}</div>
        <div className="">
          <Button variant="ghost" className="hover:bg-transparent">
            Today
          </Button>
        </div>
        <div>
          <Button className="rounded-l-full border-r-0" variant="outline">
            <ChevronLeft onClick={() => handleChangeDate("prev")} />
          </Button>
          <Button className="rounded-r-full border-l-0" variant="outline">
            <ChevronRight onClick={() => handleChangeDate("next")} />
          </Button>
        </div>
      </div>
      <div className="border-2 border-blue-400 border-solid rounded-lg p-5">
        <div className="flex h-20 items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff00ad]"></div>
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
      </div>
    </div>
  );
}
