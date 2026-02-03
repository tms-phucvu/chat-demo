import { ChatInput } from "@/features/chat/components/chat-room/chat-input";
import { ChatMessageList } from "@/features/chat/components/chat-room/chat-message-list";
import { NoRoomSelected } from "@/features/chat/components/chat-room/no-room-selected";
import { ChatRoomHeader } from "@/features/chat/components/chat-room/chat-room-header";
import { useRoom } from "@/features/chat/hooks/useRoom";

interface ChatRoomPaneProps {
  activeRoomId: string | null;
  isTyping: boolean;
  onBack?: () => void;
}

export const ChatRoomPane = ({
  activeRoomId,
  isTyping,
  onBack,
}: ChatRoomPaneProps) => {
  const { room, isLoading, error } = useRoom(activeRoomId);
  if (!room) return <NoRoomSelected />;

  return (
    <section className="bg-background/80 flex min-h-0 flex-col rounded-lg border">
      <ChatRoomHeader room={room} onBack={onBack} />

      <ChatMessageList activeRoomId={activeRoomId} isTyping={isTyping} />

      <ChatInput activeRoomId={activeRoomId} disabled={!room} />
    </section>
  );
};
