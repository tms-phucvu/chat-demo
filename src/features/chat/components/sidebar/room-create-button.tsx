import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import { useChatDialogStore } from "@/features/chat/stores/dialog.store";

export default function RoomCreateButton() {
  const { openSearchUser } = useChatDialogStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="border-2 rounded-full flex justify-center items-center aspect-square self-start cursor-pointer p-2 hover:bg-gray-200">
          <Plus size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => openSearchUser("NEW_CHAT")}
          >
            New chat
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => openSearchUser("CREATE_GROUP")}
          >
            Create group
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Add contact</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
