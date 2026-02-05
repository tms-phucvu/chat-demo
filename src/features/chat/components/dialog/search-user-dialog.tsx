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
import { ensureCreatePrivateChat } from "@/features/chat/services/room.service";

interface SearchUserDialogProps {
  onSelectRoom: (roomId: string) => void;
}

export function SearchUserDialog({ onSelectRoom }: SearchUserDialogProps) {
  const { isSearchUserOpen, closeSearchUser, searchUserMode } =
    useChatDialogStore();
  const { profile } = useAuth();
  const [selectedUsers, setSelectedUsers] = useState<UserInfo[]>([]);

  const handleCloseDialog = () => {
    setSelectedUsers([]);
    closeSearchUser();
  };
  const handleStartChat = async () => {
    if (!profile || !selectedUsers[0]) {
      return null;
    }
    const roomId = await ensureCreatePrivateChat(
      profile.uid,
      selectedUsers[0].uid,
    );
    onSelectRoom(roomId);
    handleCloseDialog();
  };

  const isNewChat = searchUserMode === "NEW_CHAT";
  const hideUserSelector = isNewChat && selectedUsers.length > 0;

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
          <DialogTitle>
            {isNewChat ? "New Chat" : "Create New Group"}
          </DialogTitle>
          <DialogDescription>
            {isNewChat
              ? "Search for a user and click the Start Chat button to begin a private conversation."
              : "Search for people and click the Create Group button to start chatting together."}
          </DialogDescription>
        </DialogHeader>
        <SelectedUserPreview
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
        {!hideUserSelector && (
          <UserSelector
            currentUid={profile?.uid ?? ""}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          {isNewChat ? (
            <Button
              onClick={handleStartChat}
              disabled={selectedUsers.length === 0}
            >
              Start Chat
            </Button>
          ) : (
            <Button disabled={selectedUsers.length < 2}>Create Group</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
