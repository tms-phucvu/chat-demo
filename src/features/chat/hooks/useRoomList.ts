import { useEffect, useState } from "react";
import { ChatRoomListItem } from "@/features/chat/types/room.types";
import { subscribeRoomsByUser } from "@/features/chat/services/rooms.service";
import { useAuth } from "@/hooks/use-auth";

type UseRoomListResult = {
  rooms: ChatRoomListItem[];
  isLoading: boolean;
  error: Error | null;
};

export const useRoomList = (): UseRoomListResult => {
  const { user } = useAuth();
  const uid = user?.uid;

  const [rooms, setRooms] = useState<ChatRoomListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!uid) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRooms([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    let unsubscribe: (() => void) | undefined;

    try {
      unsubscribe = subscribeRoomsByUser(uid, (updatedRooms) => {
        setRooms(updatedRooms);
        setIsLoading(false);
        setError(null);
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to subscribe"));
      setIsLoading(false);
    }

    return () => {
      unsubscribe?.();
    };
  }, [uid]);

  return { rooms, isLoading, error };
};
