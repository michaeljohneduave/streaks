import Image from "next/image";
import LoginContainer from "./LoginContainer";

export default function Header() {
  return (
    <header className="bg-blue-500 text-white shadow py-2">
      <nav className="container mx-auto flex items-center">
        <div className="mr-5">
          <div className="text-2xl font-bold">
            <Image
              src={"/logo.svg"}
              alt="Streaks Logo"
              width={50}
              height={50}
            />
          </div>
        </div>
        <div className="text-xl font-bold">Streaks</div>
        <div className="text-xl ml-auto">
          <LoginContainer />
        </div>
      </nav>
    </header>
  );
}
