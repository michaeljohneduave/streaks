"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

export default function ProfileMenu({ session }: { session: Session }) {
  const name = session?.user?.name || "";

  return (
    <div className="flex items">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage
              src={session?.user?.image || ""}
              alt={name}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback className="bg-orange-300">
              {name.slice(0, 2).toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="m-1 p-1 w-48 bg-white border-2 border-gray-500 text-black rounded-sm">
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex items-center cursor-pointer hover:bg-slate-100">
            <Link className="flex item-center" href="/profile">
              <User className="mr-5 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuLabel>
          <DropdownMenuLabel className="hover:bg-slate-100">
            <Link className="flex item-center" href="/settings">
              <Settings className="mr-5 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel
            className="flex items-center cursor-pointer hover:bg-slate-100"
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
          >
            <LogOut className="mr-5 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
