import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  enterRoom,
  leaveRoom,
  subscribeToRoomPresence,
} from "@/features/chat/services/room-presence.service";
import { resetUnreadCount } from "@/features/chat/services/unread-count.service";

interface RoomPresenceProps {
  roomId: string | null;
}

export const useRoomPresence = ({ roomId }: RoomPresenceProps) => {
  const { user } = useAuth();
  const uid = user?.uid ?? null;

  const [usersInRoom, setUsersInRoom] = useState<string[]>([]);

  useEffect(() => {
    if (!uid || !roomId) {
      return;
    }

    enterRoom(uid, roomId);
    resetUnreadCount(uid, roomId);

    const unsubscribe = subscribeToRoomPresence(roomId, (participantIds) => {
      setUsersInRoom(participantIds);
    });

    return () => {
      leaveRoom(uid, roomId);
      unsubscribe();
    };
  }, [uid, roomId]);

  return { usersInRoom };
};
