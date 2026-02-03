import {
  ChatRoomListItem,
  ParticipantPreview,
  ParticipantsInfo,
} from "@/features/chat/types/room.types";

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
