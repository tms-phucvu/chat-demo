import {
  collection,
  orderBy,
  query,
  where,
  QueryDocumentSnapshot,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ChatRoom, ChatRoomListItem } from "@/features/chat/types/room.types";

/**
 * Convert Firestore doc -> ChatRoomListItem
 */
const mapRoomDoc = (
  doc: QueryDocumentSnapshot
): ChatRoomListItem => {
  const data = doc.data() as ChatRoom;

  return {
    id: doc.id,
    type: data.type,
    participants: data.participants,
    participantsInfo: data.participantsInfo,
    participantsCount: data.participantsCount,
    unreadCounts: data.unreadCounts,
    lastMessage: data.lastMessage,
  };
};

/**
 * Get chat rooms of a user, sorted by lastMessage.createdAt desc
 */
export const subscribeRoomsByUser = (
  uid: string,
  onChange: (rooms: ChatRoomListItem[]) => void
) => {
  const q = query(
    collection(db, "rooms"),
    where("participants", "array-contains", uid),
    orderBy("lastMessage.createdAt", "desc")
  );

  return onSnapshot(q, (snap) => {
    const rooms = snap.docs.map(mapRoomDoc);
    onChange(rooms);
  });
};
