"use client";

import { cn } from "@/lib/utils";
import type { ChatRoomListItem } from "@/features/chat/types/room.types";
import { useAuth } from "@/hooks/use-auth";
import {
  getGroupDisplayName,
  getOtherParticipants,
  getUnreadCount,
} from "@/features/chat/utils/room.utils";
import { formatTime } from "@/features/chat/utils/date.utils";
import { UserAvatar } from "@/features/chat/components/ui/user-avatar";
import { GroupAvatar } from "@/features/chat/components/ui/group-avatar";

type ChatRoomListProps = {
  rooms: ChatRoomListItem[];
  activeRoomId: string | null;
  loading: boolean;
  onSelectRoom: (roomId: string) => void;
};

export function ChatRoomList({
  rooms,
  activeRoomId,
  loading,
  onSelectRoom,
}: ChatRoomListProps) {
  const { user } = useAuth();
  const uid = user?.uid ?? null;

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-lg bg-muted/60 px-3 py-2 animate-pulse"
          >
            <div className="h-8 w-8 rounded-full bg-muted-foreground/20" />
            <div className="flex-1 space-y-1">
              <div className="h-3 w-24 rounded bg-muted-foreground/20" />
              <div className="h-3 w-32 rounded bg-muted-foreground/10" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {rooms.map((room) => {
        const isActive = room.id === activeRoomId;

        return (
          <button
            key={room.id}
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

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                {room.type === "private" ? (
                  <p className="truncate text-sm font-medium">
                    {getOtherParticipants(room.participantsInfo, uid)[0].name ??
                      "Unknown"}
                  </p>
                ) : (
                  <p className="truncate text-sm font-medium">
                    {getGroupDisplayName(
                      getOtherParticipants(room.participantsInfo, uid),
                    )}
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
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
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
      })}
    </div>
  );
}
