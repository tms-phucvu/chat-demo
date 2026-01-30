import { rtdb } from "@/lib/firebase";
import { ref, set, onDisconnect, serverTimestamp } from "firebase/database";

export const setupPresence = (uid: string) => {
  const presenceRef = ref(rtdb, `presence/${uid}`);

  // online
  set(presenceRef, {
    status: "online",
    lastActiveAt: serverTimestamp(),
  });

  // auto offline
  onDisconnect(presenceRef).set({
    status: "offline",
    lastActiveAt: serverTimestamp(),
  });
};
