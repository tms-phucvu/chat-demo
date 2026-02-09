"use client";

import { UserAvatar } from "@/features/chat/components/ui/user-avatar";
import { toParticipantPreview } from "@/features/chat/utils/room.utils";
import { useUserInfo } from "@/features/chat/hooks/use-user-info";
import type { ChatRoomListItem } from "@/features/chat/types/room.types";
import { UserPresence } from "@/types/user.type";
import { ChatRoomItem } from "@/features/chat/components/chat-room-item/chat-room-item";

type PrivateRoomItemProps = {
  room: ChatRoomListItem;
  uid: string | null;
  presences: Record<string, UserPresence>;
};

export function PrivateRoomItem({
  room,
  uid,
  presences,
}: PrivateRoomItemProps) {
  const partnerId = room.participants.find((id) => id !== uid) || "";
  const { data } = useUserInfo(partnerId);
  const partner = toParticipantPreview(data);
  const status = presences[partnerId]?.status ?? "offline";
  const isMe = room.lastMessage?.senderId === uid;

  const lastMessagePreview = isMe
    ? `You: ${room.lastMessage?.text}`
    : room.lastMessage?.text;

  const title = (
    <p className="truncate text-sm font-medium">{partner.name ?? "Unknown"}</p>
  );

  const avatar = (
    <UserAvatar
      name={partner.name ?? "Unknown"}
      avatarUrl={partner.avatar ?? undefined}
      status={status}
    />
  );

  return (
    <ChatRoomItem
      room={room}
      uid={uid}
      avatar={avatar}
      lastMessagePreview={lastMessagePreview ?? ""}
    >
      {title}
    </ChatRoomItem>
  );
}
