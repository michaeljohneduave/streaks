"use client";

import { useState } from "react";
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

dayjs.extend(isoWeek);

export default function HabitBoard({
  progress,
  grid,
}: {
  progress: React.ReactNode;
  grid: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<string>("week");
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [view, setView] = useState("progress");
  let dateLabel: string = "";

  switch (activeTab) {
    case "week":
      const weekStart = date.startOf("isoWeek").format("ddd, MMM DD");
      const weekEnd = date.endOf("isoWeek").format("ddd, MMM DD");

      dateLabel = `${weekStart} - ${weekEnd}`;
      break;
    case "month":
      dateLabel = date.format("MMMM YYYY");
      break;
    case "year":
      const yearStart = date.subtract(1, "year").format("MMM DD, YYYY");
      dateLabel = `${yearStart} - Today`;
      break;
    case "all":
      dateLabel = "All Time";
      break;
  }

  const handleMoveDate = (type: string) => {
    const mult = type === "prev" ? 1 : -1;
    switch (activeTab) {
      case "week":
        setDate((d) => d.subtract(mult, "week"));
        break;
      case "month":
        setDate((d) => d.subtract(mult, "month"));
        break;
      case "year":
        setDate((d) => d.subtract(mult, "year"));
        break;
    }
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
        <div className="my-12">{progress}</div>
      ) : activeTab === "week" ? (
        <div className="my-12">{grid}</div>
      ) : (
        <div className="my-12">No data to show</div>
      )}
    </div>
  );
}
