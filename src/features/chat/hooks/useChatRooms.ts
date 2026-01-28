"use client";

import { useEffect, useState } from "react";
import { CHAT_LOADING_MS } from "../constants/chat.constants";
import { chatMock } from "../services/chat.mock";
import type { ChatRoom } from "../types/chat.types";

type UseChatRoomsResult = {
  rooms: ChatRoom[];
  loading: boolean;
  activeRoomId: string | null;
  setActiveRoomId: (roomId: string | null) => void;
};

export function useChatRooms(options?: {
  initialRoomId?: string;
  autoSelectFirst?: boolean;
}): UseChatRoomsResult {
  const initialRoomId = options?.initialRoomId;
  const autoSelectFirst = options?.autoSelectFirst ?? true;
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(
    initialRoomId ?? null,
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const data = chatMock.getRooms();
      setRooms(data);
      setLoading(false);
      if (autoSelectFirst && !activeRoomId && data.length > 0) {
        setActiveRoomId(data[0].id);
      }
    }, CHAT_LOADING_MS);

    return () => clearTimeout(timeout);
  }, [activeRoomId, autoSelectFirst]);

  return {
    rooms,
    loading,
    activeRoomId,
    setActiveRoomId,
  };
}
