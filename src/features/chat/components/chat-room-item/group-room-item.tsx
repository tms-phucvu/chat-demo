"use client";

import { GroupAvatar } from "@/features/chat/components/ui/group-avatar";
import {
  getGroupDisplayName,
  toParticipantPreview,
  toParticipantPreviews,
} from "@/features/chat/utils/room.utils";
import { useParticipants } from "@/features/chat/hooks/use-participants";
import type { ChatRoomListItem } from "@/features/chat/types/room.types";
import { ChatRoomItem } from "@/features/chat/components/chat-room-item/chat-room-item";
import { useUserInfo } from "../../hooks/use-user-info";

type GroupRoomItemProps = {
  room: ChatRoomListItem;
  isActive: boolean;
  uid: string | null;
  onSelectRoom: (roomId: string) => void;
};

export function GroupRoomItem({
  room,
  isActive,
  uid,
  onSelectRoom,
}: GroupRoomItemProps) {
  const otherParticipantIds = room.participants.filter((id) => id !== uid);
  const { participants } = useParticipants(otherParticipantIds);
  const otherParticipants = toParticipantPreviews(participants);
  const isMe = room.lastMessage?.senderId === uid;
  const { data: lastSender } = useUserInfo(
    !isMe ? room.lastMessage?.senderId : undefined,
  );

  const lastMessagePreview = isMe
    ? `You: ${room.lastMessage?.text}`
    : `${lastSender?.displayName}: ${room.lastMessage?.text}`;

  const title = (
    <p className="truncate text-sm font-medium">
      {getGroupDisplayName(otherParticipants)}
    </p>
  );

  const avatar = (
    <GroupAvatar
      participants={otherParticipants}
      count={room.participantsCount - 2}
    />
  );

  return (
    <ChatRoomItem
      room={room}
      isActive={isActive}
      uid={uid}
      onSelectRoom={onSelectRoom}
      avatar={avatar}
      lastMessagePreview={lastMessagePreview}
    >
      {title}
    </ChatRoomItem>
  );
}
