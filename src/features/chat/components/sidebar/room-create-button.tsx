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
import { useTranslations } from "next-intl";

export default function RoomCreateButton() {
  const t = useTranslations("chat.sidebar.roomCreateButton");
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
            {t("newChat")}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => openSearchUser("CREATE_GROUP")}
          >
            {t("createGroup")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {/* <DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{t("addContact")}</DropdownMenuItem>
        </DropdownMenuGroup> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
