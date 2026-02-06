import { rtdb } from "@/lib/firebase";
import { DataSnapshot, off, onDisconnect, onValue, ref, remove, set } from "firebase/database";

/**
 * Enter room
 */
export const enterRoom = (uid: string, roomId: string) => {
  const roomRef = ref(rtdb, `room_presence/${roomId}/${uid}`);
  onDisconnect(roomRef).remove();
  return set(roomRef, true);
};

/**
 * Leave room
 */
export const leaveRoom = (uid: string, roomId: string) => {
  const roomRef = ref(rtdb, `room_presence/${roomId}/${uid}`);
  return remove(roomRef);
};
/**
 * Listen users in room
 */
export const subscribeToRoomPresence = (
  roomId: string, 
  callback: (uids: string[]) => void
) => {
  const presenceRef = ref(rtdb, `room_presence/${roomId}`);

  const listener = onValue(presenceRef, (snapshot: DataSnapshot) => {
    const data = snapshot.val();
    if (!data) {
      callback([]);
      return;
    }
    callback(Object.keys(data));
  });

  return () => off(presenceRef, "value", listener);
};
