"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatInputProps = {
  disabled?: boolean;
  onSend: (text: string) => void;
};

export function ChatInput({ disabled, onSend }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!value.trim()) return;
    onSend(value);
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
        disabled={disabled}
      />
      <Button
        type="submit"
        size="sm"
        disabled={disabled || !value.trim()}
      >
        Send
      </Button>
    </form>
  );
}


