"use client";

import { GroupAvatar } from "@/features/chat/components/ui/group-avatar";
import {
  getGroupDisplayName,
  toParticipantPreviews,
} from "@/features/chat/utils/room.utils";
import { useParticipants } from "@/features/chat/hooks/use-participants";
import type { ChatRoomListItem } from "@/features/chat/types/room.types";
import { ChatRoomItem } from "@/features/chat/components/chat-room-item/chat-room-item";
import { useUserInfo } from "@/features/chat/hooks/use-user-info";
import { useTranslations } from "next-intl";

type GroupRoomItemProps = {
  room: ChatRoomListItem;
  uid: string | null;
};

export function GroupRoomItem({ room, uid }: GroupRoomItemProps) {
  const t = useTranslations("chat.sidebar.roomItem");
  const otherParticipantIds = room.participants.filter((id) => id !== uid);
  const { participants } = useParticipants(otherParticipantIds);
  const otherParticipants = toParticipantPreviews(participants);
  const isMe = room.lastMessage?.senderId === uid;
  const { data: lastSender } = useUserInfo(room.lastMessage?.senderId, {
    enabled: !isMe,
  });

  const sender = isMe ? t("you") : lastSender?.displayName;
  const content = room.lastMessage?.text || "";
  const lastMessagePreview =
    room.lastMessage?.type === "system" &&
    room.lastMessage?.text === "created the group"
      ? t("createdGroupMessage", {sender: sender ?? "Unknown"})
      : `${sender}: ${content}`;

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
      uid={uid}
      avatar={avatar}
      lastMessagePreview={lastMessagePreview}
    >
      {title}
    </ChatRoomItem>
  );
}
