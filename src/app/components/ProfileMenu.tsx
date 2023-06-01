import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";

type ProfileMenuProps = {
  name: string;
  photoURL: string;
  logout: () => void;
};

export default function ProfileMenu({
  name,
  photoURL,
  logout,
}: ProfileMenuProps) {
  return (
    <div className="flex items">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={photoURL} alt={name} />
            <AvatarFallback className="bg-orange-300">
              {name.slice(0, 2).toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="m-1 p-1 w-48 bg-white border-2 border-gray-500 text-black rounded-sm">
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex items-center cursor-pointer hover:bg-slate-100">
            <User className="mr-5 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuLabel>
          <DropdownMenuLabel className="flex items-center cursor-pointer hover:bg-slate-100">
            <Settings className="mr-5 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel
            className="flex items-center cursor-pointer hover:bg-slate-100"
            onClick={logout}
          >
            <LogOut className="mr-5 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
