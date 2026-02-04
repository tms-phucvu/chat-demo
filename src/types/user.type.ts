import { FieldValue, Timestamp } from "firebase/firestore";
import { serverTimestamp } from "firebase/database";

export type UserStatusType = "online" | "offline";

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  emailLowercase: string | null;
  avatarURL: string | null;
  createdAt: Timestamp | FieldValue;
}

export type UserInfo = Pick<
  UserProfile,
  "uid" | "displayName" | "email" | "emailLowercase" | "avatarURL"
>;

export type RealtimeTimestamp = ReturnType<typeof serverTimestamp>;

export interface UserPresenceWrite {
  status: UserStatusType;
  updatedAt: number | RealtimeTimestamp;
}

export interface UserPresence {
  status: UserStatusType;
  updatedAt: number;
}
