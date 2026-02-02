import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  LastMessage,
  Message,
  SendMessagePayload,
} from "@/features/chat/types/message.types";

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
export const sendMessage = async (
  roomId: string,
  payload: SendMessagePayload,
) => {
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

  batch.set(messageRef, messageData);
  batch.update(roomRef, {
    lastMessage: lastMessageData,
  });

  await batch.commit();
};
