import { Progress } from "./ui/progress";

export default function HabitProgress() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-x-8">
        <div>
          <span>Habit 1</span>
        </div>
        <div className="flex-auto">
          <Progress value={33} className="w-full h-[20px]" />
        </div>
        <span className="flex-[0_0_4rem]">999 / 3</span>
      </div>
      <div className="flex items-center gap-x-8">
        <div>
          <span>Habit 2</span>
        </div>
        <div className="flex-auto">
          <Progress value={99} className="w-full h-[20px]" />
        </div>
        <span className="flex-[0_0_4rem]">99 / 100</span>
      </div>
      <div className="flex items-center gap-x-8">
        <div>
          <span>Habit 3</span>
        </div>
        <div className="flex-auto">
          <Progress value={20} className="w-full h-[20px]" />
        </div>
        <span className="flex-[0_0_4rem]">1 / 5</span>
      </div>
      <div className="flex items-center gap-x-8">
        <div>
          <span>Habit 4</span>
        </div>
        <div className="flex-auto">
          <Progress value={50} className="w-full h-[20px]" />
        </div>
        <span className="flex-[0_0_4rem]">5 / 10</span>
      </div>
    </div>
  );
}
