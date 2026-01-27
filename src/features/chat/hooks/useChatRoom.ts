"use client";

import { useMemo } from "react";
import type { ChatRoom } from "../types/chat.types";

type UseChatRoomResult = {
  room: ChatRoom | undefined;
};

export function useChatRoom(
  rooms: ChatRoom[],
  activeRoomId: string | null
): UseChatRoomResult {
  const room = useMemo(
    () => rooms.find((r) => r.id === activeRoomId),
    [rooms, activeRoomId]
  );

  return { room };
}


