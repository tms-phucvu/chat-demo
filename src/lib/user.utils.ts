import { UserInfo, UserProfile } from "@/types/user.type";
import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase/firestore";

/**
 * =========================
 * Firestore Converter
 * =========================
 */
export const userConverter: FirestoreDataConverter<UserProfile> = {
  toFirestore: (user) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { uid, ...data } = user;
    return data;
  },
  fromFirestore: (snap: QueryDocumentSnapshot) => ({
    uid: snap.id,
    ...(snap.data() as Omit<UserProfile, "uid">),
  }),
};

/**
 * =========================
 * Convert UserProfile to UserInfo
 * =========================
 */
export function toUserInfo(user: UserProfile): UserInfo {
  return {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    emailLowercase: user.emailLowercase,
    avatarURL: user.avatarURL,
  };
}
