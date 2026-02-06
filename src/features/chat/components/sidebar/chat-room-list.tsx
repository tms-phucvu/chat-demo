"use client";

import type { ChatRoomListItem } from "@/features/chat/types/room.types";
import { useAuth } from "@/hooks/use-auth";
import { useInterestedUsersStore } from "@/stores/interested-users.store";
import { useEffect } from "react";
import SkeletonRoomList from "@/features/chat/components/sidebar/skeleton-room-list";
import { GroupRoomItem } from "@/features/chat/components/chat-room-item/group-room-item";
import { PrivateRoomItem } from "@/features/chat/components/chat-room-item/private-room-item";
import ErrorRoomList from "@/features/chat/components/sidebar/error-room-list";

type ChatRoomListProps = {
  rooms: ChatRoomListItem[];
  loading: boolean;
  error: Error | null;
};

export function ChatRoomList({ rooms, loading, error }: ChatRoomListProps) {
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

  if (!loading && error)
    return (
      <ErrorRoomList error={error} onRetry={() => window.location.reload()} />
    );

  return (
    <div className="space-y-1">
      {rooms.map((room) => {
        if (room.type === "private") {
          return (
            <PrivateRoomItem
              key={room.id}
              room={room}
              uid={uid}
              presences={presences}
            />
          );
        }

        if (room.type === "group") {
          return <GroupRoomItem key={room.id} room={room} uid={uid} />;
        }

        return null;
      })}
    </div>
  );
}
