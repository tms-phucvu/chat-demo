import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const resetUnreadCount = async (uid: string, roomId: string) => {
  try {
    const roomRef = doc(db, "rooms", roomId);
    await updateDoc(roomRef, {
      [`unreadCounts.${uid}`]: 0,
    });
  } catch (error) {
    console.error("[UnreadCount] Error resetting unread count:", error);
  }
};
