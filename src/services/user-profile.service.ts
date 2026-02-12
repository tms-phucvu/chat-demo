import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { UserProfile } from "@/types/user.type";
import { userConverter } from "@/lib/user.utils";
import {
  createGroupChat,
  createPrivateChat,
} from "@/features/chat/services/room.service";
import { sendMessage } from "@/features/chat/services/messages.service";

/**
 * =========================
 * References
 * =========================
 */
const userRef = (uid: string) =>
  doc(db, "users", uid).withConverter(userConverter);

/**
 * =========================
 * Basic CRUD
 * =========================
 */
export const getUserProfile = async (
  uid: string,
): Promise<UserProfile | null> => {
  const snap = await getDoc(userRef(uid));
  return snap.exists() ? snap.data() : null;
};

export const createUserProfile = async (user: User): Promise<UserProfile> => {
  const profile: UserProfile = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    emailLowercase: user.email?.toLowerCase() ?? null,
    avatarURL: user.photoURL,
    createdAt: serverTimestamp(),
  };

  await setDoc(userRef(user.uid), profile);
  return profile;
};

export const updateUserProfile = async (
  uid: string,
  data: Partial<UserProfile>,
): Promise<void> => {
  await updateDoc(userRef(uid), data);
};

export const syncUserProfile = async (user: User): Promise<UserProfile> => {
  const existing = await getUserProfile(user.uid);
  if (existing) return existing;
  const newUser = await createUserProfile(user);

  const newChat = await createPrivateChat("XE8HmiEmSPU1xUcjZFf2", newUser.uid);
  await sendMessage({
    roomId: newChat,
    unreadParticipants: [newUser.uid],
    payload: {
      senderId: "XE8HmiEmSPU1xUcjZFf2",
      text: "Welcome to Tomosia! How can we assist you today?",
    },
  });

  const newGroup = await createGroupChat("XE8HmiEmSPU1xUcjZFf2", [
    "XE8HmiEmSPU1xUcjZFf2",
    "3rOuFR1VMyNAJXf6nPY7",
    newUser.uid,
  ]);
  await sendMessage({
    roomId: newGroup,
    unreadParticipants: [],
    payload: {
      senderId: "3rOuFR1VMyNAJXf6nPY7",
      text: "Hi! This is the Frontend team at Tomosia. Do you have any questions about this chat demo template?",
    },
  });

  return newUser;
};
