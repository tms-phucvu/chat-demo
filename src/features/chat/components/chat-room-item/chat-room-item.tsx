"use client";

import { cn } from "@/lib/utils";
import type { ChatRoomListItem } from "@/features/chat/types/room.types";
import { formatTime } from "@/features/chat/utils/date.utils";
import { getUnreadCount } from "@/features/chat/utils/room.utils";

type ChatRoomItemProps = {
  room: ChatRoomListItem;
  isActive: boolean;
  uid: string | null;
  onSelectRoom: (roomId: string) => void;
  children: React.ReactNode;
  avatar: React.ReactNode;
  lastMessagePreview: string;
};

export function ChatRoomItem({
  room,
  isActive,
  uid,
  onSelectRoom,
  children,
  avatar,
  lastMessagePreview,
}: ChatRoomItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelectRoom(room.id)}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-accent text-accent-foreground",
      )}
    >
      {avatar}

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          {children}
          {room.lastMessage.createdAt && (
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">
              {formatTime(room.lastMessage.createdAt)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          {room.lastMessage.text && (
            <p
              className={cn(
                "mt-0.5 line-clamp-1 text-xs text-muted-foreground",
                getUnreadCount(room, uid) > 0 && "font-bold text-black",
              )}
            >
              {lastMessagePreview}
            </p>
          )}

          {getUnreadCount(room, uid) > 0 && (
            <span className="bg-primary/90 text-primary-foreground inline-flex min-w-6 items-center justify-center rounded-full px-1 text-[10px] font-semibold">
              {getUnreadCount(room, uid)}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
