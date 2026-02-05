import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatRoomList } from "@/features/chat/components/sidebar/chat-room-list";
import RoomCreateButton from "@/features/chat/components/sidebar/room-create-button";
import EmptyRoomList from "@/features/chat/components/sidebar/empty-room-list";
import { useRoomList } from "@/features/chat/hooks/use-room-list";

export const ChatSidebar = () => {
  const { rooms, isLoading, error } = useRoomList();

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

      {rooms.length > 0 ? (
        <ScrollArea className="min-h-0 flex-1 pr-1">
          <div className="pb-2">
            <ChatRoomList rooms={rooms} loading={isLoading} />
          </div>
        </ScrollArea>
      ) : (
        <EmptyRoomList />
      )}
    </aside>
  );
};
