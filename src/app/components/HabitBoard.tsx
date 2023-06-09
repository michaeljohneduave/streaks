"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import {
  ArrowUp,
  BarChartHorizontal,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Plus,
} from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import AddHabit from "./AddHabit";

dayjs.extend(isoWeek);

export default function HabitBoard() {
  const [activeTab, setActiveTab] = useState("week");
  const [dateLabel, setDateLabel] = useState("");
  const [progressLabel, setProgressLabel] = useState("");

  useEffect(() => {
    const now = dayjs();

    switch (activeTab) {
      case "week":
        const weekStart = now.startOf("isoWeek").format("ddd, MMM DD");
        const weekEnd = now.endOf("isoWeek").format("ddd, MMM DD");
        setDateLabel(`${weekStart} - ${weekEnd}`);
        break;
      case "month":
        setDateLabel(now.format("MMMM YYYY"));
        break;
      case "year":
        const yearStart = now.subtract(1, "year").format("MMM DD, YYYY");
        setDateLabel(`${yearStart} - Today`);
        break;
      case "all":
        setDateLabel("All Time");
        break;
    }
  }, [activeTab]);

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
          <div>
            <Button className="rounded-l-full border-r-0" variant="outline">
              <ChevronLeft />
            </Button>
            <Button className="rounded-r-full border-l-0" variant="outline">
              <ChevronRight />
            </Button>
          </div>
          <div className="self-center">
            <span className="text-3xl">{dateLabel}</span>
          </div>
        </div>
        <div className="ml-auto">
          <Tabs defaultValue="progress">
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
    </div>
  );
}
