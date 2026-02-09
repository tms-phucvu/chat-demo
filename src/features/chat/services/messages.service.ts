import {
  collection,
  doc,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  UpdateData,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  LastMessage,
  Message,
  SendMessageParams,
} from "@/features/chat/types/message.types";
import { ChatRoom } from "../types/room.types";

/**
 * Subscribe messages of a room (sub-collection)
 */
export const subscribeMessagesByRoomId = (
  roomId: string,
  onChange: (messages: Message[]) => void,
) => {
  const q = query(
    collection(db, "rooms", roomId, "messages"),
    orderBy("createdAt", "asc"),
  );

  return onSnapshot(q, (snap) => {
    const messages: Message[] = snap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Message, "id">),
    }));

    onChange(messages);
  });
};

/**
 * Send message & update room.lastMessage atomically
 */
export const sendMessage = async ({
  roomId,
  payload,
  unreadParticipants,
}: SendMessageParams) => {
  const { text, senderId, type = "text" } = payload;

  const batch = writeBatch(db);

  const roomRef = doc(db, "rooms", roomId);
  const messagesRef = collection(db, "rooms", roomId, "messages");
  const messageRef = doc(messagesRef);

  const messageData: Omit<Message, "id"> = {
    text,
    senderId,
    type,
    createdAt: serverTimestamp(),
  };

  const lastMessageData: LastMessage = {
    text,
    senderId,
    type,
    createdAt: serverTimestamp(),
  };

  const updateData: UpdateData<Pick<ChatRoom, "lastMessage" | "unreadCounts">> =
    {
      lastMessage: lastMessageData,
    };
  unreadParticipants.forEach((uid) => {
    updateData[`unreadCounts.${uid}`] = increment(1);
  });

  batch.set(messageRef, messageData);
  batch.update(roomRef, updateData);

  await batch.commit();
};
