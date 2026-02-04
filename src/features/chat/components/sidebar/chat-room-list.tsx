"use client";

import type { ChatRoomListItem } from "@/features/chat/types/room.types";
import { useAuth } from "@/hooks/use-auth";
import { useInterestedUsersStore } from "@/stores/interested-users.store";
import { useEffect } from "react";
import SkeletonRoomList from "@/features/chat/components/sidebar/skeleton-room-list";
import { GroupRoomItem } from "../chat-room-item/group-room-item";
import { PrivateRoomItem } from "../chat-room-item/private-room-item";

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
    return <SkeletonRoomList />;
  }

  return (
    <div className="space-y-1">
      {rooms.map((room) => {
        const isActive = activeRoomId === room.id;

        if (room.type === "private") {
          return (
            <PrivateRoomItem
              key={room.id}
              room={room}
              isActive={isActive}
              uid={uid}
              presences={presences}
              onSelectRoom={onSelectRoom}
            />
          );
        }

        if (room.type === "group") {
          return (
            <GroupRoomItem
              key={room.id}
              room={room}
              isActive={isActive}
              uid={uid}
              onSelectRoom={onSelectRoom}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
