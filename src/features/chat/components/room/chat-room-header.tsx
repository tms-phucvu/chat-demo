import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { ChatRoom } from "@/features/chat/types/chat.types";
import { ChatUserAvatar } from "../avatar/chat-user-avatar";

interface ChatRoomHeaderProps {
  room: ChatRoom;
  isTyping: boolean;
  onBack?: () => void;
}

export const ChatRoomHeader = ({
  room,
  isTyping,
  onBack,
}: ChatRoomHeaderProps) => {
  return (
    <header className="border-border flex items-center gap-2 border-b px-4 py-3">
      {onBack && (
        <Button variant="ghost" size="icon" className="-ml-2" onClick={onBack}>
          <ChevronLeftIcon className="size-4" />
          <span className="sr-only">Back to chats</span>
        </Button>
      )}
      <div className="flex gap-4">
        <ChatUserAvatar name={room.title} status={"online"} />
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold">{room.title}</h2>
          <p className="text-xs text-muted-foreground">
            {isTyping ? "Typing…" : "Active now"}
          </p>
        </div>
      </div>
    </header>
  );
};
