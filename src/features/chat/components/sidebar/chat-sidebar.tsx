import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatRoomList } from "@/features/chat/components/sidebar/chat-room-list";
import { ChatRoom } from "@/features/chat/types/chat.types";
import RoomCreateButton from "./room-create-button";

interface ChatSidebarProps {
  rooms: ChatRoom[];
  activeRoomId: string | null;
  loading: boolean;
  onSelectRoom: (roomId: string) => void;
}

export const ChatSidebar = ({
  rooms,
  activeRoomId,
  loading,
  onSelectRoom,
}: ChatSidebarProps) => {
  return (
    <aside className="bg-background/80 min-h-0 flex-col rounded-lg border p-3 md:flex">
      <div className="flex justify-between">
        <div className="mb-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Chats
          </p>
          <p className="text-sm text-muted-foreground">
            {rooms.length} conversations
          </p>
        </div>    
        <RoomCreateButton />    
      </div>

      <ScrollArea className="min-h-0 flex-1 pr-1">
        <div className="pb-2">
          <ChatRoomList
            rooms={rooms}
            activeRoomId={activeRoomId}
            loading={loading}
            onSelectRoom={onSelectRoom}
          />
        </div>
      </ScrollArea>
    </aside>
  );
};
