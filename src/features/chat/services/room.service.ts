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
