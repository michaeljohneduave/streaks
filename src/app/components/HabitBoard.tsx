"use client";

import { useEffect, useState } from "react";
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
import HabitProgressView from "./HabitProgressView";
import HabitWeekGrid from "./HabitWeekGrid";
import { HabitWithCount } from "../../lib/data";

dayjs.extend(isoWeek);

export default function HabitBoard({
  initialHabits,
  getHabits,
}: {
  initialHabits: HabitWithCount[];
  getHabits: (dateStart: string, dateEnd: string) => Promise<HabitWithCount[]>;
}) {
  const [activeTab, setActiveTab] = useState<string>("week");
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [view, setView] = useState("progress");
  const [habits, setHabits] = useState(initialHabits);
  let dateLabel: string = "";
  let dateStart: Dayjs = date.startOf("isoWeek");
  let dateEnd: Dayjs = date.endOf("isoWeek");
  // let habits = initialHabits;

  switch (activeTab) {
    case "week":
      dateStart = date.startOf("isoWeek");
      dateEnd = date.endOf("isoWeek");

      dateLabel = `${dateStart.format("ddd, MMM DD")} - ${dateEnd.format(
        "ddd, MMM DD"
      )}`;
      break;
    case "month":
      dateLabel = date.format("MMMM YYYY");
      break;
    case "year":
      dateStart = date.subtract(1, "year");
      dateEnd = dayjs();
      dateLabel = `${dateStart.format("ddd, MMM DD")} - Today`;
      break;
    case "all":
      dateLabel = "All Time";
      break;
  }

  useEffect(() => {
    getHabits(dateStart.toISOString(), dateEnd.toISOString()).then((data) => {
      console.log(data);
      setHabits(data);
    });
  }, [activeTab, date]);

  const handleMoveDate = (type: string) => {
    const mult = type === "prev" ? 1 : -1;

    setDate((d) => d.subtract(mult, activeTab as dayjs.ManipulateType));
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
          <Tabs
            defaultValue="progress"
            onValueChange={(val: string) => setView(val)}
          >
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
        <div className="my-12">{<HabitWeekGrid habits={habits} />}</div>
      ) : (
        <div className="my-12">No data to show</div>
      )}
    </div>
  );
}
