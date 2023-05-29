import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-blue-500 text-white shadow py-4">
      <nav className="container mx-auto flex items-center">
        <div className="mr-5">
          <a href="#" className="text-2xl font-bold">
            <Image
              src={"/logo.svg"}
              alt="Streaks Logo"
              width={50}
              height={50}
            />
          </a>
        </div>
        <div className="text-xl font-bold">Streaks</div>
        <div className="text-xl ml-auto">
          <a className="">Login</a>
        </div>
      </nav>
    </header>
  );
}
