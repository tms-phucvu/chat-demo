import {
  ChatRoomListItem,
  ParticipantPreview,
  ParticipantsInfo,
} from "@/features/chat/types/room.types";
import { UserInfo } from "@/types/user.type";

export const getOtherParticipants = (
  participantsInfo: ParticipantsInfo,
  myUid: string | null,
): ParticipantPreview[] => {
  if (!myUid) {
    return Object.values(participantsInfo);
  }
  return Object.entries(participantsInfo)
    .filter(([uid]) => uid !== myUid)
    .map(([, info]) => info);
};

export const getOtherParticipantIds = (
  participantIds: string[],
  myUid: string | null,
): string[] => {
  if (!myUid) {
    return participantIds;
  }
  return participantIds.filter((id) => id !== myUid);
};

export function toParticipantPreviews(
  users: (UserInfo | null | undefined)[],
): ParticipantPreview[] {
  if (!users) return [];
  return users.map((user) => ({
    name: user?.displayName ?? "Unknown",
    avatar: user?.avatarURL ?? null,
  }));
}

export function toParticipantPreview(
  user: UserInfo | null | undefined,
): ParticipantPreview {
  return {
    name: user?.displayName ?? "Unknown",
    avatar: user?.avatarURL ?? null,
  };
}

export const getUnreadCount = (room: ChatRoomListItem, uid: string | null) => {
  if (!uid) {
    return 0;
  }
  const count = room.unreadCounts?.[uid];
  return count ?? 0;
};

export function getGroupDisplayName(
  participants: ParticipantPreview[],
  max = 2,
) {
  const names = participants.map((p) => p.name).filter(Boolean) as string[];
  return `${names.slice(0, max).join(", ")}, ...`;
}
