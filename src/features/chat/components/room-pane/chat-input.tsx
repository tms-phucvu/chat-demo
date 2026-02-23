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
import { ImagePlus, Mic, Send, Smile } from "lucide-react";

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
      <div className="relative flex-1">
        <Input
          value={value}
          onChange={handleChange}
          placeholder={t("placeholder")}
          disabled={disabled || isSending}
          className="p-5 pr-30"
        />

        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="rounded-full hover:bg-gray-300 aspect-square"
          >
            <Smile size={18} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="rounded-full hover:bg-gray-300"
          >
            <ImagePlus size={18} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="rounded-full hover:bg-gray-300"
          >
            <Mic size={18} />
          </Button>
        </div>
      </div>

      <Button
        type="submit"
        size="sm"
        disabled={disabled || isSending || !value.trim()}
        className="py-5 aspect-square"
      >
        <Send />
      </Button>
    </form>
  );
}
