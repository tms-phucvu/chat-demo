import { rtdb } from "@/lib/firebase";
import { TYPING_TIMEOUT_MS } from "@/features/chat/constants/chat.constants";
import {
  onDisconnect,
  onValue,
  ref,
  set,
  Unsubscribe,
} from "firebase/database";

let isTypingSent = false;
let typingTimeout: NodeJS.Timeout | null = null;

/**
 * Update typing
 */
export const handleTyping = (roomId: string, uid: string) => {
  const typingRef = ref(rtdb, `typing/${roomId}/${uid}`);

  if (!isTypingSent) {
    set(typingRef, true);
    onDisconnect(typingRef).remove();
    isTypingSent = true;
  }

  if (typingTimeout) clearTimeout(typingTimeout);

  typingTimeout = setTimeout(() => {
    clearTyping(roomId, uid);
  }, TYPING_TIMEOUT_MS);
};

/**
 * Clear typing
 */
export const clearTyping = (roomId: string, uid: string) => {
  if (typingTimeout) {
    clearTimeout(typingTimeout);
    typingTimeout = null;
  }

  const typingRef = ref(rtdb, `typing/${roomId}/${uid}`);
  set(typingRef, null);
  isTypingSent = false;
};

/**
 * Subscribe to typing by room id
 */
export const subscribeToTyping = (
  roomId: string,
  callback: (typingIds: string[]) => void,
): Unsubscribe => {
  const typingRef = ref(rtdb, `typing/${roomId}`);

  return onValue(typingRef, (snapshot) => {
    const data = snapshot.val() || {};
    const ids = Object.keys(data);
    callback(ids);
  });
};
