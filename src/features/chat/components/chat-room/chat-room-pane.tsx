import { ChatMessage, ChatRoom, ChatRoomListItem } from "@/features/chat/types/room.types";
import { ChatInput } from "@/features/chat/components/ui/chat-input";
import { ChatMessageList } from "@/features/chat/components/chat-room/chat-message-list";
import { NoRoomSelected } from "@/features/chat/components/chat-room/no-room-selected";
import { ChatRoomHeader } from "@/features/chat/components/chat-room/chat-room-header";

interface ChatRoomPaneProps {
  room: ChatRoomListItem | null;
  messages: ChatMessage[];
  loading: boolean;
  isTyping: boolean;
  onSend: (content: string) => void;
  onBack?: () => void;
}

export const ChatRoomPane = ({
  room,
  messages,
  loading,
  isTyping,
  onSend,
  onBack,
}: ChatRoomPaneProps) => {
  if (!room) return <NoRoomSelected />;

  return (
    <section className="bg-background/80 flex min-h-0 flex-col rounded-lg border">
      <ChatRoomHeader room={room} isTyping={isTyping} onBack={onBack} />

      <ChatMessageList
        messages={messages}
        loading={loading}
        isTyping={isTyping}
      />

      <ChatInput disabled={!room} onSend={onSend} />
    </section>
  );
};
