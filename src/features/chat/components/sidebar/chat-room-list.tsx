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
import { useInterestedUsersStore } from "@/stores/interested-users.store";
import { useEffect } from "react";
import ChatRoomListSkeleton from "./chat-room-list-skeleton";

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

  const addIds = useInterestedUsersStore((s) => s.addIds);
  const presences = useInterestedUsersStore((s) => s.presences);

  useEffect(() => {
    if (rooms.length > 0 && uid) {
      const partnerIds = rooms
        .filter((room) => room.type === "private")
        .map((room) => {
          return room.participants.find((pId) => pId !== uid);
        })
        .filter(Boolean) as string[];

      if (partnerIds.length > 0) {
        addIds(partnerIds);
      }
    }
  }, [rooms, uid, addIds]);

  if (loading) {
    return <ChatRoomListSkeleton />;
  }

  return (
    <div className="space-y-1">
      {rooms.map((room) => {
        const isActive = room.id === activeRoomId;
        const otherParticipants = getOtherParticipants(
          room.participantsInfo,
          uid,
        );
        const otherParticipant = otherParticipants[0];
        const partnerId =
          room.type === "private"
            ? room.participants.find((pId) => pId !== uid)
            : null;
        const status =
          partnerId && presences[partnerId]
            ? presences[partnerId].status
            : "offline";
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
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                {room.type === "private" ? (
                  <p className="truncate text-sm font-medium">
                    {otherParticipant.name ?? "Unknown"}
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
