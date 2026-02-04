"use client";

import { useChatScroll } from "@/features/chat/hooks/use-chat-scroll";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/use-auth";
import { useMessages } from "@/features/chat/hooks/use-messages";
import { formatTime } from "@/features/chat/utils/date.utils";

type ChatMessageListProps = {
  activeRoomId: string | null;
  isTyping: boolean;
};

export function ChatMessageList({
  activeRoomId,
  isTyping,
}: ChatMessageListProps) {
  const { messages, isLoading, error } = useMessages(activeRoomId);
  const { endRef } = useChatScroll([messages.length, isTyping]);
  const { user } = useAuth();
  const uid = user?.uid ?? null;

  return (
    <ScrollArea className="min-h-0 flex-1">
      <div className="space-y-4 px-4 py-4">
        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex justify-start">
                <div className="max-w-xs space-y-2 rounded-2xl bg-muted/70 px-3 py-2 text-sm">
                  <div className="h-3 w-24 rounded bg-muted-foreground/20" />
                  <div className="h-3 w-32 rounded bg-muted-foreground/10" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading &&
          messages.map((message) => {
            const isMe = message.senderId === uid;
            return (
              <div
                key={message.id}
                className={isMe ? "flex justify-end" : "flex justify-start"}
              >
                <div className="max-w-[75%] space-y-1">
                  <div
                    className={[
                      "rounded-2xl px-3 py-2 text-sm shadow-sm",
                      isMe
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm",
                    ].join(" ")}
                  >
                    <p className="whitespace-pre-line wrap-break-word">
                      {message.text}
                    </p>
                  </div>
                  <p
                    className={`text-[10px] text-muted-foreground ${isMe ? "text-right" : "text-left"}`}
                  >
                    {formatTime(message.createdAt)}
                  </p>
                </div>
              </div>
            );
          })}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted text-muted-foreground inline-flex items-center gap-1 rounded-2xl rounded-bl-sm px-3 py-2 text-xs">
              <span className="inline-flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/70 [animation-delay:-0.2s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/70" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/70 [animation-delay:0.2s]" />
              </span>
              <span>Typing…</span>
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>
    </ScrollArea>
  );
}
