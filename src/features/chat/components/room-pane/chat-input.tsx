"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSendMessage } from "@/features/chat/hooks/use-send-message";
import { useAuth } from "@/hooks/use-auth";
import {
  clearTyping,
  handleTyping,
} from "@/features/chat/services/typing.service";
import { ChatRoom } from "@/features/chat/types/room.types";
import { useTranslations } from "next-intl";

type ChatInputProps = {
  room: ChatRoom | null;
  activeRoomId: string | null;
  usersInRoom: string[];
  disabled?: boolean;
};

export function ChatInput({
  room,
  activeRoomId,
  usersInRoom,
  disabled,
}: ChatInputProps) {
  const t = useTranslations("chat.roomPane.chatInput");
  const { user } = useAuth();
  const uid = user?.uid ?? null;

  const [value, setValue] = useState("");
  const { send, isSending } = useSendMessage();

  const unreadParticipants = (room?.participants ?? []).filter(
    (participantId) =>
      participantId !== uid && !usersInRoom.includes(participantId),
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setValue(val);

    if (activeRoomId && uid && val.trim()) {
      handleTyping(activeRoomId, uid);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!value.trim() || !activeRoomId || !uid) return;

    await send({
      roomId: activeRoomId,
      text: value,
      senderId: uid,
      unreadParticipants: unreadParticipants,
    });
    setValue("");
    clearTyping(activeRoomId, uid);
  };

  useEffect(() => {
    return () => {
      if (activeRoomId && uid) {
        clearTyping(activeRoomId, uid);
      }
    };
  }, [activeRoomId, uid]);

  return (
    <form
      onSubmit={handleSubmit}
      className="border-border bg-background/80 flex items-center gap-2 border-t px-4 py-3"
    >
      <Input
        value={value}
        onChange={handleChange}
        placeholder={t("placeholder")}
        disabled={disabled || isSending}
      />
      <Button
        type="submit"
        size="sm"
        disabled={disabled || isSending || !value.trim()}
      >
        {t("sendButton")}
      </Button>
    </form>
  );
}
