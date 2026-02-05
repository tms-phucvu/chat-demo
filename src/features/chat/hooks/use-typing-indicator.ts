import { useEffect, useState } from "react";
import { subscribeToTyping } from "@/features/chat/services/typing.service";
import { useAuth } from "@/hooks/use-auth";

export function useTypingIndicator(roomId: string | null) {
  const { user } = useAuth();
  const currentUid = user?.uid;
  const [typingIds, setTypingIds] = useState<string[]>([]);

  useEffect(() => {
    if (!roomId) return;

    const unsubscribe = subscribeToTyping(roomId, (ids) => {
      const filteredIds = ids.filter((id) => id !== currentUid);
      setTypingIds(filteredIds);
    });

    return () => {
      unsubscribe();
      setTypingIds([]);
    };
  }, [roomId, currentUid]);
  return roomId ? typingIds : [];
}
