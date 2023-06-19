import { getServerSession } from "next-auth";
import Greeting from "../components/Greeting";
import HabitBoard from "../components/HabitBoard";
import HabitList from "../components/HabitList";
import HabitWeekGrid from "../components/HabitWeekGrid";
import HabitProgressView from "../components/HabitProgressView";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <main className="container mx-auto py-10 px-28">
        <div className="flex space-x-10">
          <div className="flex flex-col basis-[70%] space-y-5">
            <Greeting name={session?.user?.name || ""} />
            <HabitBoard
              progress={<HabitProgressView />}
              grid={<HabitWeekGrid />}
            />
          </div>
          <div className="basis-[30%]">
            <HabitList />
          </div>
        </div>
      </main>
    </>
  );
}
