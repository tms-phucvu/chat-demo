import { ChatInput } from "@/features/chat/components/room-pane/chat-input";
import { ChatMessageList } from "@/features/chat/components/room-pane/chat-message-list";
import { NoRoomSelected } from "@/features/chat/components/room-pane/no-room-selected";
import { ChatRoomHeader } from "@/features/chat/components/room-pane/chat-room-header";
import { useRoom } from "@/features/chat/hooks/use-room";

interface ChatRoomPaneProps {
  activeRoomId: string | null;
  onBack?: () => void;
}

export const ChatRoomPane = ({ activeRoomId, onBack }: ChatRoomPaneProps) => {
  const { room, isLoading, error } = useRoom(activeRoomId);
  if (!room) return <NoRoomSelected />;

  return (
    <section className="bg-background/80 flex min-h-0 flex-col rounded-lg border">
      <ChatRoomHeader room={room} onBack={onBack} />

      <ChatMessageList activeRoomId={activeRoomId} />

      <ChatInput activeRoomId={activeRoomId} disabled={!room} />
    </section>
  );
};
