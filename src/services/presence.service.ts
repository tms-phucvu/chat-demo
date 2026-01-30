import { auth, rtdb } from "@/lib/firebase";
import {
  ref,
  set,
  onDisconnect,
  onValue,
  serverTimestamp,
  Unsubscribe,
} from "firebase/database";

let presenceUnsubscribe: Unsubscribe | null = null;

export const setupPresence = (uid: string) => {
  const presenceRef = ref(rtdb, `presence/${uid}`);
  const connectedRef = ref(rtdb, ".info/connected");

  if (presenceUnsubscribe) {
    presenceUnsubscribe();
    presenceUnsubscribe = null;
  }

  presenceUnsubscribe = onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
      set(presenceRef, {
        status: "online",
        lastActiveAt: serverTimestamp(),
      });
      onDisconnect(presenceRef)
        .set({
          status: "offline",
          lastActiveAt: serverTimestamp(),
        })
        .catch((err) => {
          console.error("onDisconnect queue failed:", err);
        });
    }
  });
};

export const cleanupPresence = () => {
  if (presenceUnsubscribe) {
    presenceUnsubscribe();
    presenceUnsubscribe = null;
  }
};

export const offlinePresence = async () => {
  const uid = auth.currentUser?.uid;
  if (!uid) return;
  const presenceRef = ref(rtdb, `presence/${uid}`);
  cleanupPresence();
  await set(presenceRef, {
    status: "offline",
    lastActiveAt: serverTimestamp(),
  }).catch((err) => console.error("Set offline failed:", err));
};
