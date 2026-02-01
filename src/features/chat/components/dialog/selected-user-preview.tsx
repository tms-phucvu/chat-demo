import { Button } from "@/components/ui/button";
import { UserProfile } from "@/types/user.type";
import { Dispatch, SetStateAction } from "react";
import { X } from "lucide-react";
import UserPreview from "@/features/chat/components/ui/user-preview";

interface SelectedUserPreviewProps {
  selectedUsers: UserProfile[];
  setSelectedUsers: Dispatch<SetStateAction<UserProfile[]>>;
}

export default function SelectedUserPreview({
  selectedUsers,
  setSelectedUsers,
}: SelectedUserPreviewProps) {
  return (
    <>
      {selectedUsers.length > 0 && (
        <div className="flex flex-wrap gap-2 p-2 w-full">
          {selectedUsers.map((user) => (
            <div
              key={user.uid}
              className="flex items-center gap-2 rounded-md border px-2 py-1 bg-muted w-full justify-between"
            >
              <UserPreview user={user} />

              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5"
                onClick={() =>
                  setSelectedUsers((prev) =>
                    prev.filter((u) => u.uid !== user.uid),
                  )
                }
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
