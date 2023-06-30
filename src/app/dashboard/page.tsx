import { getServerSession } from "next-auth";
import Greeting from "../components/Greeting";
import HabitBoard from "../components/HabitBoard";
import HabitList from "../components/HabitList";
import { authOptions } from "../api/auth/[...nextauth]/route";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isoWeek from "dayjs/plugin/isoWeek";
import { getHabits } from "../../lib/data";

dayjs.extend(utc);
dayjs.extend(isoWeek);

async function getData(dateStart: string, dateEnd: string) {
  "use server";
  const session = await getServerSession(authOptions);
  const habits = await getHabits({
    email: session?.user?.email || "",
    dateStart: new Date(dateStart),
    dateEnd: new Date(dateEnd),
  });

  return habits;
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const habits = await getData(
    dayjs.utc().startOf("isoWeek").toISOString(),
    dayjs.utc().endOf("isoWeek").toISOString()
  );

  return (
    <>
      <main className="container mx-auto py-10 px-28">
        <div className="flex space-x-10">
          <div className="flex flex-col basis-[70%] space-y-5">
            <Greeting name={session?.user?.name || ""} />
            <HabitBoard initialHabits={habits} getHabits={getData} />
          </div>
          <div className="basis-[30%]">
            <HabitList />
          </div>
        </div>
      </main>
    </>
  );
}
