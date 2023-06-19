import Image from "next/image";
import Link from "next/link";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Login from "./Login";
import ProfileMenu from "./ProfileMenu";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

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
          {session?.user ? <ProfileMenu session={session} /> : <Login />}
        </div>
      </nav>
    </header>
  );
}
