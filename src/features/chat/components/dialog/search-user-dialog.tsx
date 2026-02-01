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
import { useEffect, useState } from "react";
import { UserProfile } from "@/types/user.type";
import SelectedUserPreview from "@/features/chat/components/dialog/selected-user-preview";
import { useAuth } from "@/hooks/use-auth";

export function SearchUserDialog() {
  const { isSearchUserOpen, closeSearchUser, searchUserMode } =
    useChatDialogStore();
  const [selectedUsers, setSelectedUsers] = useState<UserProfile[]>([]);
  const { profile } = useAuth();
  useEffect(() => {
    if (!isSearchUserOpen) {
      setSelectedUsers([]);
    }
  }, [isSearchUserOpen]);

  return (
    <Dialog open={isSearchUserOpen} onOpenChange={closeSearchUser}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{searchUserMode}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <SelectedUserPreview
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
        <UserSelector
          currentUid={profile?.uid ?? ""}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
