import { useState, useCallback } from "react";
import { sendMessage } from "@/features/chat/services/messages.service";
import { SendMessageInput } from "@/features/chat/types/message.types";

type UseSendMessageResult = {
  send: (input: SendMessageInput) => Promise<void>;
  isSending: boolean;
  error: Error | null;
};

export const useSendMessage = (): UseSendMessageResult => {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const send = useCallback(async (input: SendMessageInput) => {
    const { roomId, unreadParticipants, ...payload } = input;

    try {
      setIsSending(true);
      setError(null);

      await sendMessage({ roomId, payload, unreadParticipants });
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Send message failed"));
    } finally {
      setIsSending(false);
    }
  }, []);

  return {
    send,
    isSending,
    error,
  };
};
