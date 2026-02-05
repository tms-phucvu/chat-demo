import { FieldValue, Timestamp } from "firebase/firestore";
import { LastMessage } from "@/features/chat/types/message.types";

export type RoomType = "private" | "group";

export type ParticipantPreview = {
  name: string | null;
  avatar: string | null;
};
export type ParticipantsInfo = Record<string, ParticipantPreview>;

export type ChatRoom = {
  id: string;
  type: RoomType;
  participants: string[];
  participantsCount: number;
  unreadCounts: Record<string, number>;
  createdBy: string;
  createdAt: Timestamp | FieldValue;
  lastMessage: LastMessage | null;
};

export type ChatRoomListItem = Omit<ChatRoom, "createdBy" | "createdAt">;
