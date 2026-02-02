import { useEffect, useState } from "react";
import { Message } from "@/features/chat/types/message.types";
import { subscribeMessagesByRoomId } from "@/features/chat/services/messages.service";

type UseMessagesResult = {
  messages: Message[];
  isLoading: boolean;
  error: Error | null;
};

export const useMessages = (roomId: string | null): UseMessagesResult => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!roomId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMessages([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    let unsubscribe: (() => void) | undefined;

    try {
      unsubscribe = subscribeMessagesByRoomId(roomId, (updatedMessages) => {
        setMessages(updatedMessages);
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

  return { messages, isLoading, error };
};
