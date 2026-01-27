"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { ChatRoom } from "../../types/chat.types";

type ChatRoomListProps = {
  rooms: ChatRoom[];
  activeRoomId: string | null;
  loading: boolean;
  onSelectRoom: (roomId: string) => void;
};

export function ChatRoomList({
  rooms,
  activeRoomId,
  loading,
  onSelectRoom,
}: ChatRoomListProps) {
  const formatTime = (value?: string) => {
    if (!value) return "";
    const date = new Date(value);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-lg bg-muted/60 px-3 py-2 animate-pulse"
          >
            <div className="h-8 w-8 rounded-full bg-muted-foreground/20" />
            <div className="flex-1 space-y-1">
              <div className="h-3 w-24 rounded bg-muted-foreground/20" />
              <div className="h-3 w-32 rounded bg-muted-foreground/10" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {rooms.map((room) => {
        const isActive = room.id === activeRoomId;
        const initials = room.title
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();

        return (
          <button
            key={room.id}
            type="button"
            onClick={() => onSelectRoom(room.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              isActive && "bg-accent text-accent-foreground"
            )}
          >
            <Avatar size="lg">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-medium">{room.title}</p>
                <div className="flex items-center gap-2">
                  {room.lastMessageAt && (
                    <span className="text-[10px] text-muted-foreground">
                      {formatTime(room.lastMessageAt)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                {room.lastMessagePreview && (
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                    {room.lastMessagePreview}
                  </p>
                )}     
                {room.unreadCount > 0 && (
                  <span className="bg-primary/90 text-primary-foreground inline-flex min-w-6 items-center justify-center rounded-full px-1 text-[10px] font-semibold">
                    {room.unreadCount}
                  </span>
                )}      
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}


