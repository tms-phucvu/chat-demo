import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import {
  ChatRoom,
  ParticipantPreview,
  ParticipantsInfo,
} from "@/features/chat/types/room.types";
import { useAuth } from "@/hooks/use-auth";
import { UserAvatar } from "@/features/chat/components/ui/user-avatar";
import { GroupAvatar } from "@/features/chat/components/ui/group-avatar";
import { getGroupDisplayName } from "@/features/chat/utils/room.utils";

interface ChatRoomHeaderProps {
  room: ChatRoom;
  isTyping: boolean;
  onBack?: () => void;
}

export const ChatRoomHeader = ({
  room,
  isTyping,
  onBack,
}: ChatRoomHeaderProps) => {
  const { user } = useAuth();
  const uid = user?.uid ?? null;
  const getOtherParticipants = (
    participantsInfo: ParticipantsInfo,
    myUid: string | null,
  ): ParticipantPreview[] => {
    if (!myUid) {
      return Object.values(participantsInfo);
    }
    return Object.entries(participantsInfo)
      .filter(([uid]) => uid !== myUid)
      .map(([, info]) => info);
  };

  return (
    <header className="border-border flex items-center gap-2 border-b px-4 py-3">
      {onBack && (
        <Button variant="ghost" size="icon" className="-ml-2" onClick={onBack}>
          <ChevronLeftIcon className="size-4" />
          <span className="sr-only">Back to chats</span>
        </Button>
      )}
      <div className="flex gap-4">
        {room.type === "private" ? (
          <UserAvatar
            name={
              getOtherParticipants(room.participantsInfo, uid)[0].name ??
              "Unknown"
            }
            avatarUrl={
              getOtherParticipants(room.participantsInfo, uid)[0].avatar ??
              undefined
            }
            status={"online"}
          />
        ) : (
          <GroupAvatar
            participants={getOtherParticipants(room.participantsInfo, uid)}
            count={room.participantsCount - 2}
          />
        )}
        <div className="min-w-0">
          {room.type === "private" ? (
            <h2 className="truncate text-sm font-semibold">
              {getOtherParticipants(room.participantsInfo, uid)[0].name ??
                "Unknown"}
            </h2>
          ) : (
            <h2 className="truncate text-sm font-semibold">
              {getGroupDisplayName(
                getOtherParticipants(room.participantsInfo, uid),
              )}
            </h2>
          )}
          <p className="text-xs text-muted-foreground">
            {isTyping ? "Typing…" : "Active now"}
          </p>
        </div>
      </div>
    </header>
  );
};
