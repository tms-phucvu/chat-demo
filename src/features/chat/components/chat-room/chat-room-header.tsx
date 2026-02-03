import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { ChatRoom } from "@/features/chat/types/room.types";
import { useAuth } from "@/hooks/use-auth";
import { UserAvatar } from "@/features/chat/components/ui/user-avatar";
import { GroupAvatar } from "@/features/chat/components/ui/group-avatar";
import {
  getGroupDisplayName,
  getOtherParticipants,
} from "@/features/chat/utils/room.utils";
import { useInterestedUsersStore } from "@/stores/interested-users.store";
import { formatLastActive } from "@/features/chat/utils/date.utils";

interface ChatRoomHeaderProps {
  room: ChatRoom;
  onBack?: () => void;
}

export const ChatRoomHeader = ({ room, onBack }: ChatRoomHeaderProps) => {
  const { user } = useAuth();
  const uid = user?.uid ?? null;
  const presences = useInterestedUsersStore((s) => s.presences);

  const otherParticipants = getOtherParticipants(room.participantsInfo, uid);
  const otherParticipant = otherParticipants[0];
  const partnerId =
    room.type === "private"
      ? room.participants.find((pId) => pId !== uid)
      : null;
  const partnerPresence = partnerId ? presences[partnerId] : null;
  const status = partnerPresence ? partnerPresence.status : "offline";
  const updatedAt = partnerPresence ? partnerPresence.updatedAt : null;

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
            name={otherParticipant.name ?? "Unknown"}
            avatarUrl={otherParticipant.avatar ?? undefined}
            status={status}
          />
        ) : (
          <GroupAvatar
            participants={otherParticipants}
            count={room.participantsCount - 2}
          />
        )}
        <div className="min-w-0 flex flex-col justify-center">
          {room.type === "private" ? (
            <>
              <h2 className="truncate text-sm font-semibold">
                {otherParticipant.name ?? "Unknown"}
              </h2>
              <p className="text-xs text-muted-foreground">
                {status === "online"
                  ? "Active now"
                  : updatedAt
                    ? formatLastActive(updatedAt)
                    : "Offline"}
              </p>
            </>
          ) : (
            <h2 className="truncate text-md font-semibold">
              {getGroupDisplayName(otherParticipants)}
            </h2>
          )}
        </div>
      </div>
    </header>
  );
};
