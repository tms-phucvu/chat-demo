import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";

export default function RoomCreateButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="border-2 rounded-full flex justify-center items-center aspect-square self-center cursor-pointer p-2 hover:bg-gray-200">
          <Plus size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>New chat</DropdownMenuItem>
          <DropdownMenuItem>Create group</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Add contact</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
