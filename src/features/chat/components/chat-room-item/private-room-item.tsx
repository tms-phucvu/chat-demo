"use client";

import { UserAvatar } from "@/features/chat/components/ui/user-avatar";
import { toParticipantPreview } from "@/features/chat/utils/room.utils";
import { useUserInfo } from "@/features/chat/hooks/use-user-info";
import type { ChatRoomListItem } from "@/features/chat/types/room.types";
import { UserPresence } from "@/types/user.type";
import { ChatRoomItem } from "@/features/chat/components/chat-room-item/chat-room-item";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("chat.sidebar.roomItem");
  const partnerId = room.participants.find((id) => id !== uid) || "";
  const { data } = useUserInfo(partnerId);
  const partner = toParticipantPreview(data);
  const status = presences[partnerId]?.status ?? "offline";
  const isMe = room.lastMessage?.senderId === uid;

  const getLastMessagePreview = () => {
    const msg = room.lastMessage;
    if (!msg) return "";
    const sender = isMe ? t("you") : (partner.name ?? "Unknown");

    // Audio message
    if (msg.type === "audio") {
      return t("sentAudio", { sender });
    }

    // Media message
    if (msg.type === "media" && msg.attachments?.length) {
      return t("sentMedia", { sender, count: msg.attachments.length });
    }

    // Text or fallback
    const content = msg.text || "";
    return isMe ? `${sender}: ${content}` : content;
  };
  const lastMessagePreview = getLastMessagePreview();

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
      lastMessagePreview={lastMessagePreview}
    >
      {title}
    </ChatRoomItem>
  );
}
