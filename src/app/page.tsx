import ClearQuotes from "./components/ClearQuotes";

export default async function Home() {
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
