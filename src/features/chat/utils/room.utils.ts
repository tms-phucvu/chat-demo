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
