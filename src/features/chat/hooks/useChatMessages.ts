"use client";

import { useEffect, useState } from "react";
import { CHAT_LOADING_MS } from "../constants/chat.constants";
import { chatMock } from "../services/chat.mock";
import type { ChatMessage } from "../types/chat.types";

type UseChatMessagesResult = {
  messages: ChatMessage[];
  loading: boolean;
  setMessages: (updater: (prev: ChatMessage[]) => ChatMessage[]) => void;
};

export function useChatMessages(
  roomId: string | null
): UseChatMessagesResult {
  const [messages, setMessagesState] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!roomId) {
      setMessagesState([]);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(() => {
      const data = chatMock.getMessagesByRoomId(roomId);
      setMessagesState(data);
      setLoading(false);
    }, CHAT_LOADING_MS);

    return () => clearTimeout(timeout);
  }, [roomId]);

  const setMessages = (updater: (prev: ChatMessage[]) => ChatMessage[]) => {
    setMessagesState((prev) => updater(prev));
  };

  return { messages, loading, setMessages };
}


