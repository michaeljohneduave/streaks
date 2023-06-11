import HabitBoard from "./components/HabitBoard";
import Greeting from "./components/Greeting";
import HabitList from "./components/HabitList";

export default function Home() {
  return (
    <>
      <main className="container mx-auto py-10 px-28">
        <div className="flex space-x-10">
          <div className="flex flex-col basis-[70%] space-y-5">
            <Greeting />
            <HabitBoard />
          </div>
          <div className="basis-[30%]">
            <HabitList />
          </div>
        </div>
      </main>
    </>
  );
}
