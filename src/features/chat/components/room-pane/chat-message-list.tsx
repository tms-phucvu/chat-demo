"use client";

import { useChatScroll } from "@/features/chat/hooks/use-chat-scroll";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessages } from "@/features/chat/hooks/use-messages";
import EmptyMessageList from "@/features/chat/components/room-pane/empty-message-list";
import SkeletonMessageList from "@/features/chat/components/room-pane/skeleton-message-list";
import TypingIndicator from "@/features/chat/components//ui/typing-indicator";
import { ChatMessageItem } from "@/features/chat/components/room-pane/chat-message-item";
import { Timestamp } from "firebase/firestore";
import { MESSAGE_TIME_GAP_LIMIT } from "@/features/chat/constants/chat.constants";
import {
  formatDateSeparator,
  isSameDay,
} from "@/features/chat/utils/date.utils";
import { useTypingIndicator } from "@/features/chat/hooks/use-typing-indicator";

type ChatMessageListProps = {
  activeRoomId: string | null;
};

export function ChatMessageList({ activeRoomId }: ChatMessageListProps) {
  const { messages, isLoading, error } = useMessages(activeRoomId);

  const typingIds = useTypingIndicator(activeRoomId);
  const isTyping = typingIds.length > 0;
  
  const { endRef } = useChatScroll([messages.length, isTyping]);

  return (
    <ScrollArea className="min-h-0 flex-1">
      <div className="space-y-4 px-4 py-4">
        {isLoading && <SkeletonMessageList />}

        {!isLoading && messages.length === 0 && <EmptyMessageList />}

        {!isLoading &&
          messages.map((message, index) => {
            const prev = messages[index - 1];

            // Convert date
            const currDate = (message.createdAt as Timestamp)?.toDate();
            const prevDate = (prev?.createdAt as Timestamp)?.toDate();

            // Logic flags
            const isFirstOfDate = !prevDate || !isSameDay(currDate, prevDate);
            const isSameSender = prev?.senderId === message.senderId;
            const isWithinTimeGap =
              prevDate &&
              currDate &&
              Math.abs(currDate.getTime() - prevDate.getTime()) <
                MESSAGE_TIME_GAP_LIMIT;

            return (
              <div key={message.id}>
                {isFirstOfDate && (
                  <div className="flex justify-center my-6">
                    <span className="bg-muted px-3 py-1 rounded-full text-[11px] font-medium text-muted-foreground tracking-wider">
                      {formatDateSeparator(message.createdAt)}{" "}
                    </span>
                  </div>
                )}
                <ChatMessageItem
                  message={message}
                  isInsideGroup={
                    isSameSender && isWithinTimeGap && !isFirstOfDate
                  }
                />
              </div>
            );
          })}

        {isTyping && <TypingIndicator />}

        <div ref={endRef} />
      </div>
    </ScrollArea>
  );
}
