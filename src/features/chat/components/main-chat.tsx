"use client";

import { useIsMobile, useIsTablet } from "@/hooks/use-device";
import { useChatRooms } from "@/features/chat/hooks/useChatRooms";
import { useChatRoom } from "@/features/chat/hooks/useChatRoom";
import { useChatMessages } from "@/features/chat/hooks/useChatMessages";
import { useSendMessage } from "@/features/chat/hooks/useSendMessage";
import { useTypingIndicator } from "@/features/chat/hooks/useTypingIndicator";
import { ChatRoomPane } from "@/features/chat/components/room/chat-room-pane";
import { ChatSidebar } from "@/features/chat/components/sidebar/chat-sidebar";

export default function MainChat() {
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

  const { sendMessage } = useSendMessage({
    roomId: activeRoomId,
    setMessages,
  });

  const { isTyping } = useTypingIndicator(activeRoomId);

  return (
    <div className="bg-muted/30 border-border grid h-full min-h-0 gap-4 rounded-xl border p-3 lg:grid-cols-[360px_minmax(0,1fr)] grid-cols-1">
      {isTablet ? (
        room ? (
          <ChatRoomPane
            room={room}
            messages={messages}
            loading={messagesLoading}
            isTyping={isTyping}
            onSend={sendMessage}
            onBack={() => setActiveRoomId(null)}
          />
        ) : (
          <ChatSidebar
            rooms={rooms}
            activeRoomId={activeRoomId}
            loading={roomsLoading}
            onSelectRoom={setActiveRoomId}
          />
        )
      ) : (
        <>
          <ChatSidebar
            rooms={rooms}
            activeRoomId={activeRoomId}
            loading={roomsLoading}
            onSelectRoom={setActiveRoomId}
          />

          <ChatRoomPane
            room={room ?? null}
            messages={messages}
            loading={messagesLoading}
            isTyping={isTyping}
            onSend={sendMessage}
          />
        </>
      )}
    </div>
  );
}
