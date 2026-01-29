import { ChatMessage, ChatRoom } from "@/features/chat/types/chat.types";
import { ChatInput } from "@/features/chat/components/input/chat-input";
import { ChatMessageList } from "@/features/chat/components/room/chat-message-list";
import { ChatRoomEmpty } from "@/features/chat/components/room/chat-room-empty";
import { ChatRoomHeader } from "@/features/chat/components/room/chat-room-header";

interface ChatRoomPaneProps {
  room: ChatRoom | null;
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
  if (!room) return <ChatRoomEmpty />;

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
