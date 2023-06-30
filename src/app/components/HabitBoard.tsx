"use client";

import { useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import {
  ArrowUp,
  BarChartHorizontal,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import AddHabit from "./AddHabit";
import HabitProgressView from "@/app/components/habitboard/HabitProgressView";
import HabitWeekGrid from "@/app/components/habitboard/HabitWeekGrid";
import { HabitsWithLogs } from "@/lib/data";
import HabitMonthGrid from "./habitboard/HabitMonthGrid";
import { date, set } from "zod";

dayjs.extend(isoWeek);

export default function HabitBoard({
  initialHabits,
  getHabits,
}: {
  initialHabits: HabitsWithLogs;
  getHabits: (dateStart: string, dateEnd: string) => Promise<HabitsWithLogs>;
}) {
  const [activeTab, setActiveTab] = useState("week");
  // Use utc to unify date format?
  const date = useRef<string>(dayjs.utc().toISOString());
  const [view, setView] = useState("grid");
  const [habits, setHabits] = useState<HabitsWithLogs>(initialHabits);
  const [offset, setOffset] = useState(0);
  const [dateStart, setDateStart] = useState<Dayjs>(
    dayjs(date.current).startOf("isoWeek")
  );
  const [dateEnd, setDateEnd] = useState<Dayjs>(
    dayjs(date.current).endOf("isoWeek")
  );
  let dateLabel = "";

  useEffect(() => {
    let ignore = false;
    let dateStart: Dayjs = dayjs(date.current)
      .startOf("isoWeek")
      .subtract(offset, "week");
    let dateEnd: Dayjs = dayjs(date.current)
      .endOf("isoWeek")
      .subtract(offset, "week");

    switch (activeTab) {
      case "week":
        dateStart = dayjs(date.current)
          .startOf("isoWeek")
          .subtract(offset, "week");
        dateEnd = dayjs(date.current).endOf("isoWeek").subtract(offset, "week");
        break;
      case "month":
        dateStart = dayjs(date.current)
          .startOf("month")
          .subtract(offset, "month");
        dateEnd = dayjs(date.current).endOf("month").subtract(offset, "month");
        break;
      case "year":
        dateStart = dayjs(date.current)
          .startOf("year")
          .subtract(offset, "year");
        dateEnd = dayjs(date.current);
        break;
      case "all":
        dateStart = dayjs(0);
        dateEnd = dayjs(date.current);
        break;
    }

    setDateStart(dateStart);
    setDateEnd(dateEnd);

    getHabits(dateStart.toISOString(), dateEnd.toISOString()).then((data) => {
      if (!ignore) {
        setHabits(data);
      }
    });
    return () => {
      ignore = true;
    };
  }, [offset, activeTab]);

  switch (activeTab) {
    case "week":
      dateLabel = `${dateStart.format("ddd, MMM DD")} - ${dateEnd.format(
        "ddd, MMM DD"
      )}`;
      break;
    case "month":
      dateLabel = dateStart.format("MMMM YYYY");
      break;
    case "year":
      dateLabel = `${dateStart.format("ddd, MMM DD")} - Today`;
      break;
    case "all":
      dateLabel = "All Time";
      break;
  }

  const handleMoveDate = (type: string) => {
    const mult = type === "prev" ? 1 : -1;

    setOffset((prev) => prev + mult);
  };

  return (
    <div className="space-y-5">
      <div className="flex space-x-5">
        <div className="w-2/3">
          <Tabs
            defaultValue="week"
            onValueChange={(val: string) => setActiveTab(val)}
          >
            <TabsList className="flex rounded-full w-full h-full">
              <TabsTrigger
                className="basis-1/4 rounded-full m-1 text-lg"
                value="week"
              >
                Week
              </TabsTrigger>
              <TabsTrigger
                className="basis-1/4 rounded-full m-1 text-lg"
                value="month"
              >
                Month
              </TabsTrigger>
              <TabsTrigger
                className="basis-1/4 rounded-full m-1 text-lg"
                value="year"
              >
                Year
              </TabsTrigger>
              <TabsTrigger
                className="basis-1/4 rounded-full m-1 text-lg"
                value="all"
              >
                All Time
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex w-1/3">
          <AddHabit />
        </div>
      </div>
      <div className="flex">
        <div className="flex space-x-5">
          <div className="flex">
            <Button
              className="rounded-l-full border-r-0"
              variant="outline"
              onClick={() => handleMoveDate("prev")}
            >
              <ChevronLeft />
            </Button>
            <Button
              className="rounded-r-full border-l-0"
              variant="outline"
              onClick={() => handleMoveDate("next")}
            >
              <ChevronRight />
            </Button>
          </div>
          <div className="self-center">
            <span className="text-3xl">{dateLabel}</span>
          </div>
        </div>
        <div className="ml-auto">
          <Tabs value={view} onValueChange={(val: string) => setView(val)}>
            <TabsList className="flex rounded-full">
              <TabsTrigger
                className="basis-1/4 rounded-full m-1"
                value="progress"
              >
                <BarChartHorizontal size="20px" />
              </TabsTrigger>
              <TabsTrigger className="basis-1/4 rounded-full m-1" value="grid">
                <LayoutGrid size="20px" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div>
        <Progress value={33} className="w-full h-[10px]" />
      </div>
      <div className="flex">
        {activeTab !== "all" ? (
          <div className="flex">
            <ArrowUp size="20px" className="text-green-500" />
            <span className="text-green-500">Up 13% from last {activeTab}</span>
          </div>
        ) : null}
        <div className="ml-auto">50% achieved</div>
      </div>
      {view === "progress" ? (
        <div className="my-12">
          <HabitProgressView
            habits={habits}
            dateStart={dateStart.toDate()}
            dateEnd={dateEnd.toDate()}
          />
        </div>
      ) : activeTab === "week" ? (
        <div className="my-12">
          <HabitWeekGrid
            habits={habits}
            dateStart={dateStart.toDate()}
            dateEnd={dateEnd.toDate()}
          />
        </div>
      ) : (
        <div className="my-12">
          <HabitMonthGrid
            month={dayjs(dateStart).month()}
            year={dayjs(dateStart).year()}
          />
        </div>
      )}
    </div>
  );
}
