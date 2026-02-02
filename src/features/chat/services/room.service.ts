import { doc, onSnapshot } from "firebase/firestore";
import { ChatRoom } from "../types/room.types";
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
