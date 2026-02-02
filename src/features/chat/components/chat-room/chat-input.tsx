"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSendMessage } from "@/features/chat/hooks/useSendMessage";
import { useAuth } from "@/hooks/use-auth";

type ChatInputProps = {
  disabled?: boolean;
  activeRoomId: string | null;
};

export function ChatInput({ disabled, activeRoomId }: ChatInputProps) {
  const [value, setValue] = useState("");
  const { user } = useAuth();
  const uid = user?.uid ?? null;
  const { send, isSending } = useSendMessage();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!value.trim()) return;
    if (!activeRoomId || !uid) return;

    await send({
      roomId: activeRoomId,
      text: value,
      senderId: uid,
    });

    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-border bg-background/80 flex items-center gap-2 border-t px-4 py-3"
    >
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Type a message..."
        disabled={disabled || isSending}
      />
      <Button
        type="submit"
        size="sm"
        disabled={disabled || isSending || !value.trim()}
      >
        Send
      </Button>
    </form>
  );
}
