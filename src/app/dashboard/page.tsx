import Greeting from "../components/Greeting";
import HabitBoard from "../components/HabitBoard";
import HabitList from "../components/HabitList";
import WeekGrid from "../components/WeekGrid";
import WeekProgress from "../components/WeekProgress";

export default async function Dashboard() {
  return (
    <>
      <main className="container mx-auto py-10 px-28">
        <div className="flex space-x-10">
          <div className="flex flex-col basis-[70%] space-y-5">
            <Greeting />
            <HabitBoard progress={<WeekProgress />} grid={<WeekGrid />} />
          </div>
          <div className="basis-[30%]">
            <HabitList />
          </div>
        </div>
      </main>
    </>
  );
}
