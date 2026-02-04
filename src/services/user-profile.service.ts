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
  return await createUserProfile(user);
};
