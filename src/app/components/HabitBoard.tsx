import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export default function HabitBoard() {
  return (
    <div className="my-5">
      <div className="flex space-x-5">
        <div className="w-2/3">
          <Tabs>
            <TabsList className="flex rounded-full w-full h-full">
              <TabsTrigger
                className="basis-1/4 rounded-full m-1 text-lg"
                value="month"
              >
                Month
              </TabsTrigger>
              <TabsTrigger
                className="basis-1/4 rounded-full m-1 text-lg"
                value="week"
              >
                Week
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
        <div className="w-1/6">
          <Button className="w-full h-full rounded-full">Add Habit</Button>
        </div>
      </div>
      <div className="my-5">
        <div className="">
          <Button className="rounded-l-full border-r-0" variant="outline">
            <ChevronLeft />
          </Button>
          <Button className="rounded-r-full border-l-0" variant="outline">
            <ChevronRight />
          </Button>
        </div>
        <div></div>
      </div>
    </div>
  );
}
