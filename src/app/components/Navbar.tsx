import Image from "next/image";
import Link from "next/link";

import ProfileBar from "./ProfileBar";

export default function Navbar() {
  return (
    <header className="bg-blue-500 text-white">
      <nav className="container flex items-center h-20">
        <Link href="/">
          <div className="flex items-center">
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
          </div>
        </Link>
        <div className="ml-auto">
          <ProfileBar />
        </div>
      </nav>
    </header>
  );
}
