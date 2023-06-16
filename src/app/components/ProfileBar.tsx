"use client";

import Login from "./Login";
import ProfileMenu from "./ProfileMenu";
import { useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";

export default function ProfileBar() {
  const { status } = useSession();

  if (status === "loading") {
    return <Skeleton className="w-10 h-10 rounded-full" />;
  } else if (status === "authenticated") {
    return <ProfileMenu />;
  } else {
    return <Login />;
  }
}
