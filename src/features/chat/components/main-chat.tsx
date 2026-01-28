"use client";

import { useChatMessages } from "../hooks/useChatMessages";
import { useChatRoom } from "../hooks/useChatRoom";
import { useChatRooms } from "../hooks/useChatRooms";
import { useSendMessage } from "../hooks/useSendMessage";
import { useTypingIndicator } from "../hooks/useTypingIndicator";
import { ChatRoomList } from "./sidebar/chat-room-list";
import { ChatMessageList } from "./room/chat-message-list";
import { ChatInput } from "./input/chat-input";

export function MainChat() {
  const { rooms, loading: roomsLoading, activeRoomId, setActiveRoomId } =
    useChatRooms();
  const { room } = useChatRoom(rooms, activeRoomId);
  const {
    messages,
    loading: messagesLoading,
    setMessages,
  } = useChatMessages(activeRoomId);
  const { sendMessage } = useSendMessage({ roomId: activeRoomId, setMessages });
  const { isTyping } = useTypingIndicator(activeRoomId);

  return (
    <div className="bg-muted/30 border-border grid h-full gap-4 rounded-xl border p-3 md:grid-cols-[360px_minmax(0,1fr)]">
      <aside className="bg-background/80 flex flex-col rounded-lg border p-3">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Chats
            </p>
            <p className="text-sm text-muted-foreground">
              {rooms.length} conversations
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto pr-1">
          <ChatRoomList
            rooms={rooms}
            activeRoomId={activeRoomId}
            loading={roomsLoading}
            onSelectRoom={setActiveRoomId}
          />
        </div>
      </aside>

      <section className="bg-background/80 flex min-h-0 flex-col rounded-lg border">
        {room ? (
          <>
            <header className="border-border flex items-center justify-between border-b px-4 py-3">
              <div>
                <h2 className="text-sm font-semibold">{room.title}</h2>
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
            <ChatInput
              disabled={!room}
              onSend={sendMessage}
            />
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
            <p className="font-medium">Select a conversation to get started</p>
            <p className="max-w-xs text-xs">
              Choose a chat from the list on the left to view messages and start
              replying.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}


