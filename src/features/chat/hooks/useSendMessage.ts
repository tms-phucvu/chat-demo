"use client";

import { useCallback } from "react";
import { CHAT_CURRENT_USER_ID } from "../constants/chat.constants";
import type { ChatMessage } from "../types/chat.types";

type UseSendMessageArgs = {
  roomId: string | null;
  setMessages: (updater: (prev: ChatMessage[]) => ChatMessage[]) => void;
};

type UseSendMessageResult = {
  sendMessage: (text: string) => void;
};

export function useSendMessage({
  roomId,
  setMessages,
}: UseSendMessageArgs): UseSendMessageResult {
  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!roomId || !trimmed) return;

      const now = new Date().toISOString();
      const newMessage: ChatMessage = {
        id: `local-${now}`,
        kind: "user",
        roomId,
        senderId: CHAT_CURRENT_USER_ID,
        text: trimmed,
        createdAt: now,
      };

      setMessages((prev) => [...prev, newMessage]);
    },
    [roomId, setMessages]
  );

  return { sendMessage };
}


