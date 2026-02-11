import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useChatDialogStore } from "@/features/chat/stores/dialog.store";
import { UserSelector } from "@/features/chat/components/dialog/user-selector";
import { useState } from "react";
import { UserInfo } from "@/types/user.type";
import SelectedUserPreview from "@/features/chat/components/dialog/selected-user-preview";
import { useAuth } from "@/hooks/use-auth";
import {
  createGroupChat,
  ensureCreatePrivateChat,
} from "@/features/chat/services/room.service";
import { useChatStore } from "@/features/chat/stores/chat.store";
import { DIALOG_MODE_CONFIG } from "@/features/chat/constants/chat.constants";
import { useTranslations } from "next-intl";

export function SearchUserDialog() {
  const { profile } = useAuth();
  const { isSearchUserOpen, closeSearchUser, searchUserMode } =
    useChatDialogStore();
  const config =
    DIALOG_MODE_CONFIG[searchUserMode as keyof typeof DIALOG_MODE_CONFIG] ||
    DIALOG_MODE_CONFIG.NEW_CHAT;
  const t = useTranslations(config.i18nKey);

  const { setActiveRoomId } = useChatStore();
  const [selectedUsers, setSelectedUsers] = useState<UserInfo[]>([]);

  const handleCloseDialog = () => {
    setSelectedUsers([]);
    closeSearchUser();
  };

  const handleSubmit = async () => {
    if (!profile || selectedUsers.length === 0) return;

    let roomId = "";
    const selectedUserIds = selectedUsers.map((u) => u.uid);
    switch (searchUserMode) {
      case "NEW_CHAT":
        roomId = await ensureCreatePrivateChat(profile.uid, selectedUserIds[0]);
        break;
      case "CREATE_GROUP":
        roomId = await createGroupChat(profile.uid, selectedUserIds);
        break;
      // case "ADD_MEMBERS":
      //   roomId = await addMembersToExistingGroup(activeRoomId, uids);
      //   break;
    }
    if (roomId) setActiveRoomId(roomId);
    handleCloseDialog();
  };

  const isMaxReached = selectedUsers.length >= config.maxUsers;

  return (
    <Dialog
      open={isSearchUserOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleCloseDialog();
        }
      }}
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("desc")}</DialogDescription>
        </DialogHeader>
        <SelectedUserPreview
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
        {!isMaxReached && (
          <UserSelector
            currentUid={profile?.uid ?? ""}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{t("cancelButton")}</Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            disabled={
              selectedUsers.length < config.minUsers ||
              selectedUsers.length > config.maxUsers
            }
          >
            {t("submitButton")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
