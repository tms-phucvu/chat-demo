"use client";

import { useChatMessages } from "../hooks/useChatMessages";
import { useChatRoom } from "../hooks/useChatRoom";
import { useChatRooms } from "../hooks/useChatRooms";
import { useSendMessage } from "../hooks/useSendMessage";
import { useTypingIndicator } from "../hooks/useTypingIndicator";
import { ChatRoomList } from "./sidebar/chat-room-list";
import { ChatMessageList } from "./room/chat-message-list";
import { ChatInput } from "./input/chat-input";
import { useIsMobile, useIsTablet } from "@/hooks/use-device";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeftIcon } from "lucide-react";
import { useMemo } from "react";

export function MainChat() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const {
    rooms,
    loading: roomsLoading,
    activeRoomId,
    setActiveRoomId,
  } = useChatRooms({ autoSelectFirst: !isTablet });
  const { room } = useChatRoom(rooms, activeRoomId);
  const {
    messages,
    loading: messagesLoading,
    setMessages,
  } = useChatMessages(activeRoomId);
  const { sendMessage } = useSendMessage({ roomId: activeRoomId, setMessages });
  const { isTyping } = useTypingIndicator(activeRoomId);

  const roomsMeta = useMemo(() => {
    return {
      countLabel: `${rooms.length} conversations`,
    };
  }, [rooms.length]);

  const handleSelectRoom = (roomId: string) => setActiveRoomId(roomId);

  return (
    <div className="bg-muted/30 border-border grid h-full min-h-0 gap-4 rounded-xl border p-3 lg:grid-cols-[360px_minmax(0,1fr)] md:grid-cols-[300px_minmax(0,1fr)] grid-cols-1">
      {/* Mobile: show ONE pane at a time */}
      {isMobile ? (
        room ? (
          <section className="bg-background/80 flex min-h-0 flex-col rounded-lg border">
            <header className="border-border flex items-center gap-2 border-b px-4 py-3">
              <Button
                variant="ghost"
                size="icon"
                className="-ml-2"
                onClick={() => setActiveRoomId(null)}
              >
                <ChevronLeftIcon className="size-4" />
                <span className="sr-only">Back to chats</span>
              </Button>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold">{room.title}</h2>
                <p className="text-xs text-muted-foreground">
                  {isTyping ? "Typing…" : "Active now"}
                </p>
              </div>
            </header>

            <ChatMessageList
              messages={messages}
              loading={messagesLoading}
              isTyping={isTyping}
            />
            <ChatInput disabled={!room} onSend={sendMessage} />
          </section>
        ) : (
          <section className="bg-background/80 flex min-h-0 flex-col rounded-lg border p-3">
            <div className="mb-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Chats
              </p>
              <p className="text-sm text-muted-foreground">
                {roomsMeta.countLabel}
              </p>
            </div>
            <ScrollArea className="min-h-0 flex-1 pr-1">
              <div className="pb-2">
                <ChatRoomList
                  rooms={rooms}
                  activeRoomId={activeRoomId}
                  loading={roomsLoading}
                  onSelectRoom={handleSelectRoom}
                />
              </div>
            </ScrollArea>
          </section>
        )
      ) : (
        <>
          {/* Desktop sidebar */}
          <aside className="bg-background/80 hidden min-h-0 flex-col rounded-lg border p-3 md:flex">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Chats
                </p>
                <p className="text-sm text-muted-foreground">
                  {roomsMeta.countLabel}
                </p>
              </div>
            </div>
            <ScrollArea className="min-h-0 flex-1 pr-1">
              <div className="pb-2">
                <ChatRoomList
                  rooms={rooms}
                  activeRoomId={activeRoomId}
                  loading={roomsLoading}
                  onSelectRoom={setActiveRoomId}
                />
              </div>
            </ScrollArea>
          </aside>

          <section className="bg-background/80 flex min-h-0 flex-col rounded-lg border">
            {room ? (
              <>
                <header className="border-border flex items-center justify-between gap-3 border-b px-4 py-3">
                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold">
                      {room.title}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {isTyping ? "Typing…" : "Active now"}
                    </p>
                  </div>
                </header>
                <ChatMessageList
                  messages={messages}
                  loading={messagesLoading}
                  isTyping={isTyping}
                />
                <ChatInput disabled={!room} onSend={sendMessage} />
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 p-4 text-center text-sm text-muted-foreground">
                <p className="font-medium">
                  Select a conversation to get started
                </p>
                <p className="max-w-xs text-xs">
                  Choose a chat from the list on the left to view messages and
                  start replying.
                </p>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
