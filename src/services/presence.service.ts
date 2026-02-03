import { auth, rtdb } from "@/lib/firebase";
import { UserPresence } from "@/types/user.type";
import {
  ref,
  set,
  onDisconnect,
  onValue,
  serverTimestamp,
  Unsubscribe,
} from "firebase/database";

// Manage presence of user
let presenceUnsubscribe: Unsubscribe | null = null;

export const setupPresence = (uid: string) => {
  const presenceRef = ref(rtdb, `presence/${uid}`);
  const connectedRef = ref(rtdb, ".info/connected");

  if (presenceUnsubscribe) {
    presenceUnsubscribe();
    presenceUnsubscribe = null;
  }

  presenceUnsubscribe = onValue(connectedRef, (snap) => {
    const isConnected = snap.val() as boolean | null;

    if (isConnected === true) {
      const onlinePresence: UserPresence = {
        status: "online",
        updatedAt: serverTimestamp(),
      };

      set(presenceRef, onlinePresence);

      onDisconnect(presenceRef)
        .set({
          status: "offline",
          updatedAt: serverTimestamp(),
        } satisfies UserPresence)
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

  const offlineData: UserPresence = {
    status: "offline",
    updatedAt: serverTimestamp(),
  };

  await set(presenceRef, offlineData).catch((err) =>
    console.error("Set offline failed:", err),
  );
};

// Map to manage presence of other users
const watchListeners = new Map<string, Unsubscribe>();

/**
 * Follow user presence
 */
export const subscribeToUserPresence = (
  uid: string,
  onUpdate: (data: UserPresence) => void,
) => {
  if (watchListeners.has(uid)) return;

  const userPresenceRef = ref(rtdb, `presence/${uid}`);

  const unsubscribe = onValue(userPresenceRef, (snapshot) => {
    const data = snapshot.val() as UserPresence | null;
    if (data) {
      onUpdate(data);
    }
  });

  watchListeners.set(uid, unsubscribe);
};

/**
 * Cancel follow user presence
 */
export const unsubscribeFromUserPresence = (uid: string) => {
  const unsubscribe = watchListeners.get(uid);
  if (unsubscribe) {
    unsubscribe();
    watchListeners.delete(uid);
  }
};

/**
 * Cancel all follow (Use for logout or reset app)
 */
export const cleanupAllWatchers = () => {
  watchListeners.forEach((unsubscribe) => unsubscribe());
  watchListeners.clear();
};

/**
 * Get followed users
 */
export const getActiveTrackers = () => {
  return Array.from(watchListeners.keys());
};
