import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { ChatRoom } from "@/features/chat/types/room.types";
import { db } from "@/lib/firebase";
import { LastMessage } from "../types/message.types";
import { UserProfile } from "@/types/user.type";

/**
 * Subscribe to a room by ID for realtime updates
 */
export const subscribeRoomById = (
  roomId: string,
  onChange: (room: ChatRoom | null) => void,
) => {
  const ref = doc(db, "rooms", roomId);

  return onSnapshot(ref, (snap) => {
    if (!snap.exists()) {
      onChange(null);
      return;
    }

    onChange({
      id: snap.id,
      ...(snap.data() as Omit<ChatRoom, "id">),
    });
  });
};

/**
 * Find an existing private room between two users
 */
const roomsRef = collection(db, "rooms");
export const getPrivateChatByUserIds = async (
  uid1: string,
  uid2: string,
): Promise<string | null> => {
  const q = query(
    roomsRef,
    where("type", "==", "private"),
    where("participants", "array-contains", uid1),
  );

  const querySnapshot = await getDocs(q);

  const existingDoc = querySnapshot.docs.find((doc) => {
    const data = doc.data();
    return data.participants?.length === 2 && data.participants.includes(uid2);
  });

  return existingDoc ? existingDoc.id : null;
};

/**
 * Create a new private chat room
 */
export const createPrivateChat = async (
  creatorUid: string,
  recipientUid: string,
): Promise<string> => {
  const newRoom: Omit<ChatRoom, "id"> = {
    type: "private",
    participants: [creatorUid, recipientUid],
    participantsCount: 2,
    unreadCounts: {
      [creatorUid]: 0,
      [recipientUid]: 0,
    },
    createdBy: creatorUid,
    createdAt: serverTimestamp(),
    lastMessage: null,
  };

  const docRef = await addDoc(roomsRef, newRoom);
  return docRef.id;
};

/**
 * Get room if exists, otherwise create a new one
 */
export const ensureCreatePrivateChat = async (
  currentUid: string,
  recipientUid: string,
): Promise<string> => {
  const existingRoomId = await getPrivateChatByUserIds(
    currentUid,
    recipientUid,
  );
  if (existingRoomId) {
    return existingRoomId;
  }
  return await createPrivateChat(currentUid, recipientUid);
};

/**
 * Create a new group chat room with an initial system message
 */
export const createGroupChat = async (
  creatorUid: string,
  participantUids: string[],
  groupName?: string,
  groupAvatarURL?: string,
): Promise<string> => {
  const allParticipants = Array.from(new Set([creatorUid, ...participantUids]));

  const unreadCounts: Record<string, number> = {};
  allParticipants.forEach((uid) => {
    unreadCounts[uid] = uid === creatorUid ? 0 : 1;
  });

  const initialTimestamp = serverTimestamp();
  const systemMessage: LastMessage = {
    text: `created the group`,
    senderId: creatorUid,
    createdAt: initialTimestamp,
    type: "system",
  };

  const newGroup: Omit<ChatRoom, "id"> = {
    type: "group",
    groupName: groupName || null,
    groupAvatarURL: groupAvatarURL || null,
    participants: allParticipants,
    participantsCount: allParticipants.length,
    unreadCounts: unreadCounts,
    createdBy: creatorUid,
    createdAt: initialTimestamp,
    lastMessage: systemMessage,
  };

  try {
    const docRef = await addDoc(roomsRef, newGroup);
    return docRef.id;
  } catch (error) {
    console.error("Error creating group chat:", error);
    throw error;
  }
};
