import { getServerSession } from "next-auth";
import ClearQuotes from "./components/ClearQuotes";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  return (
    <>
      <main className="container mt-10">
        <div className="flex flex-col space-y-10 text-center">
          <div className="text-5xl">Yet Another Habit Tracker</div>
          <ClearQuotes />
        </div>
      </main>
    </>
  );
}
