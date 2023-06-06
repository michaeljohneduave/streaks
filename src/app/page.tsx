import HabitBoard from "./components/HabitBoard";
import Greeting from "./components/Greeting";
import HabitList from "./components/HabitList";

export default function Home() {
  return (
    <>
      <main className="container mx-auto p-8">
        <div className="flex space-x-5">
          <div className="flex flex-col basis-3/4 space-y-5">
            <Greeting />
            <HabitBoard />
          </div>
          <div className="basis-1/4">
            <HabitList />
          </div>
        </div>
      </main>
    </>
  );
}
