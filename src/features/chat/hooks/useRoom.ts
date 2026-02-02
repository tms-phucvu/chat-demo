import { useEffect, useState } from "react";
import { ChatRoom } from "@/features/chat/types/room.types";
import { subscribeRoomById } from "@/features/chat/services/room.service";

type UseRoomResult = {
  room: ChatRoom | null;
  isLoading: boolean;
  error: Error | null;
};

export const useRoom = (roomId: string | null): UseRoomResult => {
  const [room, setRoom] = useState<ChatRoom | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!roomId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRoom(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    let unsubscribe: (() => void) | undefined;

    try {
      unsubscribe = subscribeRoomById(roomId, (updatedRoom) => {
        setRoom(updatedRoom);
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
  }, [roomId]);

  return { room, isLoading, error };
};
