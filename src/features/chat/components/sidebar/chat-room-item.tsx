"use client";

import { cn } from "@/lib/utils";
import type { ChatRoomListItem } from "@/features/chat/types/room.types";
import {
  getGroupDisplayName,
  getOtherParticipantIds,
  getUnreadCount,
  toParticipantPreview,
  toParticipantPreviews,
} from "@/features/chat/utils/room.utils";
import { formatTime } from "@/features/chat/utils/date.utils";
import { UserAvatar } from "@/features/chat/components/ui/user-avatar";
import { GroupAvatar } from "@/features/chat/components/ui/group-avatar";
import { UserPresence } from "@/types/user.type";
import { useParticipants } from "@/features/chat/hooks/use-participants";
import { useUserInfo } from "@/features/chat/hooks/use-user-info";

type ChatRoomItemProps = {
  room: ChatRoomListItem;
  isActive: boolean;
  uid: string | null;
  presences: Record<string, UserPresence>;
  onSelectRoom: (roomId: string) => void;
};

export default function ChatRoomItem({
  room,
  isActive,
  uid,
  presences,
  onSelectRoom,
}: ChatRoomItemProps) {
  const otherParticipantIds = getOtherParticipantIds(room.participants, uid);
  const partnerId = otherParticipantIds[0];

  const { participants } = useParticipants(otherParticipantIds);
  const otherParticipants = toParticipantPreviews(participants);
  const { data } = useUserInfo(partnerId);
  const partner = toParticipantPreview(data);
  const status = presences[partnerId] ? presences[partnerId].status : "offline";

  return (
    <button
      type="button"
      onClick={() => onSelectRoom(room.id)}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-accent text-accent-foreground",
      )}
    >
      {room.type === "private" ? (
        <UserAvatar
          name={partner.name ?? "Unknown"}
          avatarUrl={partner.avatar ?? undefined}
          status={status}
        />
      ) : (
        <GroupAvatar
          participants={otherParticipants}
          count={room.participantsCount - 2}
        />
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          {room.type === "private" ? (
            <p className="truncate text-sm font-medium">
              {partner.name ?? "Unknown"}
            </p>
          ) : (
            <p className="truncate text-sm font-medium">
              {getGroupDisplayName(otherParticipants)}
            </p>
          )}

          <div className="flex items-center gap-2">
            {room.lastMessage.createdAt && (
              <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                {formatTime(room.lastMessage.createdAt)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          {room.lastMessage.text && (
            <p
              className={cn(
                "mt-0.5 line-clamp-1 text-xs text-muted-foreground",
                getUnreadCount(room, uid) > 0 && "font-bold text-black",
              )}
            >
              {room.lastMessage.senderId === uid && "You: "}
              {room.lastMessage.text}
            </p>
          )}

          {getUnreadCount(room, uid) > 0 && (
            <span className="bg-primary/90 text-primary-foreground inline-flex min-w-6 items-center justify-center rounded-full px-1 text-[10px] font-semibold">
              {getUnreadCount(room, uid)}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
